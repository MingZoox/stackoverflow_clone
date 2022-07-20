import mongoose, { ObjectId } from "mongoose";
import { UserDocument } from "./user.model";
import { QuestionDocument } from "./question.model";

export interface AnswerDocument extends mongoose.Document {
    user: UserDocument;
    question: QuestionDocument;
    content: string;
    usersLiked: ObjectId[];
    usersDisliked: ObjectId[];
    createdAt: Date;
    updatedAt: Date;
}

const answerSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        question: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Question",
        },
        content: { type: String, required: true },
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

const Answer = mongoose.model<AnswerDocument>("Answer", answerSchema);

export default Answer;
