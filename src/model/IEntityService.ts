export default interface IEntityService<IEntity> {
  add(entity: IEntity): IEntity;
  update(entity: any): any; //IEntity
  beforeEditing?(entity: IEntity): IEntity;
  beforeSave?(entity: IEntity): IEntity;
  //delete(entity: IEntity): Promise<any>
  getById(entity: IEntity): IEntity;
}

export interface IEntity {
  _id: string;
  entity: string;
  _rev?: string;
  _deleted?: boolean;
}

export abstract class Entity implements IEntity {
  _id: string;
  entity: string;
  _rev?: string;
  _deleted?: boolean;

  constructor(id: string, entity: string) {
    this.entity = entity;
    //replace sanitiza el id
    this._id = `${entity}_${id.toString().replace(entity, "")}`;
  }

  /*
      toDoc: any = ( properties : Array<string> ) => {} */

  static rows2objects: any = (rows: Array<any>) => {
    var instances = [];
    rows.forEach((element, index) => {
      instances.push(element.doc);
    });
    return instances;
  };

  static find2objects: any = (docs: Array<any>) => {
    var instances = [];
    docs.forEach((element, index) => {
      instances.push(element);
    });
    return instances;
  };

  static alls2object: any = (docs: Array<any>) => {
    if (docs.length > 0) return docs[0];
    else return null;
  };

  static find2object: any = (docs: Array<any>) => {
    return Entity.alls2object(docs);
  };
}

export abstract class EntityService<Entity> implements IEntityService<Entity> {
  protected entityList: Array<any> = [];
  protected nameDbEntity: string = "Entity";

  getById: any = async (id: string) => {
    const db = new PouchDB("dbPresupuestador");
    let docs = await db.find({
      selector: { _id: { $eq: id } },
    });
    return Entity.find2object(docs);
  };

  getAll: any = async () => {
    const db = new PouchDB("dbPresupuestador");
    let docs = await db.find({
      selector: { entity: { $eq: this.nameDbEntity } },
    });
    return Entity.find2objects(docs.docs);
  };

  saveData(): void {
    //setLocalStorage( this.nameDbEntity, this.entityList  );
    //this.repository.saveAll( this.entityList );
  }

  add(field: any): Entity {
    let max =
      this.entityList.reduce((a: any, b: any) => (a.id > b.id ? a : b)).id || 0;
    field.id = max + 1;
    var newIndex = this.entityList.push(field);
    //setEntityList( this.entityList );
    this.saveData();
    return this.entityList[newIndex];
  }

  async update(field: any): Promise<any> {
    //let entity = this.entityList.find((t: any) => t.id == field.id)
    let entity: any = await this.getById(field._id);

    if (entity) {
      //cliente.razon_social = field.razon_social
      for (var key in field) {
        if (entity.hasOwnProperty(key)) {
          entity[key] = field[key];
        }
      }
    }
    this.saveData();
    return entity;
  }

  addOrUpdate(field: any): Promise<any> {
    return new Promise((resolve, reject) => {
      if (field.id > 0) return this.update(field);
      return this.add(field);
    });
  }

  getByIdOrNew(id: any, newEntity: Entity): Entity {
    if (id > 0) return this.getById(id);
    return newEntity;
  }

  setNameDbEntity(name: string) {
    this.nameDbEntity = name;
  }

  getUISchema(): any {
    return {
      _id: { "ui:widget": "hidden" },
    };
  }
}
