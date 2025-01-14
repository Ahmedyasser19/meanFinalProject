import mongose from "mongoose";

const schema = new mongose.Schema({
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
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  products: [],
});

schema.statics.createUser = function () {};

module.exports = mongoose.models.schema || mongoose.model("userModel", schema);
