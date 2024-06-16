"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const cloudinary_1 = require("cloudinary");
const node_http_1 = __importDefault(require("node:http"));
require("dotenv").config();
const db_1 = __importDefault(require("./utils/db"));
const socketServer_1 = require("./socketServer");
const server = node_http_1.default.createServer(app_1.app);
// Cloudinary Config
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_SECRET_KEY,
});
(0, socketServer_1.initSockerServer)(server);
// Server starting
server.listen(process.env.PORT, () => {
    console.log(`servers is Running at ${process.env.PORT} `);
    (0, db_1.default)();
});
