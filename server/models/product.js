import mongose from "mongoose";

const schema = new mongose.Schema({
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
});

schema.statics.createProduct = function () {};

module.exports =
  mongoose.models.schema || mongoose.model("productModel", schema);
