import { Server as SocketIOServer } from "socket.io";
import http from "http";

export const initSockerServer = (server: http.Server) => {
  const io = new SocketIOServer(server);
  io.on("connection", (socket: any) => {
    console.log("A User is Connected");

    // Listen for 'Notifications' from front end

    socket.on("notification", (data: any) => {
      //  Broadcast Notification to All Clients (Admin Dashboard)

      io.emit("newNotifications", data);
    });
    socket.on("disconnect", () => {
      console.log("A User Disconnected");
    });
  });
};
