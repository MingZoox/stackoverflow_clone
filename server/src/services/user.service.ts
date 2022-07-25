import { Request } from "express";
import Joi from "joi";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongoose";
import User, { Role, UserDocument } from "../models/user.model";
import env from "../configs/env.config";
import * as userSchema from "../utils/validation/user.validation";
import sendMailService from "../utils/sendMail.utils";
import Question from "../models/question.model";
import Answer from "../models/answer.model";
import Comment from "../models/comment.model";

function validationUser(data: UserDocument, validationSchema: Joi.ObjectSchema<any>): void {
    const userValidation = validationSchema.validate(data);
    if (userValidation.error) {
        throw new Error(userValidation.error.details[0].message);
    }
}

async function loginUser(req: Request): Promise<string> {
    validationUser(req.body, userSchema.loginSchema);

    const user: UserDocument | null = await User.findOne({ email: req.body.email });
    if (!user) throw new Error("email is invalid");

    const isLoginValid = await user.comparePassword(req.body.password);
    if (!isLoginValid) throw new Error("password is invalid");

    const token = user.generateJwt();
    return token;
}

async function addUser(req: Request): Promise<ObjectId> {
    // admin doesn't need to validate
    if (!(req.user?.role === Role.ADMIN_ROLE)) validationUser(req.body, userSchema.registerSchema);

    const user: UserDocument = new User(req.body);
    const createdUser: UserDocument = await user.save();
    return createdUser._id;
}

async function getUser(req: Request): Promise<UserDocument> {
    const user: UserDocument | null = await User.findById(req.params.id).select("-password");
    if (!user) throw new Error("Couldn't find user");
    return user;
}

async function getUsersPagination(
    req: Request
): Promise<{ users: Array<UserDocument>; totalPages: number }> {
    const page: number = parseInt(req.query.page as string, 10);
    const limit: number = parseInt(req.query.limit as string, 10);
    const filter: string = req.query.filter as string;

    let users: Array<UserDocument> | null = null;
    if (req.user?.role !== "admin") {
        users = await User.find()
            .select("username reputation avatar")
            .limit(limit)
            .skip((page - 1) * limit);
    } else {
        users = await User.find()
            .select("username email password reputation avatar about role")
            .limit(limit)
            .skip((page - 1) * limit);
    }

    if (!users) throw new Error("Query to database got error");

    if (filter) {
        users = users.filter((user) => user.username.startsWith(filter));
    }

    const totalUsers: number = users.length;
    if (!totalUsers) throw new Error("Query to database got error");
    const totalPages = Math.ceil(totalUsers / limit);

    if (page <= 0 || page > totalPages || limit <= 0) throw new Error("Parameters aren't accepted");

    return { users, totalPages };
}

async function updateUser(req: Request): Promise<ObjectId> {
    // admin doesn't need to validate
    if (!(req.user?.role === Role.ADMIN_ROLE)) {
        validationUser(req.body, userSchema.updateProfileSchema);

        if (req.user._id.toString() !== req.params.id) {
            throw new Error("Bad authen");
        }
    }

    if (req.body.password) {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
    }

    const user: UserDocument | null = await User.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
    );
    if (!user) throw new Error("Couldn't update user");
    return user._id;
}

async function deleteUser(req: Request): Promise<ObjectId> {
    const user: UserDocument | null = await User.findByIdAndDelete(req.params.id);
    if (!user) throw new Error("Couldn't delete user");

    await Question.deleteMany({ user: user._id });
    await Answer.deleteMany({ user: user._id });
    await Comment.deleteMany({ user: user._id });
    return user._id;
}

async function uploadAvatar(req: Request): Promise<ObjectId> {
    const userId = req.user._id;
    const user: UserDocument | null = await User.findByIdAndUpdate(
        userId,
        { $set: { avatar: `${env.AZURE_URL_AVATARS}/${userId.toString()}` } },
        { new: true }
    );
    if (!user) throw new Error("Couldn't update image");
    return user._id;
}

function sendMailForgetPassword(req: Request): void {
    const token = jwt.sign({ email: req.body.email }, env.ACCESS_TOKEN_SECRET as string, {
        expiresIn: "1h",
    });
    const verifyLink = `${env.SERVER_URL}/users/forget?token=${token}`;
    const contentHtml = `<h1>Account Recovery</h1>
    <p>Click on the following link to verify the request. Your password is automatically set to 12345678a</p>
    <p>${verifyLink}</p>
    <p>The link is valid for one hour</p>`;
    sendMailService(req.body.email, "Account Recovery", contentHtml);
}

function verifyMailForgetPassword(req: Request): void {
    const verifyToken: string = req.query.token as string;
    jwt.verify(verifyToken, env.ACCESS_TOKEN_SECRET as string, async (error: any, data: any) => {
        if (error) throw new Error("Token are not accepted");

        const salt = await bcrypt.genSalt(10);
        const newPassword = await bcrypt.hash("12345678a", salt);

        const user: UserDocument | null = await User.findOneAndUpdate(
            { email: data.email },
            { $set: { password: newPassword } },
            { new: true }
        );
        if (!user) throw new Error("Couldn't change password");
    });
}

export {
    loginUser,
    addUser,
    getUser,
    getUsersPagination,
    updateUser,
    deleteUser,
    uploadAvatar,
    sendMailForgetPassword,
    verifyMailForgetPassword,
};
