import { FormControl  } from "@/components/GenericControls";

export const dataControls: FormControl[] = [
  {
    id: "1",
    name: "barcode",
    label: "Código de barras",
    placeholder: "Ingrese uno o generar un código automaticamente al registrar",
    type: "text",
    value: "",
    required: false,
    message: "Este campo es requerido",
  },
  {
    id: "2",
    name: "alternateKey",
    label: "Clave alterna",
    placeholder: "Ej: COCA600",
    type: "text",
    value: "",
    required: true,
    message: "",
  },
  {
    id: "3",
    name: "productName",
    label: "Nombre del Artículo",
    placeholder: "Ej: CocaCola 600ml",
    type: "text",
    value: "",
    required: true,
    message: "Este campo es requerido",
  },
  {
    id: "4",
    name: "category",
    label: "Categoria",
    placeholder: "Elige uno",
    type: "select",
    value: "",
    options: [
      {
        name: "Refresco",
        value: "Refresco"
      },
      {
        name: "Cerveza",
        value: "Cerveza"
      },
      {
        name: "Energizantes",
        value: "Energizantes"
      },
      {
        name: "Agua",
        value: "Agua"
      },
      {
        name: "Jugoos",
        value: "Jugoos"
      },
      {
        name: "Monster Energy",
        value: "Monster Energy"
      },
    ],
    required: false,
    message: "",
  },
  {
    id: "5",
    name: "brand",
    label: "Marca",
    placeholder: "Elije uno",
    type: "select",
    value: "",
    options: [
      {
        name: "CocaCola",
        value: "CocaCola"
      },
      {
        name: "Pepsi",
        value: "Pepsi"
      },
      {
        name: "Corona",
        value: "Corona"
      },
      {
        name: "Modelo",
        value: "Modelo"
      },
      {
        name: "Monster Energy",
        value: "Monster Energy"
      },
      {
        name: "RedBull",
        value: "RedBull"
      },
      {
        name: "Electrolit",
        value: "Electrolit"
      },
      {
        name: "Boost",
        value: "Boost"
      },
    ],
    required: false,
    message: "",
  },
  {
    id: "6",
    name: "price",
    label: "Precio",
    placeholder: "Ej: 35.50",
    type: "number",
    value: "",
    required: true,
    message: "Este campo es requerido",
    prefix: "$"
  }
];
