import { Request } from "express";
import { ObjectId } from "mongoose";
import Comment, { CommentDocument } from "../models/comment.model";
import { Role } from "../models/user.model";

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

async function updateComment(req: Request): Promise<ObjectId> {
    const comment: CommentDocument | null = await Comment.findById(req.params.id).populate("user");
    if (!comment) throw new Error("Couldn't find comment");

    if (!(req.user?.role === Role.ADMIN_ROLE)) {
        if (req.body.content?.length > 300) {
            throw new Error("Content must less than 300 characters");
        }

        if (!req.user._id.equals(comment.user._id)) {
            throw new Error("Bad authen");
        }
    }

    comment.content = req.body.content;
    const commentUpdated: CommentDocument = await comment.save();
    return commentUpdated._id;
}

async function deleteComment(req: Request): Promise<ObjectId> {
    const comment: CommentDocument | null = await Comment.findById(req.params.id).populate("user");
    if (!comment) throw new Error("Couldn't find comment");

    // admin doesn't need to check user is correct or not
    if (!(req.user?.role === Role.ADMIN_ROLE) && !req.user._id.equals(comment.user._id)) {
        throw new Error("Bad authen");
    }

    const commentDeleted: CommentDocument | null = await Comment.findByIdAndDelete(req.params.id);
    if (!commentDeleted) throw new Error("Couldn't find comment");
    return comment._id;
}

export { addComment, updateComment, deleteComment };
