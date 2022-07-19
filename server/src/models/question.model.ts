import mongoose, { ObjectId } from "mongoose";

export interface QuestionDocument extends mongoose.Document {
    user: ObjectId;
    title: string;
    content: string;
    tags: string[];
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
