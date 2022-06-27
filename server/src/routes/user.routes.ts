import express from "express";
import * as userControllers from "../controllers/user.controller";
import authen from "../middlewares/authen.middleware";
import adminRequired from "../middlewares/adminRequired.middleware";
import uploadFileMiddleware from "../middlewares/upload.middleware";

const userRouter = express.Router();

userRouter.get("/users/forget", userControllers.verifyMailForgetPassword);
userRouter.get("/users/me", authen, userControllers.getCurrentUser);
userRouter.get("/users", userControllers.getUsersPagination);
userRouter.get("/users/:id", userControllers.getUser);

userRouter.post("/users/login", userControllers.userLogin);
userRouter.post("/users/forget", userControllers.sendMailForgetPassword);
userRouter.post("/users/avatar", authen, uploadFileMiddleware, userControllers.uploadAvatar);
userRouter.post("/users", userControllers.addUser);

userRouter.put("/users/:id", authen, userControllers.updateUser);
userRouter.delete("/users/:id", authen, adminRequired, userControllers.deleteUser);

export default userRouter;
