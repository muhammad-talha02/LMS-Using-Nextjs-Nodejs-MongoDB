import { app } from "./app";
import { v2 as cloudinary } from "cloudinary";
import http from "node:http";
require("dotenv").config();
import connecDB from "./utils/db";
import { initSockerServer } from "./socketServer";

const server = http.createServer(app);

// Cloudinary Config

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_SECRET_KEY,
});

initSockerServer(server);

// Server starting
server.listen(process.env.PORT, () => {
  console.log(`servers is Running at ${process.env.PORT} `);
  connecDB();
});
