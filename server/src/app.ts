import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import env from "./configs/env.config";
import "./configs/db.config";
import router from "./routes";

const app = express();

app.use(
    cors({
        origin: ["http://localhost:3000"],
        credentials: true,
        allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
        methods: ["POST", "PUT", "GET", "DELETE"],
    })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(router);

app.listen(env.PORT, () => {
    console.log(`Application is running on ${env.PORT?.toString()}`);
});
