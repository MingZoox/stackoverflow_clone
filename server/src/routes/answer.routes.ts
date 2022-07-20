import express from "express";
import * as answerControllers from "../controllers/answer.controller";
import authen from "../middlewares/authen.middleware";

const answerRouter = express.Router();

answerRouter.post("/answers/:questionId", authen, answerControllers.addAnswer);

answerRouter.put("/answers/like/:id", authen, answerControllers.toggleLikeAnswer);
answerRouter.put("/answers/dislike/:id", authen, answerControllers.toggleDislikeAnswer);
answerRouter.put("/answers/:id", authen, answerControllers.updateAnswer);

answerRouter.delete("/answers/:id", authen, answerControllers.deleteAnswer);

export default answerRouter;
