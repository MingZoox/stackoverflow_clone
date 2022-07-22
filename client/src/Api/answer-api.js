import axios from "axios";

export const addAnswer = async (questionId, content) => {
    const payload = new URLSearchParams({
        content,
    });

    try {
        const { data } = await axios.post(`answers/${questionId}`, payload);
        return data;
    } catch (error) {
        error.response.data?.message && alert(error.response.data?.message);
    }
};

export const likeAnswer = async (answerId) => {
    try {
        const { data } = await axios.put(`answers/like/${answerId}`);
        return data;
    } catch (error) {
        error.response.data?.message && alert(error.response.data?.message);
    }
};

export const disLikeAnswer = async (answerId) => {
    try {
        const { data } = await axios.put(`answers/dislike/${answerId}`);
        return data;
    } catch (error) {
        error.response.data?.message && alert(error.response.data?.message);
    }
};

export const updateAnswer = async (answerId, content) => {
    const payload = new URLSearchParams({
        content,
    });

    try {
        const { data } = await axios.put(`answers/${answerId}`, payload);
        return data;
    } catch (error) {
        error.response.data?.message && alert(error.response.data?.message);
    }
};

export const deleteAnswer = async (answerId) => {
    try {
        const { data } = await axios.delete(`answers/${answerId}`);
        return data;
    } catch (error) {
        error.response.data?.message && alert(error.response.data?.message);
    }
};
