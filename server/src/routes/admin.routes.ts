import express from "express";
import * as userControllers from "../controllers/user.controller";
import * as questionControllers from "../controllers/question.controller";
import authen from "../middlewares/authen.middleware";
import adminRequired from "../middlewares/adminRequired.middleware";

const adminRouter = express.Router();

adminRouter.post("/admin/users", authen, adminRequired, userControllers.addUser);

adminRouter.delete("/users/:id", authen, adminRequired, userControllers.deleteUser);
adminRouter.delete("/questions/:id", authen, adminRequired, questionControllers.deleteQuestion);

export default adminRouter;
