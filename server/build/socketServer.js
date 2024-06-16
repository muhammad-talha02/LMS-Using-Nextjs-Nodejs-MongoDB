"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initSockerServer = void 0;
const socket_io_1 = require("socket.io");
const initSockerServer = (server) => {
    const io = new socket_io_1.Server(server);
    io.on("connection", (socket) => {
        console.log("A User is Connected");
        // Listen for 'Notifications' from front end
        socket.on("notification", (data) => {
            //  Broadcast Notification to All Clients (Admin Dashboard)
            io.emit("newNotifications", data);
        });
        socket.on("disconnect", () => {
            console.log("A User Disconnected");
        });
    });
};
exports.initSockerServer = initSockerServer;
