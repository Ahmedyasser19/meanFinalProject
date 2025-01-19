import mongoose from "mongoose";

const schema = new mongoose.Schema({
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
});

export default mongoose.models.userModel || mongoose.model("userModel", schema);
