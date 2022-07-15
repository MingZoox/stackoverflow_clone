import { Link } from "react-router-dom";

function User({ userId, username, avatar, reputation }) {
    return (
        <div className="user">
            <img src={avatar} alt=""/>
            <div className="user__info">
                <Link to={`/users/${userId}`} className="user__info-username">
                    {username}
                </Link>
                <p className="user__info-reputation">{reputation}</p>
            </div>
        </div>
    );
}

export default User;
