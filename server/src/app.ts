import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import env from "./configs/env.config";
import socketConfig from "./configs/socket.config";
import "./configs/db.config";
import router from "./routes";

const app = express();

app.use(
    cors({
        origin: [env.CLIENT_URL as string, "http://localhost:3000"],
        credentials: true,
        allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
        methods: ["POST", "PUT", "GET", "DELETE"],
    })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/api", router);

if (env.NODE_ENV === "production") {
    app.use(express.static(path.resolve(__dirname, "./build")));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "./build", "index.html"));
    });
}

const httpServer = app.listen(env.PORT || 8000, () => {
    console.log(`Application is running on ${env.PORT || 8000}`);
});

socketConfig(httpServer);
