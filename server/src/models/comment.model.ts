import mongoose from "mongoose";
import { UserDocument } from "./user.model";
import { QuestionDocument } from "./question.model";
import { AnswerDocument } from "./answer.model";

export interface CommentDocument extends mongoose.Document {
    user: UserDocument;
    question: QuestionDocument;
    answer: AnswerDocument;
    content: string;
    createdAt: Date;
    updatedAt: Date;
}

const commentSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        question: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Question",
        },
        answer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Answer",
        },
        content: { type: String, required: true },
    },
    {
        timestamps: true,
    }
);

const Comment = mongoose.model<CommentDocument>("Comment", commentSchema);

export default Comment;
