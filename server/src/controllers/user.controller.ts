import { Request, Response } from "express";
import * as userServices from "../services/user.service";

const addUser = async function (req: Request, res: Response) {
    try {
        const createdUserId = await userServices.addUser(req);
        return res.status(200).json(createdUserId);
    } catch (error: any) {
        if (error.code === 11000) return res.status(400).json({ message: "email already exist" });
        if (error.message) return res.status(400).json({ message: error.message });
        return res.status(500).json(error);
    }
};

const userLogin = async function (req: Request, res: Response) {
    try {
        const token = await userServices.loginUser(req);
        return res
            .cookie("Authorization", token, {
                httpOnly: true,
            })
            .status(200)
            .json("Logged in successfully");
    } catch (error: any) {
        if (error.message) return res.status(400).json({ message: error.message });
        return res.status(500).json(error);
    }
};

const userLoginOAuth = async function (req: Request, res: Response) {
    try {
        const token = await userServices.loginUserOAuth(req);
        return res
            .cookie("Authorization", token, {
                httpOnly: true,
            })
            .status(200)
            .json("Logged in successfully");
    } catch (error: any) {
        if (error.message) return res.status(400).json({ message: error.message });
        return res.status(500).json(error);
    }
};

const getUser = async function (req: Request, res: Response) {
    try {
        const user = await userServices.getUser(req);
        return res.status(200).json(user);
    } catch (error: any) {
        if (error.message) return res.status(400).json({ message: error.message });
        return res.status(500).json(error);
    }
};

const getUsersPagination = async function (req: Request, res: Response) {
    try {
        const { users, totalPages } = await userServices.getUsersPagination(req);
        return res.status(200).json({ users, totalPages });
    } catch (error: any) {
        if (error.message) return res.status(400).json({ message: error.message });
        return res.status(500).json(error);
    }
};

const updateUser = async function (req: Request, res: Response) {
    try {
        const userUpdatedId = await userServices.updateUser(req);
        return res.status(200).json(userUpdatedId);
    } catch (error: any) {
        if (error.message) return res.status(400).json({ message: error.message });
        return res.status(500).json(error);
    }
};

const deleteUser = async function (req: Request, res: Response) {
    try {
        const userDeletedId = await userServices.deleteUser(req);
        return res.status(200).json(userDeletedId);
    } catch (error: any) {
        if (error.message) return res.status(400).json({ message: error.message });
        return res.status(500).json(error);
    }
};

const getCurrentUser = function (req: Request, res: Response) {
    return res.json(req.user);
};

const uploadAvatar = async function (req: Request, res: Response) {
    try {
        await userServices.uploadAvatar(req);
        return res.status(201).json({ message: "Image uploaded successfully" });
    } catch (error: any) {
        if (error.message) return res.status(400).json({ message: error.message });
        return res.status(500).json(error);
    }
};

const sendMailForgetPassword = function (req: Request, res: Response) {
    try {
        userServices.sendMailForgetPassword(req);
        return res.status(200).json({ message: "Send verify request to email successful" });
    } catch (error: any) {
        if (error.message) return res.status(400).json({ message: error.message });
        return res.status(500).json(error);
    }
};

const verifyMailForgetPassword = function (req: Request, res: Response) {
    try {
        userServices.verifyMailForgetPassword(req);
        const baseClientURL = "http://localhost:3000/users/login";
        return res.redirect(baseClientURL);
    } catch (error: any) {
        if (error.message) return res.status(400).json({ message: error.message });
        return res.status(500).json(error);
    }
};

export {
    addUser,
    userLogin,
    userLoginOAuth,
    getCurrentUser,
    getUser,
    getUsersPagination,
    updateUser,
    deleteUser,
    uploadAvatar,
    sendMailForgetPassword,
    verifyMailForgetPassword,
};
