import { Request } from "express";
import { ObjectId } from "mongoose";
import Answer, { AnswerDocument } from "../models/answer.model";
import Comment, { CommentDocument } from "../models/comment.model";
import Question, { QuestionDocument } from "../models/question.model";
import User, { Role, UserDocument } from "../models/user.model";

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

    // add notification
    if (req.body.questionId) {
        const question: QuestionDocument | null = await Question.findById(req.body.questionId);
        if (!question) throw new Error("Couldn't find question !!");

        const userOwnQuestion: UserDocument | null = await User.findById(question.user);
        if (!userOwnQuestion) throw new Error("Couldn't find question user !!");

        if (!userOwnQuestion._id.equals(req.user._id)) {
            if (userOwnQuestion.notifications.length === 100) {
                userOwnQuestion.notifications.pop();
            }
            userOwnQuestion.notifications.unshift({
                content: `${req.user.username} commented your question`,
                link: `/questions/${req.params.questionId}`,
                date: createdComment.createdAt,
            });

            await userOwnQuestion.save();
        }
    } else if (req.body.answerId) {
        const answer: AnswerDocument | null = await Answer.findById(req.body.answerId);
        if (!answer) throw new Error("Couldn't find Answer !!");

        const userOwnAnswer: UserDocument | null = await User.findById(answer.user);
        if (!userOwnAnswer) throw new Error("Couldn't find Answer user !!");

        if (!userOwnAnswer._id.equals(req.user._id)) {
            if (userOwnAnswer.notifications.length === 100) {
                userOwnAnswer.notifications.pop();
            }
            userOwnAnswer.notifications.unshift({
                content: `${req.user.username} commented your answer`,
                link: `/questions/${answer.question}`,
                date: createdComment.createdAt,
            });

            await userOwnAnswer.save();
        }
    }

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
        comment.content = req.body.content;
        const commentUpdated: CommentDocument = await comment.save();
        return commentUpdated._id;
    }

    const commentUpdated: CommentDocument | null = await Comment.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
    );
    if (!commentUpdated) throw new Error("Couldn't update comment");

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
