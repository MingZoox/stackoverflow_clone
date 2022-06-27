import userSchema from "./validation-user";
import { signup } from "../Api/user-api";

export const handleRegistration = (
    displayname,
    email,
    password,
    isCaptchaChecked,
    navigate
) => {
    userSchema
        .validate({
            displayname: displayname,
            email: email,
            password: password,
        })
        .then((response) => {
            if (response && isCaptchaChecked) {
                signup(displayname, email, password).then((responseData) => {
                    if (responseData === "OK") {
                        alert("Signup success");
                        navigate("/users/login", { replace: true });
                    } else alert("ERROR: " + responseData);
                });
            } else alert("Captcha required");
        })
        .catch((err) => {
            alert(err.errors);
        });
};
