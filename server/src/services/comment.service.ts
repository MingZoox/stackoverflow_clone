import { Request } from "express";
import { ObjectId } from "mongoose";
import Comment, { CommentDocument } from "../models/comment.model";

async function addComment(req: Request): Promise<ObjectId> {
    if (req.body.content.length > 300) throw new Error("Comment no more than 300 letters");

    let comment: CommentDocument | null = null;
    if (req.body.questionId) {
        comment = new Comment({
            user: req.user._id,
            content: req.body.content,
            question: req.body.questionId,
        });
    } else {
        comment = new Comment({
            user: req.user._id,
            content: req.body.content,
            answer: req.body.answerId,
        });
    }

    const createdComment = await comment.save();
    if (!createdComment) throw new Error("Query to database got error");

    return createdComment._id;
}

// eslint-disable-next-line import/prefer-default-export
export { addComment };
