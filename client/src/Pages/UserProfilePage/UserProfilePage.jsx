import React, { useContext, useState, useEffect } from "react";
import AuthContext from "../../Auth/AuthProvider";
import Sidebar from "../../Layouts/Sidebar/Sidebar";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { getUser, updateProfile } from "../../Api/user-api";
import { getRecentQuestions } from "../../Api/question-api";
import "./UserProfilePage.scss";

function UserProfilePage() {
    const { userId } = useParams();
    const { auth } = useContext(AuthContext);
    const [user, setUser] = useState({});
    const [avatar, setAvatar] = useState(null);
    const [recentQuestions, setRecentQuestions] = useState([]);
    const [viewEdit, setViewEdit] = useState(false);

    useEffect(() => {
        getUser(userId).then((res) => {
            setUser(res);
        });
        getRecentQuestions(userId).then((res) => {
            setRecentQuestions(res);
        });
    }, []);

    function handleSubmit(e) {
        e.preventDefault();
        if (window.confirm("Are you sure you want to update your profile ?")) {
            // check if password valid or not
            if (user.password && !/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(user.password)) {
                alert("Password invalid");
            } else {
                updateProfile(user, avatar).then((response) => {
                    if (response) {
                        alert("Update success !!");
                    }
                });
            }
        }
    }

    return (
        <div className="user-profile-page">
            <Sidebar />
            <div className="user-profile">
                <div className="profile__header">
                    <img src={user?.avatar}></img>
                    <h1>{user?.username}</h1>
                    {userId === auth?._id && (
                        <div
                            className="edit-profile-btn"
                            onClick={() => {
                                setViewEdit(!viewEdit);
                            }}>
                            {viewEdit ? "Back" : "Edit profile"}
                        </div>
                    )}
                </div>

                {viewEdit ? (
                    <div className="profile__edit">
                        <form onSubmit={handleSubmit}>
                            <span>Avatar</span>
                            <input
                                type="file"
                                onChange={(event) => {
                                    setAvatar(event.target.files[0]);
                                }}></input>
                            <span>Name</span>
                            <input
                                type="text"
                                value={user.username}
                                onChange={(e) =>
                                    setUser({ ...user, username: e.target.value })
                                }></input>

                            <span>Password</span>
                            <input
                                type="password"
                                onChange={(e) =>
                                    setUser({ ...user, password: e.target.value })
                                }></input>
                            <span>About</span>
                            <textarea
                                value={user.about}
                                onChange={(e) => setUser({ ...user, about: e.target.value })}
                            />
                            <input type="submit" value="Submit" />
                        </form>
                    </div>
                ) : (
                    <div className="profile__content">
                        <div className="content__reputation">
                            Reputation: <span>{user?.reputation}</span>
                        </div>
                        <div className="content__reputation">
                            Email: <span>{user?.email}</span>
                        </div>
                        <div className="content__about">
                            About
                            <span>{user?.about}</span>
                        </div>
                        <div className="content__recent-question">
                            Recent Questions
                            {recentQuestions.map((question) => (
                                <Link
                                    to={`/questions/${question._id}`}
                                    key={question._id}
                                    className="question">
                                    {question.title}
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default UserProfilePage;
