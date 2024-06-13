export const modeloCostosFijos = [
  { nombre: "actualizacion", width: "15", label: "Actualización" },
  { nombre: "descripcion", width: "45", label: "Descripción" },
  { nombre: "valor", width: "28", label: "Valor mensual" },
];

export const modeloCostosUnitarios = [
  { nombre: "descripcion", width: "50", label: "Descripción" },
  { nombre: "valor", width: "38", label: "Costo fijo unitario" },
];

export const modeloCostosFijosEdita = [
  { nombre: "descripcion", width: "50", label: "Descripción" },
  { nombre: "valor", width: "50", label: "Valor mensual" },
];

export const modeloCostosFijosAgrega = [
  { nombre: "descripcion", width: "50", label: "Descripción" },
  { nombre: "valor", width: "38", label: "Valor mensual" },
];

export const plantillas_costos = [
  {
    descripcion: "Alimentación y Gastronomía",
    clases: "bg-info-dk text-white",
    items: [
      {
        descripcion: "Monotributo",
        tipo: "costo",
        actualizacion: "2023-09-12T12:55:44.620Z",
        valor: 46730,
      },
      {
        descripcion: "Alquiler",
        tipo: "costo",
        actualizacion: "2023-09-12T12:55:44.620Z",
        valor: 240000,
      },
      {
        descripcion: "Luz",
        tipo: "costo",
        actualizacion: "2023-09-12T12:55:44.620Z",
        valor: 25000,
      },
      {
        descripcion: "Agua",
        tipo: "costo",
        actualizacion: "2023-09-12T12:55:44.620Z",
        valor: 13500,
      },
      {
        descripcion: "Gas",
        tipo: "costo",
        actualizacion: "2023-09-12T12:55:44.620Z",
        valor: 45000,
      },
      {
        descripcion: "ABL",
        tipo: "costo",
        actualizacion: "2023-09-12T12:55:44.620Z",
        valor: 4107,
      },
      {
        descripcion: "Internet y teléfono/celular",
        tipo: "costo",
        actualizacion: "2023-09-12T12:55:44.620Z",
        valor: 10450,
      },
    ],
  },
  {
    descripcion: "Textil, Confección y Calzado",
    clases: "bg-danger-dk text-white",
    items: [
      {
        descripcion: "Monotributo",
        tipo: "costo",
        actualizacion: "2023-09-12T12:55:44.620Z",
        valor: 46730,
      },
      {
        descripcion: "Alquiler",
        tipo: "costo",
        actualizacion: "2023-09-12T12:55:44.620Z",
        valor: 240000,
      },
      {
        descripcion: "Luz",
        tipo: "costo",
        actualizacion: "2023-09-12T12:55:44.620Z",
        valor: 25000,
      },
      {
        descripcion: "Agua",
        tipo: "costo",
        actualizacion: "2023-09-12T12:55:44.620Z",
        valor: 13500,
      },
      {
        descripcion: "Gas",
        tipo: "costo",
        actualizacion: "2023-09-12T12:55:44.620Z",
        valor: 45000,
      },
      {
        descripcion: "ABL",
        tipo: "costo",
        actualizacion: "2023-09-12T12:55:44.620Z",
        valor: 4107,
      },
    ],
  },
  {
    descripcion: "Ecología Urbana",
    clases: "bg-success-dk text-white",
    items: [
      {
        descripcion: "Publicidad y Promoción",
        tipo: "costo",
        actualizacion: "2023-09-12T12:55:44.620Z",
        valor: 6000,
      },
      {
        descripcion: "Impuestos",
        tipo: "costo",
        actualizacion: "2023-09-12T12:55:44.620Z",
        valor: 4500,
      },
      {
        descripcion: "Gastos bancarios",
        tipo: "costo",
        actualizacion: "2023-09-12T12:55:44.620Z",
        valor: 4567,
      },
    ],
  },
  {
    descripcion: "Juguetes",
    clases: "bg-warning-dk text-white",
    items: [
      {
        descripcion: "Internet y teléfono/celular",
        tipo: "costo",
        actualizacion: "2023-09-12T12:55:44.620Z",
        valor: 10450,
      },
      {
        descripcion: "Limpieza y saneamiento",
        tipo: "costo",
        actualizacion: "2023-09-12T12:55:44.620Z",
        valor: 23680,
      },
      {
        descripcion: "Mantenimiento de equipos",
        tipo: "costo",
        actualizacion: "2023-09-12T12:55:44.620Z",
        valor: 110340,
      },
      {
        descripcion: "Seguros",
        tipo: "costo",
        actualizacion: "2023-09-12T12:55:44.620Z",
        valor: 7327,
      },
      {
        descripcion: "Amortización de maquinaria",
        tipo: "costo",
        actualizacion: "2023-09-12T12:55:44.620Z",
        valor: 6500,
      },
      {
        descripcion: "Papelería y útiles",
        tipo: "costo",
        actualizacion: "2023-09-12T12:55:44.620Z",
        valor: 4690,
      },
      {
        descripcion: "Servicios profesionales",
        tipo: "costo",
        actualizacion: "2023-09-12T12:55:44.620Z",
        valor: 35000,
      },
      {
        descripcion: "Capacitación y asistencia técnica",
        tipo: "costo",
        actualizacion: "2023-09-12T12:55:44.620Z",
        valor: 24000,
      },
    ],
  },
  { descripcion: "En blanco", clases: "border-card", items: [] },
];

