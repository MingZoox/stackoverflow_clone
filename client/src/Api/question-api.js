import axios from "axios";

export const addQuestion = async (title, content, tags) => {
    const payload = new URLSearchParams({
        title,
        content,
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

export const getRecentQuestions = async (userId) => {
    try {
        const { data } = await axios.get(`questions/recent/${userId}`);
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
        const { data } = await axios.delete(`questions/${questionId}`, payload);
        return data;
    } catch (error) {
        error.response.data?.message && alert(error.response.data?.message);
    }
};

export const likeQuestion = async (questionId) => {
    try {
        const { data } = await axios.put(`questions/like/${questionId}`);
        return data;
    } catch (error) {
        error.response.data?.message && alert(error.response.data?.message);
    }
};

export const disLikeQuestion = async (questionId) => {
    try {
        const { data } = await axios.put(`questions/dislike/${questionId}`);
        return data;
    } catch (error) {
        error.response.data?.message && alert(error.response.data?.message);
    }
};

export const updateQuestionAdmin = async (content) => {
    const payload = new URLSearchParams(content);

    try {
        const { data } = await axios.put(`questions/${content._id}`, payload);
        return data;
    } catch (error) {
        error.response.data?.message && alert(error.response.data?.message);
    }
};

export const updateQuestion = async (questionId, content) => {
    const payload = new URLSearchParams({
        content,
    });

    try {
        const { data } = await axios.put(`questions/${questionId}`, payload);
        return data;
    } catch (error) {
        error.response.data?.message && alert(error.response.data?.message);
    }
};
