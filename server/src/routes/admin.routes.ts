import express from "express";
import { addUser } from "../controllers/user.controller";
import authen from "../middlewares/authen.middleware";
import adminRequired from "../middlewares/adminRequired.middleware";

const adminRouter = express.Router();

adminRouter.post("/admin/users", authen, adminRequired, addUser);

export default adminRouter;
