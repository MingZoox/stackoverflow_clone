import express from "express";
import * as questionControllers from "../controllers/question.controller";
import authen from "../middlewares/authen.middleware";

const questionRouter = express.Router();

questionRouter.get("/questions", questionControllers.getQuestionsPagination);
questionRouter.get("/questions/:id", questionControllers.getQuestion);

questionRouter.post("/questions", authen, questionControllers.addQuestion);

questionRouter.put("/questions/like/:id", authen, questionControllers.toggleLikeQuestion);
questionRouter.put("/questions/dislike/:id", authen, questionControllers.toggleDislikeQuestion);
questionRouter.put("/questions/:id", authen, questionControllers.updateQuestionContent);

export default questionRouter;
