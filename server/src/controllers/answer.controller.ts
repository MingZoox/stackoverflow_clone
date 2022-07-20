import { Request, Response } from "express";
import * as answerServices from "../services/answer.service";

const addAnswer = async function (req: Request, res: Response) {
    try {
        const createdAnswerId = await answerServices.addAnswer(req);
        return res.status(200).json(createdAnswerId);
    } catch (error: any) {
        if (error.message) return res.status(400).json({ message: error.message });
        return res.status(500).json(error);
    }
};

const toggleLikeAnswer = async function (req: Request, res: Response) {
    try {
        const answerId = await answerServices.toggleLikeAnswer(req);
        return res.status(200).json(answerId);
    } catch (error: any) {
        if (error.message) return res.status(400).json({ message: error.message });
        return res.status(500).json(error);
    }
};

const toggleDislikeAnswer = async function (req: Request, res: Response) {
    try {
        const answerId = await answerServices.toggleDislikeAnswer(req);
        return res.status(200).json(answerId);
    } catch (error: any) {
        if (error.message) return res.status(400).json({ message: error.message });
        return res.status(500).json(error);
    }
};

const updateAnswer = async function (req: Request, res: Response) {
    try {
        const createdAnswerId = await answerServices.updateAnswer(req);
        return res.status(200).json(createdAnswerId);
    } catch (error: any) {
        if (error.message) return res.status(400).json({ message: error.message });
        return res.status(500).json(error);
    }
};

const deleteAnswer = async function (req: Request, res: Response) {
    try {
        const createdAnswerId = await answerServices.deleteAnswer(req);
        return res.status(200).json(createdAnswerId);
    } catch (error: any) {
        if (error.message) return res.status(400).json({ message: error.message });
        return res.status(500).json(error);
    }
};

export { addAnswer, toggleLikeAnswer, toggleDislikeAnswer, updateAnswer, deleteAnswer };
