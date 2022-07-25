/* eslint-disable no-shadow */
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import env from "../configs/env.config";
import User, { UserDocument } from "../models/user.model";

declare module "express" {
    // eslint-disable-next-line no-unused-vars
    interface Request {
        user?: any;
    }
}

const authen = function (req: Request, res: Response, next: NextFunction) {
    const authToken = req.cookies.Authorization;
    if (!authToken) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    jwt.verify(authToken, env.ACCESS_TOKEN_SECRET as string, async (error: any, data: any) => {
        if (error) return res.status(403).json({ message: "Forbidden" });

        const user: UserDocument | null = await User.findById(data?._id).select(
            "username email reputation notifications avatar role about"
        );
        if (!user) return res.status(403).json({ message: "User invaliad" });

        req.user = user;
        next();
    });
};

export default authen;
