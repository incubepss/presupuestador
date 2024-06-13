import { EntityService, Entity } from "./IEntityService";

export class Producto extends Entity {
  _id: string;
  entity: string;
  descripcion: string;
  unidad_medida: string;
  cantidad_promedio_mensual: number;
  produccion_promedio_mensual: number;
  cantidad_unitaria: number;
  insumos: Array<InsumoProducto>;

  constructor(id: string) {
    super(id, "producto");
    this.insumos = [];
  }

  public AddInsumoProducto(insumo: InsumoProducto) {
    this.insumos.push(insumo);
    return this;
  }

  static fromDoc(doc: string): Producto {
    let objFromDoc = JSON.parse(JSON.stringify(doc));
    const producto = new Producto(objFromDoc._id);

    [
      "entity",
      "entity",
      "descripcion",
      "unidad_medida",
      "cantidad_promedio_mensual",
      "produccion_promedio_mensual",
      "cantidad_unitaria",
    ].map((prop) => (producto[prop] = objFromDoc[prop]));

    if (objFromDoc.insumos) {
      objFromDoc.insumos.map((insProd: any, i: number) => {
        var oInsumoProducto = InsumoProducto.fromDoc(insProd);
        producto.AddInsumoProducto(oInsumoProducto);
      });
    }

    return producto;
  }
}

export class InsumoProducto {
  cantidad: number;
  descripcion: string;
  name: string;
  unidad_medida: string;

  constructor() {
    this.cantidad = 0;
  }

  public static Create(
    cantidad: number,
    descripcion: string,
    name: string,
    unidad_medida: string
  ): InsumoProducto {
    var newInsProd = new InsumoProducto();
    newInsProd.cantidad = cantidad;
    newInsProd.descripcion = descripcion;
    newInsProd.name = name;
    newInsProd.unidad_medida = unidad_medida;
    return newInsProd;
  }

  static fromDoc(doc: string): InsumoProducto {
    let objIPFromDoc = JSON.parse(JSON.stringify(doc));

    const insProd = new InsumoProducto();
    insProd.cantidad = objIPFromDoc.cantidad;
    insProd.descripcion = objIPFromDoc.descripcion;
    insProd.name = objIPFromDoc.name;
    insProd.unidad_medida = objIPFromDoc.unidad_medida;

    return insProd;
  }
}

export class ProductoService extends EntityService<Producto> {
  constructor() {
    super();
    super.setNameDbEntity("productos");
  }
}

export class ProductoData {
  static getInstallData(): Array<Producto> {
    const p1 = new Producto("1");
    p1.descripcion = "Pan dulce";
    p1.unidad_medida = "Kilogramo";
    p1.cantidad_promedio_mensual = 50;
    p1.produccion_promedio_mensual = 50;
    p1.cantidad_unitaria = 5;

    const p2 = new Producto("2");
    p2.descripcion = "Budín ingles";
    p2.unidad_medida = "Gramo";
    p2.cantidad_promedio_mensual = 256;
    p2.produccion_promedio_mensual = 30;
    p2.cantidad_unitaria = 10;

    const p3 = new Producto("3");
    p3.descripcion = "Galletita de jengibre";
    p3.unidad_medida = "Docena";
    p3.cantidad_promedio_mensual = 180;
    p3.produccion_promedio_mensual = 20;
    p3.cantidad_unitaria = 10;

    return [p1, p2, p3];
  }
}
