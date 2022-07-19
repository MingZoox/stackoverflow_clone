import express from "express";
import * as answerControllers from "../controllers/answer.controller";
import authen from "../middlewares/authen.middleware";

const answerRouter = express.Router();

answerRouter.post("/answers/:questionId", authen, answerControllers.addAnswer);

answerRouter.put("/questions/like/:id", authen, answerControllers.toggleLikeAnswer);
answerRouter.put("/questions/dislike/:id", authen, answerControllers.toggleDislikeAnswer);

export default answerRouter;
