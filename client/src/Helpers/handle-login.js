import userSchema from "./validation-user";
import { login } from "../Api/user-api";
import { getCurrentUser } from "../Api/user-api";

export const handleLogin = (email, password, setAuth, navigate, location) => {
    const from = location.state?.from?.pathname || "/";

    userSchema
        .validate({
            displayname: "name",
            email: email,
            password: password,
        })
        .then((response) => {
            login(email, password).then((responseData) => {
                if (responseData === "OK") {
                    getCurrentUser().then((currentUser) => {
                        setAuth(currentUser);
                    });
                    navigate(from, { replace: true });
                } else alert("ERROR: Please correct the email and password !");
            });
        })
        .catch((err) => {
            alert(err.errors);
        });
};
