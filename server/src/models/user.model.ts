/* eslint-disable no-unused-vars */
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import env from "../configs/env.config";

// eslint-disable-next-line no-shadow
export enum Role {
    USER_ROLE = "user",
    ADMIN_ROLE = "admin",
}

export interface UserDocument extends mongoose.Document {
    username: string;
    email: string;
    password: string;
    isActive: boolean;
    reputation: number;
    notifications: Array<{
        content: String;
        link: String;
        date: Date;
    }>;
    avatar: string;
    about: string;
    role: Role.USER_ROLE | Role.ADMIN_ROLE;
    comparePassword(candidatePassword: string): Promise<boolean>;
    generateJwt(): string;
}

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isActive: { type: Boolean, default: true },
    reputation: { type: Number, default: 0 },
    notifications: [
        {
            content: String,
            link: String,
            date: Date,
        },
    ],
    avatar: {
        type: String,
        default:
            "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/cute-cat-photos-1593441022.jpg?crop=0.669xw:1.00xh;0.166xw,0&resize=640:*",
    },
    about: {
        type: String,
        default: "About me!",
    },
    role: {
        type: String,
        default: Role.USER_ROLE,
        enum: [Role.USER_ROLE, Role.ADMIN_ROLE],
    },
});

userSchema.methods.comparePassword = async function (candidatePassword: string) {
    const isPasswordValid = await bcrypt.compare(candidatePassword, this.password);
    return isPasswordValid;
};

userSchema.methods.generateJwt = function () {
    return jwt.sign({ _id: this._id }, env.ACCESS_TOKEN_SECRET as string, { expiresIn: "2 days" });
};

userSchema.pre("save", async function (next) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

const User = mongoose.model<UserDocument>("User", userSchema);

export default User;
