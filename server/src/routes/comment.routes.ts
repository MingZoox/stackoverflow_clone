import express from "express";
import * as commentControllers from "../controllers/comment.controller";
import authen from "../middlewares/authen.middleware";

const commentRouter = express.Router();

commentRouter.post("/comments", authen, commentControllers.addComment);

export default commentRouter;
