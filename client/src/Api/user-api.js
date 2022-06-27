import axios from "axios";

export const login = async (email, password) => {
    const payload = new URLSearchParams({
        email: email,
        password: password,
    });

    try {
        const { data } = await axios.post("login", payload);
        return data;
    } catch (error) {
        console.log(error);
    }
};

export const signup = async (displayname, email, password) => {
    const payload = new URLSearchParams({
        username: displayname,
        email: email,
        password: password,
    });

    try {
        const { data } = await axios.post("register", payload);
        return data;
    } catch (error) {
        console.log(error);
    }
};

export const getAllUsers = async () => {
    try {
        const { data } = await axios.get("getAllUsers");
        return data;
    } catch (error) {
        console.log(error);
    }
};

export const getUser = async (idUser) => {
    try {
        return { name: "NameUser", reputation: 123, about: "About me !" };
    } catch (error) {
        console.log(error);
    }
};

export const updateProfile = async (profileUploaded) => {
    const payload = new URLSearchParams({
        ...profileUploaded,
        file: profileUploaded.userAvatar,
    });

    try {
        return "OK";
    } catch (error) {
        console.log(error);
    }
};

export const getCurrentUser = async () => {
    try {
        const { data } = await axios.get("currentUser");
        return data;
    } catch (error) {
        console.log(error);
    }
};
