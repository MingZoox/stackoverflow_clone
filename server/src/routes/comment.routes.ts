import express from "express";
import * as commentControllers from "../controllers/comment.controller";
import authen from "../middlewares/authen.middleware";

const commentRouter = express.Router();

commentRouter.post("/comments", authen, commentControllers.addComment);

commentRouter.put("/comments/:id", authen, commentControllers.updateComment);

commentRouter.delete("/comments/:id", authen, commentControllers.deleteComment);

export default commentRouter;
