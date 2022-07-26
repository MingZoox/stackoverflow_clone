import userSchema from "./validation-user";
import { login, getCurrentUser } from "../Api/user-api";

export const handleLogin = (email, password, setAuth, navigate, location) => {
    const from = location.state?.from?.pathname || "/";

    userSchema
        .validate({
            displayname: "name",
            email: email,
            password: password,
        })
        .then((response) => {
            login(email, password).then((res) => {
                if (res) {
                    getCurrentUser().then((currentUser) => {
                        setAuth(currentUser);
                    });
                    navigate(from, { replace: true });
                }
            });
        })
        .catch((err) => {
            alert(err.errors);
        });
};
