import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { v2 as cloudinary } from "cloudinary";
import authRoute from "./routes/auth.js";
import productRoute from "./routes/product.js";

dotenv.config();
const env = process.env.environemnt;
const app = express();

cloudinary.config({
  cloud_name: "da4vjfd6j",
  api_key: "596459554247427",
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

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
  console.log(
    `Server running on ${env === "local" ? "http://localhost:3000" : ""}`
  );
});
