import React, { useContext, useState, useEffect } from "react";
import AuthContext from "../../Auth/AuthProvider";
import Sidebar from "../../Layouts/Sidebar/Sidebar";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { getUser, updateProfile } from "../../Api/user-api";
import "./UserProfilePage.scss";

function UserProfilePage() {
    const { idUser } = useParams();
    const { auth } = useContext(AuthContext);
    const [user, setUser] = useState({});
    const [userAvatar, setUserAvatar] = useState("");
    const [userName, setUserName] = useState("");
    const [userAbout, setUserAbout] = useState("");
    const [viewEdit, setViewEdit] = useState(false);

    useEffect(() => {
        getUser(idUser).then((res) => {
            setUser(res);
        });
    }, []);

    function handleSubmit() {
        const profileUploaded = {
            userAvatar: userAvatar,
            userName: userName,
            userAbout: userAbout,
        };
        updateProfile(profileUploaded).then((res) => alert(res));
    }

    return (
        <div className="user-profile-page">
            <Sidebar />
            <div className="user-profile">
                <div className="profile__header">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png"></img>
                    <h1>{user?.name}</h1>
                    {idUser === auth.id && (
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
                            <span>Avatar</span>{" "}
                            <input
                                type="file"
                                value={userAvatar}
                                onChange={(e) => setUserAvatar(e.target.files[0])}></input>
                            <span>Name</span>{" "}
                            <input
                                type="text"
                                value={userName}
                                onChange={(e) => setUserName(e.target.value)}></input>
                            <span>About</span>{" "}
                            <textarea
                                value={userAbout}
                                onChange={(e) => setUserAbout(e.target.value)}
                            />
                            <input type="submit" value="Submit" />
                        </form>
                    </div>
                ) : (
                    <div className="profile__content">
                        <div className="content__reputation">
                            Reputation <span>{user?.reputation}</span>
                        </div>
                        <div className="content__about">
                            About
                            <span>{user?.about}</span>
                        </div>
                        <div className="content__recent-question">
                            Recent Questions
                            <Link to="/questions" className="question">
                                title1
                            </Link>
                            <Link to="/questions" className="question">
                                title2
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default UserProfilePage;
