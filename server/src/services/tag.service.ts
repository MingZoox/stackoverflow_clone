import { Request } from "express";
import Question, { QuestionDocument } from "../models/question.model";

// eslint-disable-next-line no-unused-vars
async function getAllTagsAndCount(req: Request): Promise<any> {
    const questions: QuestionDocument[] | null = await Question.find().select("-_id tags");
    if (!questions) throw new Error("Query to database got error");

    const tagArray: string[] = [];
    questions.forEach((question) => tagArray.push(...question.tags));

    const tags: any = {};
    tagArray.forEach((tag) => {
        tags[tag] = (tags[tag] || 0) + 1;
    });

    return tags;
}

async function getQuestionsByTag(req: Request): Promise<QuestionDocument[]> {
    const tagRequest = req.params.tag;
    if (!tagRequest) throw new Error("Parameter is not accepted");

    const questions: QuestionDocument[] | null = await Question.find({ tags: tagRequest })
        .populate("user", "username avatar")
        .select("title");
    if (!questions) throw new Error("Query to database got error");

    return questions;
}

// eslint-disable-next-line import/prefer-default-export
export { getAllTagsAndCount, getQuestionsByTag };
