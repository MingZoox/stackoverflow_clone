import axios from "axios";

export const postQuestion = async (title, content, tags) => {
    const payload = new URLSearchParams({
        title: title,
        content: content,
        tags: tags.split(" "),
    });

    try {
        const { data } = await axios.post("addPost", payload);
        return data;
    } catch (error) {
        console.log(error);
    }
};

export const getPost = async (idQuestion) => {
    try {
        const { data } = await axios.get(`getPost/${idQuestion}`);
        return data;
    } catch (error) {
        console.log(error);
    }
};

export const getAllPosts = async () => {
    try {
        const { data } = await axios.get("getAllPosts");
        return data;
    } catch (error) {
        console.log(error);
    }
};

export const deletePost = async (idQuestion) => {
    const payload = new URLSearchParams({
        _id: idQuestion,
    });

    try {
        const { data } = await axios.delete("deletePost", payload);
        return data;
    } catch (error) {
        console.log(error);
    }
};

export const updatePost = async (post) => {
    const payload = new URLSearchParams(post);

    try {
        const { data } = await axios.put(`updatePost?_id=${post._id}`, payload);
        return data;
    } catch (error) {
        console.log(error);
    }
};
