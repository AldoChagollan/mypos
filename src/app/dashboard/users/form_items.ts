interface PatternControl {
  value: RegExp;
  message: string;
}

export interface Control {
  id: string;
  name: string;
  label: string;
  placeholder: string;
  type:
    | "text"
    | "number"
    | "select"
    | "date"
    | "checkbox"
    | "password"
    | "email";
  value: string | number | boolean;
  required: boolean;
  message: string;
  pattern?: PatternControl;
}

export const dataControls: Control[] = [
  {
    id: "1",
    name: "name",
    label: "Nombre",
    placeholder: "Ingrese nombre",
    type: "text",
    value: "",
    required: true,
    message: "Este campo es requerido"
  },
  {
    id: "2",
    name: "lastName",
    label: "Apellido",
    placeholder: "Ingrese apellido",
    type: "text",
    value: "",
    required: true,
    message: "Este campo es requerido"
  },
  {
    id: "3",
    name: "username",
    label: "Usuario",
    placeholder: "Ej: Juan3021",
    type: "text",
    value: "",
    required: true,
    message: "Este campo es requerido"
  },
  {
    id: "4",
    name: "email",
    label: "Correo electrónico",
    placeholder: "Ej: juan123@gmail.com",
    type: "email",
    value: "",
    required: true,
    message: "Este campo es requerido",
    pattern: {
        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        message: 'Por favor ingrese un correo electrónico válido'
      }
  },
  {
    id: "5",
    name: "password",
    label: "Contraseña",
    placeholder: "Ingrese una contraseña",
    type: "password",
    value: "",
    required: true,
    message: "Este campo es requerido",
    pattern: {
        value: /^.{6,}$/,
        message: 'La contraseña debe tener al menos 6 caracteres'
      }
  },
]