import mongoose from "mongoose";

const schema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },
  imageUrl: {
    type: String,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "userModel",
    required: true,
  },
});

schema.statics.createProduct = function (productData) {
  return this.create(productData);
};

export default mongoose.models.productModel ||
  mongoose.model("productModel", schema);
