import { app } from "./app";
import { v2 as cloudinary } from "cloudinary";
require("dotenv").config();
import connecDB from "./utils/db";

// Cloudinary Config

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_SECRET_KEY,
});

// Server starting
app.listen(process.env.PORT, () => {
  console.log(`servers is Running at ${process.env.PORT} `);
  connecDB();
});
