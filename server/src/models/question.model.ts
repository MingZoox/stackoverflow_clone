import mongoose, { ObjectId } from "mongoose";
import { UserDocument } from "./user.model";

export interface QuestionDocument extends mongoose.Document {
    user: UserDocument;
    title: string;
    content: string;
    tags: string[];
    numAnswers: number;
    usersLiked: ObjectId[];
    usersDisliked: ObjectId[];
    createdAt: Date;
    updatedAt: Date;
}

const questionSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        title: { type: String, required: true, trim: true },
        content: { type: String, required: true },
        tags: { type: [String], required: true },
        numAnswers: { type: Number, default: 0 },
        usersLiked: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        ],
        usersDisliked: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        ],
    },
    {
        timestamps: true,
    }
);

const Question = mongoose.model<QuestionDocument>("Question", questionSchema);

export default Question;
