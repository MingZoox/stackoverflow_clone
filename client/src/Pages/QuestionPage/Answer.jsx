import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import MDEditor from "@uiw/react-md-editor";
import { likeAnswer, disLikeAnswer, updateAnswer, deleteAnswer } from "../../Api/answer-api";
import { addComment, updateComment, deleteComment } from "../../Api/comment-api";

function Answer({
    answerId,
    comments,
    content,
    auth,
    createdAt,
    hasCurrentUserLiked,
    hasCurrentUserDisliked,
    likes,
    user,
}) {
    let navigate = useNavigate();

    const [answerEditing, setAnswerEditing] = useState("");
    const [isEditAnswerEnable, setIsEditAnswerEnable] = useState(false);
    const [commentEditing, setCommentEditing] = useState("");
    const [isEditCommentEnable, setIsEditComentEnable] = useState(false);
    const [commentIdEditing, setCommentIdEditing] = useState(null);

    function handleEnableEditAnswer(value) {
        setIsEditAnswerEnable(!isEditAnswerEnable);
        setAnswerEditing(value);
    }

    function handleEnableEditComment(value, id) {
        setCommentIdEditing(id);
        setIsEditComentEnable(!isEditCommentEnable);
        setCommentEditing(value);
    }

    function handleSumbitComment() {
        if (window.confirm("Are you sure you want to post your comment ?")) {
            if (!commentIdEditing) {
                addComment(answerId, "answer", commentEditing).then((res) => {
                    if (res) {
                        alert("Post comment success !!");
                        navigate(0);
                    }
                });
            } else {
                updateComment(commentIdEditing, commentEditing).then((res) => {
                    if (res) {
                        alert("Edit comment success !!");
                        navigate(0);
                    }
                });
            }
        }
    }

    function handleDeleteComment(commentId) {
        if (window.confirm("Are you sure you want to delete your comment ?")) {
            deleteComment(commentId).then((res) => {
                if (res) {
                    alert("Comment deleted !!");
                    navigate(0);
                }
            });
        }
    }

    function handleDeleteAnswer(answerId) {
        if (window.confirm("Are you sure you want to delete your answer ?")) {
            deleteAnswer(answerId).then((res) => {
                if (res) {
                    alert("Answer deleted !!");
                    navigate(0);
                }
            });
        }
    }

    function handleEditAnswer() {
        if (window.confirm("Are you sure you want to edit your answer ?")) {
            updateAnswer(answerId, answerEditing).then((res) => {
                if (res) {
                    alert("Edit answer success !!");
                    navigate(0);
                }
            });
        }
    }

    return (
        <div className="question-page__main-content" data-color-mode="light">
            <div className="question-vote">
                <svg
                    fill={hasCurrentUserLiked ? "orange" : "#525960"}
                    width="36"
                    height="36"
                    onClick={() => {
                        likeAnswer(answerId).then((res) => res && navigate(0));
                    }}>
                    <path d="M2 25h32L18 9 2 25Z" />
                </svg>
                {likes}
                <svg
                    fill={hasCurrentUserDisliked ? "orange" : "#525960"}
                    width="36"
                    height="36"
                    onClick={() => {
                        disLikeAnswer(answerId).then((res) => res && navigate(0));
                    }}>
                    <path d="M2 11h32L18 27 2 11Z" />
                </svg>
            </div>
            <div className="question-page__question">
                <MDEditor.Markdown source={content} />
                <div className="question-page__question-footer">
                    {user?._id === auth?._id && (
                        <div className="question--edit">
                            <span onClick={() => handleEnableEditAnswer(content)}>Edit</span>
                            <div
                                className="question--delete"
                                onClick={() => handleDeleteAnswer(answerId)}>
                                Delete
                            </div>
                        </div>
                    )}
                    <div className="question__user">
                        <div className="question__user__asked">
                            Answered {createdAt?.slice(0, 10)}
                        </div>
                        <div className="question__user__avatar">
                            <img src={user?.avatar} alt="" />
                        </div>
                        <div className="question__user__username">
                            <Link to={`/users/${user?._id}`}>{user?.username}</Link>
                        </div>
                        <div className="question__user__reputation">{user?.reputation}</div>
                    </div>
                </div>

                {isEditAnswerEnable && (
                    <div className="answer__post" data-color-mode="light">
                        Edit Answer
                        <MDEditor value={answerEditing} onChange={setAnswerEditing} />
                        <span className="post-answer-btn" onClick={handleEditAnswer}>
                            Submit Edit
                        </span>
                    </div>
                )}

                <div className="comments__content">
                    {comments?.map((comment) => (
                        <div className="comment" key={comment._id}>
                            <div className="comment__content">
                                {comment.content} -{" "}
                                <Link to={`/users/${comment.user._id}`}>
                                    {comment.user.username}
                                </Link>
                            </div>
                            {comment.user._id === auth?._id && (
                                <div className="comment--edit">
                                    <span
                                        onClick={() =>
                                            handleEnableEditComment(comment.content, comment._id)
                                        }>
                                        Edit
                                    </span>
                                    <span onClick={() => handleDeleteComment(comment._id)}>
                                        Delete
                                    </span>
                                </div>
                            )}
                        </div>
                    ))}

                    <div
                        className="comment--add"
                        onClick={() => {
                            handleEnableEditComment("", undefined);
                        }}>
                        Add a comment
                    </div>

                    {isEditCommentEnable && (
                        <div className="input-comment">
                            <textarea
                                value={commentEditing}
                                onChange={(e) => {
                                    setCommentEditing(e.target.value);
                                }}></textarea>
                            <div className="submit-comment">
                                <span onClick={handleSumbitComment}>Submit</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Answer;
