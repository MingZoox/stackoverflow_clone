import { Server } from "socket.io";

function socketConfig(httpServer: any) {
    const io = new Server(httpServer, {
        cors: {
            origin: "http://localhost:3000",
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
