import { EntityService, Entity } from "./IEntityService";

export class Insumo extends Entity {
  _id: string;
  entity: string;
  cantidad: number;
  descripcion: string;
  unidad_medida: string;
  valor: number;
  actualizacion: Date;

  constructor(id: string) {
    super(id, "costovariable");
    this.actualizacion = new Date();
    this.cantidad = 0;
    this.descripcion = "";
    this.unidad_medida = "Kilogramo";
    this.valor = 0;
  }
}

export class InsumoService extends EntityService<Insumo> {
  constructor() {
    super();
    super.setNameDbEntity("costovariable");
  }
}

export class InsumoDoc extends Insumo {
  public productosId: Array<string>;

  constructor(doc: string) {
    const obj = JSON.parse(doc);
    super(obj._id);
    for (var key in obj) {
      if (this.hasOwnProperty(key)) {
        this[key] = obj[key];
      }
    }
  }

  public static build(id) {
    const insumo = new InsumoDoc(JSON.stringify({ _id: id }));
    insumo._id = id;
    insumo.entity = "costovariable";
    return insumo;
  }
}

export class InsumoData {
  static getInstallData(): Array<InsumoDoc> {
    const i1 = InsumoDoc.build("costovariable_1");
    i1.cantidad = 1;
    i1.descripcion = "Harina";
    i1.unidad_medida = "Kilogramo";
    i1.valor = 100;
    i1.actualizacion = new Date();

    const i2 = InsumoDoc.build("costovariable_2");
    i2.cantidad = 1;
    i2.descripcion = "Leche";
    i2.unidad_medida = "Litro";
    i2.valor = 200;
    i2.actualizacion = new Date();

    const i3 = InsumoDoc.build("costovariable_3");
    i3.cantidad = 1;
    i3.descripcion = "Manteca";
    i3.unidad_medida = "Gramo";
    i3.valor = 350;
    i3.actualizacion = new Date();

    const insumos = [i1, i2, i3];

    return insumos;
  }
}
