import { Request, Response } from "express";
import * as tagServices from "../services/tag.service";

const getTags = async function (req: Request, res: Response) {
    try {
        const tags = await tagServices.getTagsPagination(req);
        return res.status(200).json(tags);
    } catch (error: any) {
        if (error.message) return res.status(400).json({ message: error.message });
        return res.status(500).json(error);
    }
};

const getQuestionsByTag = async function (req: Request, res: Response) {
    try {
        const { questions, totalPages, totalQuestions } = await tagServices.getQuestionsByTag(req);
        return res.status(200).json({ questions, totalPages, totalQuestions });
    } catch (error: any) {
        if (error.message) return res.status(400).json({ message: error.message });
        return res.status(500).json(error);
    }
};

// eslint-disable-next-line import/prefer-default-export
export { getTags, getQuestionsByTag };
