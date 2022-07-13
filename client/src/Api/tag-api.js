import axios from "axios";

export const getTags = async (page, limit, filter) => {
    try {
        let query = `tags?page=${page}&limit=${limit}`;
        if (filter) {
            query = `tags?page=${page}&limit=${limit}&filter=${filter}`;
        }
        const { data } = await axios.get(query);
        return data;
    } catch (error) {
        error.response.data?.message && alert(error.response.data?.message);
    }
};

export const getQuestionsByTag = async (page, limit, tag) => {
    try {
        const { data } = await axios.get(`tags/${tag}?page=${page}&limit=${limit}`);
        return data;
    } catch (error) {
        error.response.data?.message && alert(error.response.data?.message);
    }
};
