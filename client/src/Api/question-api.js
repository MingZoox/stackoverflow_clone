import axios from "axios";

export const addQuestion = async (title, content, tags) => {
    const payload = new URLSearchParams({
        title: title,
        content: content,
        tags: tags.split(" "),
    });

    try {
        const { data } = await axios.post("questions", payload);
        return data;
    } catch (error) {
        error.response.data?.message && alert(error.response.data?.message);
    }
};

export const getQuestion = async (questionId) => {
    try {
        const { data } = await axios.get(`questions/${questionId}`);
        return data;
    } catch (error) {
        error.response.data?.message && alert(error.response.data?.message);
    }
};

export const getQuestions = async (page, limit, order) => {
    try {
        const { data } = await axios.get(`questions?page=${page}&limit=${limit}&order=${order}`);
        return data;
    } catch (error) {
        error.response.data?.message && alert(error.response.data?.message);
    }
};

export const deleteQuestion = async (questionId) => {
    const payload = new URLSearchParams({
        _id: questionId,
    });

    try {
        const { data } = await axios.delete("questions", payload);
        return data;
    } catch (error) {
        error.response.data?.message && alert(error.response.data?.message);
    }
};

export const voteQuestion = async (questionId) => {
    try {
        const { data } = await axios.put(`questions/like/${questionId}`);
        return data;
    } catch (error) {
        error.response.data?.message && alert(error.response.data?.message);
    }
};

export const updateQuestion = async (question) => {
    const payload = new URLSearchParams(question);

    try {
        const { data } = await axios.put(`questions?_id=${question._id}`, payload);
        return data;
    } catch (error) {
        error.response.data?.message && alert(error.response.data?.message);
    }
};
