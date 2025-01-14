import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRoute from "./routes/auth.js";
import productRoute from "./routes/product.js";

const app = express();
dotenv.config();
//DB
mongoose
  .connect(process.env.MONGO_DB)
  .then(() => console.log("db connected"))
  .catch((e) => console.log("fucking error: " + e));

app.use(express.json());
app.use(cors());
app.use("/api/auth", authRoute);
app.use("/api/products", productRoute);

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
