import { Request } from "express";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongoose";
import env from "../configs/env.config";
import { getAnswersByQuestionId } from "./answer.service";
import Comment, { CommentDocument } from "../models/comment.model";
import Question, { QuestionDocument } from "../models/question.model";
import { Role } from "../models/user.model";
import questionSchema from "../utils/validation/question.validation";

async function addQuestion(req: Request): Promise<ObjectId> {
    req.body.tags = req.body.tags.split(",");

    const questionValidation = questionSchema.validate(req.body);
    if (questionValidation.error) {
        throw new Error(questionValidation.error.details[0].message);
    }

    const userId: ObjectId = req.user._id;

    const question: QuestionDocument = new Question({ ...req.body, user: userId });
    const createdQuestion = await question.save();
    if (!createdQuestion) throw new Error("Query to database got error");

    return createdQuestion._id;
}

async function getQuestion(req: Request): Promise<object> {
    const question: QuestionDocument | null = await Question.findById(req.params.id).populate(
        "user",
        "username avatar reputation"
    );
    if (!question) throw new Error("Couldn't find question");

    // get user id to check has current user liked or not
    const authToken: string = req.cookies.Authorization;
    const userAuthenticated: any = jwt.verify(authToken, env.ACCESS_TOKEN_SECRET as string);

    // get comments by question id
    const comments: Array<CommentDocument> = await Comment.find({
        question: question._id,
    })
        .populate("user", "username")
        .select("content");

    // get answers by question id
    const answers: Array<object> = await getAnswersByQuestionId(req, question._id);

    const questionDTO = {
        title: question.title,
        content: question.content,
        tags: question.tags,
        user: question.user,
        comments,
        answers,
        createdAt: question.createdAt,
        likes: question.usersLiked.length - question.usersDisliked.length,
        hasCurrentUserLiked: question.usersLiked.includes(userAuthenticated._id),
        hasCurrentUserDisliked: question.usersDisliked.includes(userAuthenticated._id),
    };

    return questionDTO;
}

async function getQuestionsPagination(
    req: Request
): Promise<{ questions: Array<QuestionDocument>; totalPages: number; totalQuestions: number }> {
    const page: number = parseInt(req.query.page as string, 10);
    const limit: number = parseInt(req.query.limit as string, 10);
    const order: string = req.query.order as string;

    const totalQuestions: number = await Question.countDocuments();
    if (!totalQuestions) throw new Error("Query to database got error");

    const totalPages = Math.ceil(totalQuestions / limit);
    if (page <= 0 || page > totalPages || limit <= 0) throw new Error("Parameters aren't accepted");

    let questions: Array<QuestionDocument> | null = null;

    if (order === "newest") {
        questions = await Question.find()
            .populate("user", "username avatar")
            .sort({ createdAt: -1 })
            .select("title tags content usersLiked usersLiked numAnswers")
            .limit(limit)
            .skip((page - 1) * limit);
    } else if (order === "score") {
        questions = await Question.find()
            .populate("user", "username avatar")
            .select("title tags content usersLiked usersLiked numAnswers");
        questions.sort(
            (questionA, questionB) => questionB.usersLiked.length - questionA.usersLiked.length
        );
        questions = questions.slice((page - 1) * limit, (page - 1) * limit + limit);
    } else if (order === "unanswered") {
        questions = await Question.find()
            .populate("user", "username avatar")
            .select("title tags content usersLiked usersLiked numAnswers");
        questions.sort((questionA, questionB) => questionA.numAnswers - questionB.numAnswers);
        questions = questions.slice((page - 1) * limit, (page - 1) * limit + limit);
    }

    if (!questions) throw new Error("Query to database got error");

    return { questions, totalPages, totalQuestions };
}

async function getRecentQuestions(req: Request) {
    const questions: Array<QuestionDocument> | null = await Question.find({
        user: req.params.userId,
    }).select("title");

    if (!questions) throw new Error("Query to database got error");

    const recentQuestions = questions.reverse();

    return recentQuestions;
}

async function updateQuestionContent(req: Request): Promise<ObjectId> {
    const question: QuestionDocument | null = await Question.findById(req.params.id);
    if (!question) throw new Error("Couldn't find question");

    if (!(req.user?.role === Role.ADMIN_ROLE)) {
        if (req.body.content?.length > 1500) {
            throw new Error("Content must less than 1500 characters");
        }

        if (!req.user._id.equals(question.user._id)) {
            throw new Error("Bad authen");
        }
    }

    question.content = req.body.content;
    const questionUpdated: QuestionDocument = await question.save();
    return questionUpdated._id;
}

async function deleteQuestion(req: Request): Promise<ObjectId> {
    const question: QuestionDocument | null = await Question.findById(req.params.id);
    if (!question) throw new Error("Couldn't find question");

    // admin doesn't need to check user is correct or not
    if (!(req.user?.role === Role.ADMIN_ROLE) && !req.user._id.equals(question.user._id)) {
        throw new Error("Bad authen");
    }

    const questionDeleted: QuestionDocument | null = await Question.findByIdAndDelete(
        req.params.id
    );
    if (!questionDeleted) throw new Error("Couldn't find question");
    return question._id;
}

async function toggleLikeQuestion(req: Request): Promise<ObjectId> {
    const question: QuestionDocument | null = await Question.findById(req.params.id);
    if (!question) throw new Error("Couldn't find question");

    // like if unliked, unlike if liked
    if (question.usersLiked.includes(req.user._id)) {
        question.usersLiked = question.usersLiked.filter((user) => !req.user._id.equals(user));
    } else {
        question.usersLiked.push(req.user._id);
    }

    const questionUpdated: QuestionDocument = await question.save();
    return questionUpdated._id;
}

async function toggleDislikeQuestion(req: Request): Promise<ObjectId> {
    const question: QuestionDocument | null = await Question.findById(req.params.id);
    if (!question) throw new Error("Couldn't find question");

    // dislike if undisliked, undislike if disliked
    if (question.usersDisliked.includes(req.user._id)) {
        question.usersDisliked = question.usersDisliked.filter(
            (user) => !req.user._id.equals(user)
        );
    } else {
        question.usersDisliked.push(req.user._id);
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
    toggleDislikeQuestion,
    getRecentQuestions,
};
