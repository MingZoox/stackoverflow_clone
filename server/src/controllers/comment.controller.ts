import { Request, Response } from "express";
import * as commentServices from "../services/comment.service";

const addComment = async function (req: Request, res: Response) {
    try {
        const createdCommentId = await commentServices.addComment(req);
        return res.status(200).json(createdCommentId);
    } catch (error: any) {
        if (error.message) return res.status(400).json({ message: error.message });
        return res.status(500).json(error);
    }
};

const updateComment = async function (req: Request, res: Response) {
    try {
        const createdCommentId = await commentServices.updateComment(req);
        return res.status(200).json(createdCommentId);
    } catch (error: any) {
        if (error.message) return res.status(400).json({ message: error.message });
        return res.status(500).json(error);
    }
};

const deleteComment = async function (req: Request, res: Response) {
    try {
        const createdCommentId = await commentServices.deleteComment(req);
        return res.status(200).json(createdCommentId);
    } catch (error: any) {
        if (error.message) return res.status(400).json({ message: error.message });
        return res.status(500).json(error);
    }
};

// eslint-disable-next-line import/prefer-default-export
export { addComment, updateComment, deleteComment };
