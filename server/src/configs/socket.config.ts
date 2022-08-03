import { Server } from "socket.io";
import env from "./env.config";

function socketConfig(httpServer: any) {
    const io = new Server(httpServer, {
        cors: {
            origin: env.CLIENT_URL,
            methods: ["GET", "POST"],
        },
    });

    io.on("connection", (socket) => {
        socket.on("join_room", (data) => {
            socket.join(data);
        });

        socket.on("send_message", (data) => {
            socket.to(data.room).emit("receive_message", data);
        });

        socket.on("disconnect", () => {});
    });
}

export default socketConfig;
