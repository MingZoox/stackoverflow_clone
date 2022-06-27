import { Request, Response, NextFunction } from "express";
import { Role } from "../models/user.model";

const authorAdmin = function (req: Request, res: Response, next: NextFunction) {
    if (req.user.role !== Role.ADMIN_ROLE) {
        return res.status(403).json({ message: "Permission denied" });
    }
    next();
};

export default authorAdmin;
