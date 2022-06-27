import { useState, useContext } from "react";
import { handleLogin } from "../../Helpers/handle-login";
import { useNavigate, useLocation } from "react-router-dom";
import AuthContext from "../../Auth/AuthProvider";
import "./LoginPage.scss";

function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { setAuth } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    function handleChangeEmail(e) {
        setEmail(e.target.value);
    }

    function handleChangePassword(e) {
        setPassword(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        handleLogin(email, password, setAuth, navigate, location);
    }

    return (
        <div className="loginpage">
            <div className="loginpage__logo">
                <svg width="32" height="37">
                    <path d="M26 33v-9h4v13H0V24h4v9h22Z" fill="#BCBBBB" />
                    <path
                        d="m21.5 0-2.7 2 9.9 13.3 2.7-2L21.5 0ZM26 18.4 13.3 7.8l2.1-2.5 12.7 10.6-2.1 2.5ZM9.1 15.2l15 7 1.4-3-15-7-1.4 3Zm14 10.79.68-2.95-16.1-3.35L7 23l16.1 2.99ZM23 30H7v-3h16v3Z"
                        fill="#F48024"
                    />
                </svg>
            </div>
            <div className="loginpage__form">
                <form onSubmit={handleSubmit}>
                    <div className="form__email">Email</div>
                    <input type="text" value={email} onChange={handleChangeEmail} />
                    <div className="form__password">
                        Password
                        <a href="/">Forgot password?</a>
                    </div>
                    <input type="password" value={password} onChange={handleChangePassword} />
                    <input type="submit" value="Log in" />
                </form>
            </div>
            <div className="loginpage__signup">
                Don’t have an account?
                <a href="/users/signup">Sign up</a>
            </div>
        </div>
    );
}

export default LoginPage;
