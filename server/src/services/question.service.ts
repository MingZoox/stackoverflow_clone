import { Request } from "express";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongoose";
import env from "../configs/env.config";
import Question, { QuestionDocument } from "../models/question.model";
import { Role } from "../models/user.model";
import questionSchema from "../utils/validation/question.validation";

async function addQuestion(req: Request): Promise<ObjectId> {
    const questionValidation = questionSchema.validate(req.body);
    if (questionValidation.error) {
        throw new Error(questionValidation.error.details[0].message);
    }

    const userId: ObjectId = req.user._id;
    const question: QuestionDocument = new Question({ ...req.body, user: userId });
    const createdQuestion = await question.save();
    return createdQuestion._id;
}

async function getQuestion(req: Request): Promise<any> {
    const question: QuestionDocument | null = await Question.findById(req.params.id).populate(
        "user",
        "username avatar"
    );
    if (!question) throw new Error("Couldn't find question");

    const authToken = req.cookies.Authorization;
    const userAuthenticatedId: any = jwt.verify(authToken, env.ACCESS_TOKEN_SECRET as string);

    const questionDTO = {
        title: question.title,
        content: question.content,
        tags: question.tags,
        user: question.user,
        createAt: question.createdAt,
        likes: question.usersLiked.length,
        hasCurrentUserLiked:
            question.usersLiked.filter((user) => userAuthenticatedId?._id === user.toString())
                .length > 0,
    };
    return questionDTO;
}

async function getQuestionsPagination(
    req: Request
): Promise<{ questions: Array<QuestionDocument>; totalPages: number }> {
    const page: number = parseInt(req.query.page as string, 10);
    const limit: number = parseInt(req.query.limit as string, 10);

    const totalQuestions: number = await Question.countDocuments();
    if (!totalQuestions) throw new Error("Query to database got error");
    const totalPages = Math.ceil(totalQuestions / limit);

    if (page <= 0 || page > totalPages || limit <= 0) throw new Error("Parameters aren't accepted");

    const questions: Array<QuestionDocument> | null = await Question.find()
        .populate("user", "username avatar")
        .select("title")
        .limit(limit)
        .skip((page - 1) * limit);

    if (!questions) throw new Error("Query to database got error");
    return { questions, totalPages };
}

async function updateQuestionContent(req: Request): Promise<ObjectId> {
    const question: QuestionDocument | null = await Question.findById(req.params.id);
    if (!question) throw new Error("Couldn't find question");

    if (!(req.user?.role === Role.ADMIN_ROLE)) {
        if (req.body.content?.length > 1500) {
            throw new Error("Content must less than 1500 characters");
        }

        if (!req.user._id.equals(question.user)) {
            throw new Error("Bad authen");
        }
    }

    question.content = req.body.content;
    const questionUpdated: QuestionDocument = await question.save();
    return questionUpdated._id;
}

async function deleteQuestion(req: Request): Promise<ObjectId> {
    const question: QuestionDocument | null = await Question.findById(req.params.id);
    if (!question) throw new Error("Couldn't delete question");

    // admin doesn't need to check user is correct or not
    if (!(req.user?.role === Role.ADMIN_ROLE) && !req.user._id.equals(question.user)) {
        throw new Error("Bad authen");
    }

    const questionDeleted: QuestionDocument | null = await Question.findByIdAndDelete(
        req.params.id
    );
    if (!questionDeleted) throw new Error("Couldn't find user");
    return question._id;
}

async function toggleLikeQuestion(req: Request): Promise<ObjectId> {
    const question: QuestionDocument | null = await Question.findById(req.params.id);
    if (!question) throw new Error("Couldn't find question");

    // like if disliked, dislike if liked
    if (question.usersLiked.filter((user) => req.user._id.equals(user)).length > 0) {
        question.usersLiked = question.usersLiked.filter((user) => !req.user._id.equals(user));
    } else {
        question.usersLiked.push(req.user._id);
    }

    const questionUpdated: QuestionDocument = await question.save();
    return questionUpdated._id;
}

export {
    addQuestion,
    getQuestion,
    getQuestionsPagination,
    updateQuestionContent,
    deleteQuestion,
    toggleLikeQuestion,
};