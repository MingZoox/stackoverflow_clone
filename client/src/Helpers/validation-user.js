import * as yup from "yup";

let userSchema = yup.object().shape({
    displayname: yup.string().required("Display name required"),
    email: yup.string().required("Email required").email("Email invalid"),
    password: yup
        .string()
        .required("Password required")
        .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, "Password invalid"),
});

export default userSchema;
