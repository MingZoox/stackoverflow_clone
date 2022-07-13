import { Link } from "react-router-dom";

function Question({ questionId, votes, title, tags, user }) {
    return (
        <div className="question">
            <div className="question-votes">{votes} votes</div>
            <div className="question-content">
                <Link className="question-content__title" to={`/questions/${questionId}`}>
                    {title}
                </Link>

                <div className="question-content__tag-user">
                    <div className="question-content__tag">
                        {tags.map((tag, index) => (
                            <Link key={index} to={`/tags/${tag}`}>
                                {tag}
                            </Link>
                        ))}
                    </div>
                    <div className="question-content__user">
                        <img src={user?.avatar}></img>
                        <Link className="username" to={`/users/${user?._id}`}>
                            {user?.username}
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Question;
