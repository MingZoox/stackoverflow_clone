import mongoose, { ObjectId } from "mongoose";

export interface CommentDocument extends mongoose.Document {
    user: ObjectId;
    question: ObjectId;
    answer: ObjectId;
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
