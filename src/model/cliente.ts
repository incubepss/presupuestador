import { EntityService, Entity } from "./IEntityService";

export class Cliente extends Entity {
  _id: string;
  entity: string;
  razon_social: string;
  mail: string;
  telefono: string;
  cuit: string;
  status: boolean;

  constructor(id: string) {
    super(id, "cliente");
  }
}

export class ClienteService extends EntityService<Cliente> {
  constructor() {
    super();
    super.setNameDbEntity("cliente");
  }
}

export class ClienteData {
  static getInstallData(): Array<Cliente> {
    const c1 = new Cliente("1");
    c1.razon_social = "Mercado Territorial";
    c1.mail = "mt@gmail.com";
    c1.telefono = "89999999";
    c1.cuit = "24-56699669-1";

    const c2 = new Cliente("2");
    c2.razon_social = "SanCor Coop. Ltda";
    c2.mail = "sancorOk@gmail.com";
    c2.telefono = "15-50988556";
    c2.cuit = "24-566326669-1";

    const c3 = new Cliente("3");
    c3.razon_social = "La flor de Jujuy";
    c3.mail = "florjujuy@gmail.com";
    c3.telefono = "15-505656556";
    c3.cuit = "20-566326669-7";

    return [c1, c2, c3];
  }
}
