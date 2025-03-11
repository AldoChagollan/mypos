import { model, models, Schema } from "mongoose";

const ProductSchema = new Schema({
  barcode: {
    type: String,
    unique: true,
    required: [true, "Barcode es requerido"],
  },
  alternateKey: {
    type: String,
    unique: true,
    required: [true, "alternateKey es requerido"],
  },
  productName: {
    type: String,
    unique: false,
    required: [true, "productName es requerido"],
  },
  category: {
    type: String,
    unique: false,
    required: false
  },
  brand: {
    type: String,
    unique: false,
    required: false
  },
  price: {
    type: Number,
    unique: false,
    required: [true, "price es requerido"],
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
});

const Product = models.Product || model("Product", ProductSchema);

export default Product