export const modeloAmortizaciones = [
  { nombre: "actualizacion", width: "15", label: "ACTUALIZACIÓN" },
  { nombre: "descripcion", width: "33", label: "DESCRIPCIÓN" },
  { nombre: "precio", width: "20", label: "VALOR" },
  { nombre: "meses", width: "20", label: "MESES DE AMORTIZACIÓN" },
];

export const modeloAmortizacionesEdita = [
  { nombre: "descripcion", width: "40", label: "DESCRIPCIÓN" },
  { nombre: "precio", width: "30", label: "VALOR" },
  { nombre: "meses", width: "30", label: "MESES DE AMORTIZACIÓN" },
];

export const modeloAmortizacionesAgrega = [
  { nombre: "descripcion", width: "40", label: "DESCRIPCIÓN" },
  { nombre: "precio", width: "24", label: "VALOR" },
  { nombre: "meses", width: "24", label: "MESES DE AMORTIZACIÓN" },
];

export const costosfijosinit = [
  {
    descripcion: "Monotributo",
    tipo: "costo",
    valor: 46730,
  },
  {
    descripcion: "Alquiler",
    tipo: "costo",
    valor: 240000,
  },
  {
    descripcion: "Luz",
    tipo: "costo",
    valor: 25000,
  },
  {
    descripcion: "Agua",
    tipo: "costo",
    valor: 13500,
  },
  {
    descripcion: "Gas",
    tipo: "costo",
    valor: 45000,
  },
  {
    descripcion: "ABL",
    tipo: "costo",
    valor: 4107,
  },
  {
    descripcion: "Internet y teléfono/celular",
    tipo: "costo",
    valor: 10450,
  },
  {
    descripcion: "Limpieza y saneamiento",
    tipo: "costo",
    valor: 23680,
  },
  {
    descripcion: "Mantenimiento de equipos",
    tipo: "costo",
    valor: 110340,
  },
  {
    descripcion: "Seguros",
    tipo: "costo",
    valor: 7327,
  },
  {
    descripcion: "Amortización de maquinaria",
    tipo: "costo",
    valor: 6500,
  },
  {
    descripcion: "Papelería y útiles",
    tipo: "costo",
    valor: 4690,
  },
  {
    descripcion: "Servicios profesionales",
    tipo: "costo",
    valor: 35000,
  },
  {
    descripcion: "Capacitación y asistencia técnica",
    tipo: "costo",
    valor: 24000,
  },
  {
    descripcion: "Publicidad y Promoción",
    tipo: "costo",
    valor: 6000,
  },
  {
    descripcion: "Impuestos",
    tipo: "costo",
    valor: 4500,
  },
  {
    descripcion: "Gastos bancarios",
    tipo: "costo",
    valor: 4567,
  },
];
