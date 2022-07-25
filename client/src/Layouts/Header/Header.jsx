import { useNavigate, Link } from "react-router-dom";
import Cookies from "js-cookie";
import React, { useContext } from "react";
import AuthContext from "../../Auth/AuthProvider";
import HeaderNotification from "./HeaderNotification";
import "./Header.scss";

function Header() {
    let navigate = useNavigate();
    const { auth, setAuth } = useContext(AuthContext);

    function handleLoginBtn() {
        navigate("/users/login");
    }

    function handleLogoutBtn() {
        if (window.confirm("Are you sure you want to log out ?")) {
            setAuth({});
            Cookies.remove("Authorization");
            alert("Logout success");
            navigate("/");
        }
    }

    function handleProfileBtn() {
        navigate(`/users/${auth?._id}`);
    }

    return (
        <div className="header">
            <Link to={"/"}>
                <div className="header__logo"></div>
            </Link>

            <div className="header__about">
                <Link to="/questions">Questions</Link>
            </div>
            <div className="header__search">
                <svg fill="#525960" width="18" height="18">
                    <path d="m18 16.5-5.14-5.18h-.35a7 7 0 1 0-1.19 1.19v.35L16.5 18l1.5-1.5ZM12 7A5 5 0 1 1 2 7a5 5 0 0 1 10 0Z" />
                </svg>
                <input type="text" name="search" placeholder="Search..." />
            </div>
            {auth?.username ? (
                <React.Fragment>
                    <div className="header__profile" onClick={handleProfileBtn}>
                        <img src={auth?.avatar}></img>
                    </div>
                    <HeaderNotification notifications={auth?.notifications}/>
                    <div className="header__logout" onClick={handleLogoutBtn}>
                        Logout
                    </div>
                </React.Fragment>
            ) : (
                <React.Fragment>
                    <div className="header__login" onClick={handleLoginBtn}>
                        Log in
                    </div>

                    <div className="header__signup">
                        <a href="/users/signup">Sign up</a>
                    </div>
                </React.Fragment>
            )}
        </div>
    );
}

export default Header;
