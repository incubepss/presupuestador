import { EntityService, Entity } from "./IEntityService";
import { ClienteService } from "./cliente";
import { Producto, ProductoService } from "./producto";

const prodService = new ProductoService();

export class Presupuesto extends Entity {
  public _id: string;
  public entity: string;
  public nro: number;
  public productos: Array<ItemPresupuesto>;
  public cliente: string;
  public estado: string;
  public validez: number;
  public fecha: string;
  public actualizacion: Date;
  public gastos_bancarios: number;
  public gastos_financiamiento: number;
  public iva: number;
  public logistica: number;

  public constructor(_id: string) {
    super(_id, "presupuesto");
    this.cliente = null;
    this.productos = [];
  }

  public AddItemPresupuesto(item: ItemPresupuesto) {
    this.productos.push(item);
    return this;
  }

  static fromDoc: any = (
    doc: string,
    clientes: Array<any>,
    productos: Array<any>
  ) => {
    let objFromDoc = JSON.parse(JSON.stringify(doc));
    const presupuesto = new Presupuesto(objFromDoc._id);
    presupuesto.cliente = clientes.find((doc) => doc._id == objFromDoc.cliente);

    ["entity", "fechaEmision", "validez", "gsBancarios", "gsFinanciacion"].map(
      (prop) => (presupuesto[prop] = objFromDoc[prop])
    );

    if (objFromDoc.productos) {
      objFromDoc.productos.map((p: any, i: number) => {
        const objProducto = JSON.parse(
          JSON.stringify(productos.find((doc) => doc._id == p.producto))
        );
        var item = ItemPresupuesto.CreateItemPresupuesto(
          i,
          p.cantidad,
          objProducto
        );
        presupuesto.AddItemPresupuesto(item);
      });
    }
    return presupuesto;
  };
}

export class PresupuestoDoc extends Presupuesto {
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
    const presu = new PresupuestoDoc(JSON.stringify({ _id: id }));
    presu._id = id;
    presu.entity = "presupuesto";
    return presu;
  }
}

export class ItemPresupuesto extends Entity {
  public producto: Producto;
  public cantidad: number;

  constructor(id: string) {
    super(id, "itPresupuesto");
    this.cantidad = 0;
  }

  public static CreateItemPresupuesto(id, cantidad, producto) {
    var newItemPresup = new ItemPresupuesto(id);
    newItemPresup.cantidad = cantidad ? cantidad : 0;
    newItemPresup.producto = producto;
    return newItemPresup;
  }
}

export class PresupuestoService extends EntityService<Presupuesto> {
  constructor(presupuestos: Array<Presupuesto>) {
    super();
    super.setNameDbEntity("presupuestos");
    presupuestos;
  }
}

export class PresupuestoData {
  static getInstallData(): Array<PresupuestoDoc> {
    const p1 = PresupuestoDoc.build("presupuesto_1");
    p1.nro = 1;
    p1.estado = "Borrador";
    p1.validez = 10;
    p1.fecha = "2023-06-14";
    p1.actualizacion = new Date();
    p1.gastos_bancarios = 12;
    p1.gastos_financiamiento = 12;
    p1.iva = 21;
    p1.logistica = 1000;

    const p2 = PresupuestoDoc.build("presupuesto_2");
    p2.nro = 2;
    p2.estado = "Borrador";
    p2.validez = 10;
    p2.fecha = "2023-06-15";
    p2.actualizacion = new Date();
    p2.gastos_bancarios = 13;
    p2.gastos_financiamiento = 13;
    p2.iva = 21;
    p2.logistica = 1000;

    const p3 = PresupuestoDoc.build("presupuesto_3");
    p3.nro = 3;
    p3.estado = "Borrador";
    p3.validez = 10;
    p3.fecha = "2023-06-15";
    p3.actualizacion = new Date();
    p3.gastos_bancarios = 10;
    p3.gastos_financiamiento = 10;
    p3.iva = 21;
    p3.logistica = 1000;

    const presus = [p1, p2, p3];

    return presus;
  }
}
