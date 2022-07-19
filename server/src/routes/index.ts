import express from "express";
import userRouter from "./user.routes";
import adminRouter from "./admin.routes";
import questionRouter from "./question.routes";
import tagRourer from "./tag.routes";
import answerRouter from "./answer.routes";
import commentRouter from "./comment.routes";

const router = express.Router();

router.use(userRouter);
router.use(adminRouter);
router.use(questionRouter);
router.use(tagRourer);
router.use(answerRouter);
router.use(commentRouter);

export default router;
