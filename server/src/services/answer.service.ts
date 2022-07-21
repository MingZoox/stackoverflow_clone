import { Request } from "express";
import { ObjectId } from "mongoose";
import Comment, { CommentDocument } from "../models/comment.model";
import Answer, { AnswerDocument } from "../models/answer.model";
import { Role } from "../models/user.model";
import Question, { QuestionDocument } from "../models/question.model";

async function addAnswer(req: Request): Promise<ObjectId> {
    if (req.body.content.length > 1500) throw new Error("Answer no more than 1500 letters");

    const userId: ObjectId = req.user._id;

    const answer: AnswerDocument = new Answer({
        ...req.body,
        user: userId,
        question: req.params.questionId,
    });

    const createdAnswer: AnswerDocument = await answer.save();
    if (!createdAnswer) throw new Error("Query to database got error");

    const question: QuestionDocument | null = await Question.findById(req.params.questionId);
    if (!question) throw new Error("Query to database got error");

    question.numAnswers += 1;
    await question.save();

    return createdAnswer._id;
}

async function getAnswersByQuestionId(questionId: ObjectId): Promise<Array<object>> {
    const answers: Array<AnswerDocument> | null = await Answer.find({
        question: questionId,
    }).populate("user", "username avatar");

    const answersDTO: Array<object> = await Promise.all(
        answers.map(async (answer): Promise<object> => {
            // get comments by answer id
            const comments: Array<CommentDocument> = await Comment.find({
                answer: answer._id,
            })
                .populate("user", "username")
                .select("content createdAt");

            return {
                _id: answer._id,
                user: answer.user,
                content: answer.content,
                comments,
                likes: answer.usersLiked.length - answer.usersDisliked.length,
                createdAt: answer.createdAt,
            };
        })
    );

    return answersDTO;
}

async function updateAnswer(req: Request): Promise<ObjectId> {
    const answer: AnswerDocument | null = await Answer.findById(req.params.id).populate("user");
    if (!answer) throw new Error("Couldn't find answer");

    if (!(req.user?.role === Role.ADMIN_ROLE)) {
        if (req.body.content?.length > 1500) {
            throw new Error("Content must less than 1500 characters");
        }

        if (!req.user._id.equals(answer.user._id)) {
            throw new Error("Bad authen");
        }
    }

    answer.content = req.body.content;
    const answerUpdated: AnswerDocument = await answer.save();
    return answerUpdated._id;
}

async function deleteAnswer(req: Request): Promise<ObjectId> {
    const answer: AnswerDocument | null = await Answer.findById(req.params.id).populate("user");
    if (!answer) throw new Error("Couldn't find answer");

    // admin doesn't need to check user is correct or not
    if (!(req.user?.role === Role.ADMIN_ROLE) && !req.user._id.equals(answer.user._id)) {
        throw new Error("Bad authen");
    }

    const answerDeleted: AnswerDocument | null = await Answer.findByIdAndDelete(req.params.id);
    if (!answerDeleted) throw new Error("Couldn't find answer");
    return answer._id;
}

async function toggleLikeAnswer(req: Request): Promise<ObjectId> {
    const answer: AnswerDocument | null = await Answer.findById(req.params.id);
    if (!answer) throw new Error("Couldn't find Answer");

    // like if unliked, unlike if liked
    if (answer.usersLiked.includes(req.user._id)) {
        answer.usersLiked = answer.usersLiked.filter((user) => !req.user._id.equals(user));
    } else {
        answer.usersLiked.push(req.user._id);
    }

    const answerUpdated: AnswerDocument = await answer.save();
    return answerUpdated._id;
}

async function toggleDislikeAnswer(req: Request): Promise<ObjectId> {
    const answer: AnswerDocument | null = await Answer.findById(req.params.id);
    if (!answer) throw new Error("Couldn't find Answer");

    // dislike if undisliked, undislike if disliked
    if (answer.usersDisliked.includes(req.user._id)) {
        answer.usersDisliked = answer.usersDisliked.filter((user) => !req.user._id.equals(user));
    } else {
        answer.usersDisliked.push(req.user._id);
    }

    const answerUpdated: AnswerDocument = await answer.save();
    return answerUpdated._id;
}

export {
    addAnswer,
    getAnswersByQuestionId,
    updateAnswer,
    deleteAnswer,
    toggleLikeAnswer,
    toggleDislikeAnswer,
};
