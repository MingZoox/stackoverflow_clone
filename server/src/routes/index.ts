import express from "express";
import userRouter from "./user.routes";
import adminRouter from "./admin.routes";
import questionRouter from "./question.routes";
import tagRourer from "./tag.routes";

const router = express.Router();

router.use(userRouter);
router.use(adminRouter);
router.use(questionRouter);
router.use(tagRourer);

export default router;
