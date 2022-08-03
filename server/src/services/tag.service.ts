import { Request } from "express";
import Question, { QuestionDocument } from "../models/question.model";

async function getTagsPagination(req: Request): Promise<any> {
    const page: number = parseInt(req.query.page as string, 10);
    const limit: number = parseInt(req.query.limit as string, 10);
    const filter: string = req.query.filter as string;

    const questions: QuestionDocument[] | null = await Question.find().select("-_id tags");
    if (!questions) throw new Error("Query to database got error");

    const tagArray: string[] = [];
    questions.forEach((question) => tagArray.push(...question.tags));

    const tags: any = {};
    tagArray.forEach((tag) => {
        tags[tag] = (tags[tag] || 0) + 1;
    });

    let tagsArray: Array<Array<any>> = Object.keys(tags).map((tag) => [tag, tags[tag]]);

    if (filter) {
        tagsArray = tagsArray.filter((tag) => tag[0].startsWith(filter));
    }

    const totalPages = Math.ceil(tagsArray.length / limit);
    if (page <= 0 || page > totalPages || limit <= 0) throw new Error("Parameters aren't accepted");

    tagsArray = tagsArray.slice((page - 1) * limit, (page - 1) * limit + limit);

    return { tagsArray, totalPages };
}

async function getQuestionsByTag(
    req: Request
): Promise<{ questions: Array<QuestionDocument>; totalPages: number; totalQuestions: number }> {
    const page: number = parseInt(req.query.page as string, 10);
    const limit: number = parseInt(req.query.limit as string, 10);

    const tagRequest: string = req.params.tag;
    if (!tagRequest) throw new Error("Parameter is not accepted");

    const questions: QuestionDocument[] | null = await Question.find({ tags: tagRequest })
        .populate("user", "username avatar")
        .select("title usersLiked usersDisliked tags numAnswers")
        .limit(limit)
        .skip((page - 1) * limit);
    if (!questions) throw new Error("Query to database got error");

    const totalQuestions: number = questions.length;
    if (!totalQuestions) throw new Error("Query to database got error");
    const totalPages = Math.ceil(totalQuestions / limit);

    if (page <= 0 || page > totalPages || limit <= 0) throw new Error("Parameters aren't accepted");

    return { questions, totalPages, totalQuestions };
}

export { getTagsPagination, getQuestionsByTag };
