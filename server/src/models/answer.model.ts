import mongoose, { ObjectId } from "mongoose";

export interface AnswerDocument extends mongoose.Document {
    user: ObjectId;
    question: ObjectId;
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
