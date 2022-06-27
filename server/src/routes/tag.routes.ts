import express from "express";
import * as tagControllers from "../controllers/tag.controller";

const questionRouter = express.Router();

questionRouter.get("/tags", tagControllers.getTags);
questionRouter.get("/tags/:tag", tagControllers.getQuestionsByTag);

export default questionRouter;
