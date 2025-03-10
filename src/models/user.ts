import { model, models, Schema } from "mongoose";

const UserSchema = new Schema({
  code: {
    type: Number,
    unique: true,
    required: false
  },
  name: {
    type: String,
    unique: false,
    required: [true, "Nombre es requerido"],
  },
  lastName: {
    type: String,
    unique: false,
    required: [true, "Apellido es requerido"],
  },
  username: {
    type: String,
    unique: true,
    required: [true, "Username es requerido"],
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Email es requerido"],
  },
  password: {
    type: String,
    unique: false,
    required: [true, "Contraseña es requerido"],
  },
  active: {
    type: Boolean,
    unique: false,
    required: false
  },
  enterprice: {
    type: Schema.Types.ObjectId,
    ref: "Enterprice",
    unique: false,
    required: [true, "Empresa es requerido"],
  },
  isAdmin: {
    type: Boolean,
    unique: false,
    required: false,
  },
});

const User = models.User || model("User", UserSchema);

export default User