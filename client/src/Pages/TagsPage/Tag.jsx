import { Link } from "react-router-dom";

function Tag({ tagName, numQuestion }) {
    return (
        <div className="tag">
            <div className="tag__title">
                <Link to={`/tags/${tagName}`}>{tagName}</Link>
            </div>
            <div className="tag__num-questions">{numQuestion} questions</div>
        </div>
    );
}

export default Tag;
