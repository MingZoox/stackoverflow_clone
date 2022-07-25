import express from "express";
import * as userControllers from "../controllers/user.controller";
import authen from "../middlewares/authen.middleware";
import uploadFileMiddleware from "../middlewares/upload.middleware";

const userRouter = express.Router();

userRouter.get("/users/forget", userControllers.verifyMailForgetPassword);
userRouter.get("/users/me", authen, userControllers.getCurrentUser);
userRouter.get("/users", userControllers.getUsersPagination);
userRouter.get("/users/:id", userControllers.getUser);

userRouter.post("/users/login", userControllers.userLogin);
userRouter.post("/users/login/oauth", userControllers.userLoginOAuth);
userRouter.post("/users/forget", userControllers.sendMailForgetPassword);
userRouter.post("/users/register", userControllers.addUser);

userRouter.put("/users/avatar", authen, uploadFileMiddleware, userControllers.uploadAvatar);
userRouter.put("/users/:id", authen, userControllers.updateUser);

export default userRouter;
