import axios from "axios";

export const addComment = async (ownerId, ownerType, content) => {
    let payload = null;
    if (ownerType === "question") {
        payload = new URLSearchParams({
            content,
            questionId: ownerId,
        });
    } else if (ownerType === "answer") {
        payload = new URLSearchParams({
            content,
            answerId: ownerId,
        });
    }

    try {
        const { data } = await axios.post("comments", payload);
        return data;
    } catch (error) {
        error.response.data?.message && alert(error.response.data?.message);
    }
};

export const updateComment = async (commentId, content) => {
    const payload = new URLSearchParams({
        content,
    });

    try {
        const { data } = await axios.put(`comments/${commentId}`, payload);
        return data;
    } catch (error) {
        error.response.data?.message && alert(error.response.data?.message);
    }
};

export const deleteComment = async (commentId) => {
    try {
        const { data } = await axios.delete(`comments/${commentId}`);
        return data;
    } catch (error) {
        error.response.data?.message && alert(error.response.data?.message);
    }
};
