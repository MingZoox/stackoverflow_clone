import express from "express";
import * as userControllers from "../controllers/user.controller";
import authen from "../middlewares/authen.middleware";
import adminRequired from "../middlewares/adminRequired.middleware";

const adminRouter = express.Router();

adminRouter.post("/admin/users", authen, adminRequired, userControllers.addUser);

adminRouter.delete("/users/:id", authen, adminRequired, userControllers.deleteUser);

export default adminRouter;
