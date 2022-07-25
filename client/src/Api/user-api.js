import axios from "axios";

export const login = async (email, password) => {
    const payload = new URLSearchParams({
        email: email,
        password: password,
    });

    try {
        const { data } = await axios.post("users/login", payload);
        return data;
    } catch (error) {
        error.response.data?.message && alert(error.response.data?.message);
    }
};

export const signup = async (displayname, email, password) => {
    const payload = new URLSearchParams({
        username: displayname,
        email: email,
        password: password,
    });

    try {
        const { data } = await axios.post("users/register", payload);
        return data;
    } catch (error) {
        error.response.data?.message && alert(error.response.data?.message);
    }
};

export const getUser = async (idUser) => {
    try {
        const { data } = await axios.get(`users/${idUser}`);
        return data;
    } catch (error) {
        error.response.data?.message && alert(error.response.data?.message);
    }
};

export const getUsers = async (page, limit, filter) => {
    try {
        let query = `users?page=${page}&limit=${limit}`;
        if (filter) {
            query = `users?page=${page}&limit=${limit}&filter=${filter}`;
        }
        const { data } = await axios.get(query);
        return data;
    } catch (error) {
        error.response.data?.message && alert(error.response.data?.message);
    }
};

export const addUser = async (userInfo) => {
    console.log(userInfo);
    const payload = new URLSearchParams(userInfo);

    try {
        const { data } = await axios.post("admin/users", payload);
        return data;
    } catch (error) {
        error.response.data?.message && alert(error.response.data?.message);
    }
};

export const updateProfile = async (profileUploaded, avatar) => {
    const payload = new URLSearchParams(profileUploaded);

    try {
        if (avatar) {
            let data = new FormData();
            data.append("file", avatar);
            await axios.put(`users/avatar`, data);
        }
        const { data } = await axios.put(`users/${profileUploaded._id || "empty"}`, payload);
        return data;
    } catch (error) {
        if (error.response.status === 413) alert("Image too large !!");
        error.response.data?.message && alert(error.response.data?.message);
    }
};

export const deleteUser = async (idUser) => {
    try {
        const { data } = await axios.delete(`users/${idUser}`);
        return data;
    } catch (error) {
        error.response.data?.message && alert(error.response.data?.message);
    }
};

export const getCurrentUser = async () => {
    try {
        const { data } = await axios.get("users/me");
        return data;
    } catch (error) {
        error.response.data?.message && alert(error.response.data?.message);
    }
};

export const sendForgotPasswordMail = async (forgotEmail) => {
    const payload = new URLSearchParams({
        email: forgotEmail,
    });

    try {
        const { data } = await axios.post("users/forget", payload);
        return data;
    } catch (error) {
        error.response.data?.message && alert(error.response.data?.message);
    }
};
