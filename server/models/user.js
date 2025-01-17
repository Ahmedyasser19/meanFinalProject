import mongoose from "mongoose";

const schema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  pw: {
    type: String,
    required: true,
  },
  jwt: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "productModel",
    },
  ],
});

export default mongoose.models.userModel || mongoose.model("userModel", schema);
