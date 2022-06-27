import { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import { handleRegistration } from "../../Helpers/handle-registration";
import "./SignupPage.scss";

function SignupPage() {
    const [displayname, setDisplayname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isCaptchaChecked, setIsCaptchaChecked] = useState(false);

    const navigate = useNavigate();

    function handleChangeDisplayname(e) {
        setDisplayname(e.target.value);
    }

    function handleChangeEmail(e) {
        setEmail(e.target.value);
    }

    function handleChangePassword(e) {
        setPassword(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        handleRegistration(displayname, email, password, isCaptchaChecked, navigate);
    }

    function onChangeCaptcha(value) {
        value && setIsCaptchaChecked(true);
    }

    return (
        <div className="signup-page">
            <div className="signup__introduction">
                <div className="heading">Join the Stack Overflow community</div>
                <div className="introduction">
                    <svg width="26" height="26" fill="hsl(206,100%,52%)">
                        <path d="M1 7c0-1.1.9-2 2-2h18a2 2 0 012 2v12a2 2 0 01-2 2h-2v5l-5-5H3a2 2 0 01-2-2V7zm10.6 11.3c.7 0 1.2-.5 1.2-1.2s-.5-1.2-1.2-1.2c-.6 0-1.2.4-1.2 1.2 0 .7.5 1.1 1.2 1.2zm2.2-5.4l1-.9c.3-.4.4-.9.4-1.4 0-1-.3-1.7-1-2.2-.6-.5-1.4-.7-2.4-.7-.8 0-1.4.2-2 .5-.7.5-1 1.4-1 2.8h1.9v-.1c0-.4 0-.7.2-1 .2-.4.5-.6 1-.6s.8.1 1 .4a1.3 1.3 0 010 1.8l-.4.3-1.4 1.3c-.3.4-.4 1-.4 1.6 0 0 0 .2.2.2h1.5c.2 0 .2-.1.2-.2l.1-.7.5-.7.6-.4z" />
                    </svg>
                    Get unstuck — ask a question
                </div>
                <div className="introduction">
                    <svg width="26" height="26" fill="hsl(206,100%,52%)">
                        <path d="M12 .7a2 2 0 013 0l8.5 9.6a1 1 0 01-.7 1.7H4.2a1 1 0 01-.7-1.7L12 .7z" />
                        <path d="M20.6 16H6.4l7.1 8 7-8zM15 25.3a2 2 0 01-3 0l-8.5-9.6a1 1 0 01.7-1.7h18.6a1 1 0 01.7 1.7L15 25.3z" />
                    </svg>
                    Unlock new privileges like voting and commenting
                </div>
                <div className="introduction">
                    <svg width="26" height="26" fill="hsl(206,100%,52%)">
                        <path d="M14.8 3a2 2 0 00-1.4.6l-10 10a2 2 0 000 2.8l8.2 8.2c.8.8 2 .8 2.8 0l10-10c.4-.4.6-.9.6-1.4V5a2 2 0 00-2-2h-8.2zm5.2 7a2 2 0 110-4 2 2 0 010 4z" />
                    </svg>
                    Save your favorite tags, filters, and jobs
                </div>
                <div className="introduction">
                    <svg width="26" height="26" fill="hsl(206,100%,52%)">
                        <path d="M21 4V2H5v2H1v5c0 2 2 4 4 4v1c0 2.5 3 4 7 4v3H7s-1.2 2.3-1.2 3h14.4c0-.6-1.2-3-1.2-3h-5v-3c4 0 7-1.5 7-4v-1c2 0 4-2 4-4V4h-4zM5 11c-1 0-2-1-2-2V6h2v5zm11.5 2.7l-3.5-2-3.5 1.9L11 9.8 7.2 7.5h4.4L13 3.8l1.4 3.7h4L15.3 10l1.4 3.7h-.1zM23 9c0 1-1 2-2 2V6h2v3z" />
                    </svg>
                    Earn reputation and badges
                </div>
            </div>

            <div className="signup__form">
                <form onSubmit={handleSubmit}>
                    <div className="form__displayname">Display name</div>
                    <input
                        type="text"
                        value={displayname}
                        onChange={handleChangeDisplayname}
                    />
                    <div className="form__email">Email</div>
                    <input
                        type="text"
                        value={email}
                        onChange={handleChangeEmail}
                    />
                    <div className="form__password">Password</div>
                    <input
                        type="password"
                        value={password}
                        onChange={handleChangePassword}
                    />
                    <div className="password__validation">
                        Passwords must contain at least eight characters,
                        including at least 1 letter and 1 number.
                    </div>

                    <ReCAPTCHA
                        sitekey="6Lde5IwfAAAAANX9wVG0i9-OOikPTRbNSfG8iI4Z"
                        onChange={onChangeCaptcha}
                    />

                    <input
                        type="submit"
                        value="Sign up"
                        className="input-submit"
                    />
                    <div className="signup__policy">
                        By clicking “Sign up”, you agree to our{" "}
                        <span>terms of service</span>,{" "}
                        <span>privacy policy</span> and{" "}
                        <span>cookie policy</span>
                    </div>
                </form>
                <div className="signup__login">
                    Already have an account?
                    <Link to="/users/login">Log in</Link>
                </div>
            </div>
        </div>
    );
}

export default SignupPage;
