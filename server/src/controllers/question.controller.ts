import { Request, Response } from "express";
import * as questionServices from "../services/question.service";

const addQuestion = async function (req: Request, res: Response) {
    try {
        const createdQuestionId = await questionServices.addQuestion(req);
        return res.status(200).json(createdQuestionId);
    } catch (error: any) {
        if (error.message) return res.status(400).json({ message: error.message });
        return res.status(500).json(error);
    }
};

const getQuestion = async function (req: Request, res: Response) {
    try {
        const question = await questionServices.getQuestion(req);
        return res.status(200).json(question);
    } catch (error: any) {
        if (error.message) return res.status(400).json({ message: error.message });
        return res.status(500).json(error);
    }
};

const getQuestionsPagination = async function (req: Request, res: Response) {
    try {
        // eslint-disable-next-line operator-linebreak
        const { questions, totalPages, totalQuestions } =
            await questionServices.getQuestionsPagination(req);
        return res.status(200).json({ questions, totalPages, totalQuestions });
    } catch (error: any) {
        if (error.message) return res.status(400).json({ message: error.message });
        return res.status(500).json(error);
    }
};

const getRecentQuestion = async function (req: Request, res: Response) {
    try {
        const question = await questionServices.getRecentQuestions(req);
        return res.status(200).json(question);
    } catch (error: any) {
        if (error.message) return res.status(400).json({ message: error.message });
        return res.status(500).json(error);
    }
};

const updateQuestionContent = async function (req: Request, res: Response) {
    try {
        const questionUpdatedId = await questionServices.updateQuestionContent(req);
        return res.status(200).json(questionUpdatedId);
    } catch (error: any) {
        if (error.message) return res.status(400).json({ message: error.message });
        return res.status(500).json(error);
    }
};

const deleteQuestion = async function (req: Request, res: Response) {
    try {
        const questionDeletedId = await questionServices.deleteQuestion(req);
        return res.status(200).json(questionDeletedId);
    } catch (error: any) {
        if (error.message) return res.status(400).json({ message: error.message });
        return res.status(500).json(error);
    }
};

const toggleLikeQuestion = async function (req: Request, res: Response) {
    try {
        const questionId = await questionServices.toggleLikeQuestion(req);
        return res.status(200).json(questionId);
    } catch (error: any) {
        if (error.message) return res.status(400).json({ message: error.message });
        return res.status(500).json(error);
    }
};

const toggleDislikeQuestion = async function (req: Request, res: Response) {
    try {
        const questionId = await questionServices.toggleDislikeQuestion(req);
        return res.status(200).json(questionId);
    } catch (error: any) {
        if (error.message) return res.status(400).json({ message: error.message });
        return res.status(500).json(error);
    }
};

export {
    addQuestion,
    getQuestion,
    getQuestionsPagination,
    getRecentQuestion,
    updateQuestionContent,
    deleteQuestion,
    toggleLikeQuestion,
    toggleDislikeQuestion,
};
