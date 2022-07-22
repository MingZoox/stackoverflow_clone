import { useState, useEffect, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import MDEditor from "@uiw/react-md-editor";
import Sidebar from "../../Layouts/Sidebar/Sidebar";
import Answer from "./Answer";
import "./QuestionPage.scss";
import AuthContext from "../../Auth/AuthProvider";
import {
    getQuestion,
    likeQuestion,
    disLikeQuestion,
    updateQuestion,
    deleteQuestion,
} from "../../Api/question-api";
import { addAnswer } from "../../Api/answer-api";
import { addComment, updateComment, deleteComment } from "../../Api/comment-api";

function QuestionPage() {
    const { questionId } = useParams();
    let navigate = useNavigate();

    const { auth } = useContext(AuthContext);
    const [question, setQuestion] = useState({});
    const [isEditCommentEnable, setIsEditComentEnable] = useState(false);
    const [isEditQuestionEnable, setIsEditQuestionEnable] = useState(false);
    const [commentEditing, setCommentEditing] = useState("");
    const [commentIdEditing, setCommentIdEditing] = useState(null);
    const [questionEditing, setQuestionEditing] = useState("");
    const [postAnswer, setPostAnswer] = useState("");

    useEffect(() => {
        getQuestion(questionId).then((res) => {
            setQuestion(res);
        });
    }, []);

    function handlePostAnswer() {
        if (window.confirm("Are you sure you want to post your answer ?")) {
            addAnswer(questionId, postAnswer).then((res) => {
                if (res) {
                    alert("Post answer success !!");
                }
                navigate(0);
            });
        }
    }

    function handleDeleteQuestion() {
        if (window.confirm("Are you sure you want to delete your question ?")) {
            deleteQuestion(questionId).then((res) => {
                if (res) {
                    alert("Question deleted !!");
                    navigate(0);
                }
            });
            navigate("/questions");
        }
    }

    function handleEditQuestion() {
        if (window.confirm("Are you sure you want to edit your question ?")) {
            updateQuestion(questionId, questionEditing).then((res) => {
                if (res) {
                    alert("Edit question success !!");
                    navigate(0);
                }
            });
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

    function handleSumbitComment() {
        if (window.confirm("Are you sure you want to post your comment ?")) {
            if (!commentIdEditing) {
                addComment(questionId, "question", commentEditing).then((res) => {
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

    function handleEnableEditComment(value, id) {
        setCommentIdEditing(id);
        setIsEditComentEnable(!isEditCommentEnable);
        setCommentEditing(value);
    }

    function handleEnableEditQuestion(value) {
        setIsEditQuestionEnable(!isEditQuestionEnable);
        setQuestionEditing(value);
    }

    return (
        <div className="question-page">
            <Sidebar />
            <div className="question-page__content">
                <div className="question-page__header">
                    <div className="question-page__title">{question.title}</div>
                    <div className="ask-question-btn">
                        <Link to="/questions/ask">Ask Question</Link>
                    </div>
                    <div className="question-page__created-at">
                        Asked {question.createdAt?.slice(0, 10)}
                    </div>
                </div>

                <div className="question-page__main-content" data-color-mode="light">
                    <div className="question-vote">
                        <svg
                            fill={question.hasCurrentUserLiked ? "orange" : "#525960"}
                            width="36"
                            height="36"
                            onClick={() => {
                                likeQuestion(questionId).then((res) => res && navigate(0));
                            }}>
                            <path d="M2 25h32L18 9 2 25Z" />
                        </svg>
                        {question.likes}
                        <svg
                            fill={question.hasCurrentUserDisliked ? "orange" : "#525960"}
                            width="36"
                            height="36"
                            onClick={() => {
                                disLikeQuestion(questionId).then((res) => res && navigate(0));
                            }}>
                            <path d="M2 11h32L18 27 2 11Z" />
                        </svg>
                    </div>
                    <div className="question-page__question">
                        <MDEditor.Markdown source={question.content} />
                        <div className="question-page__question-footer">
                            {question.user?._id === auth?._id && (
                                <div className="question--edit">
                                    <span
                                        onClick={() => handleEnableEditQuestion(question.content)}>
                                        Edit
                                    </span>
                                    <div
                                        className="question--delete"
                                        onClick={handleDeleteQuestion}>
                                        Delete
                                    </div>
                                </div>
                            )}

                            <div className="question__user">
                                <div className="question__user__asked">
                                    Asked {question.createdAt?.slice(0, 10)}
                                </div>
                                <div className="question__user__avatar">
                                    <img src={question.user?.avatar} alt="" />
                                </div>
                                <div className="question__user__username">
                                    <Link to={`/users/${question.user?._id}`}>
                                        {question.user?.username}
                                    </Link>
                                </div>
                                <div className="question__user__reputation">
                                    {question.user?.reputation}
                                </div>
                            </div>
                        </div>

                        {isEditQuestionEnable && (
                            <div className="answer__post" data-color-mode="light">
                                Edit
                                <MDEditor value={questionEditing} onChange={setQuestionEditing} />
                                <span className="post-answer-btn" onClick={handleEditQuestion}>
                                    Submit Edit
                                </span>
                            </div>
                        )}

                        <div className="comments__content">
                            {question.comments?.map((comment) => (
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
                                                    handleEnableEditComment(
                                                        comment.content,
                                                        comment._id
                                                    )
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

                    <div className="right-sidebar"></div>
                </div>

                <div className="answers">
                    <div className="total-answers">{question.answers?.length} Answers</div>

                    {question.answers?.map((answer) => (
                        <Answer
                            key={answer._id}
                            answerId={answer._id}
                            auth={auth}
                            comments={answer.comments}
                            content={answer.content}
                            createdAt={answer.createdAt}
                            hasCurrentUserLiked={answer.hasCurrentUserLiked}
                            hasCurrentUserDisliked={answer.hasCurrentUserDisliked}
                            likes={answer.likes}
                            user={answer.user}
                        />
                    ))}
                </div>

                <div className="answer__post" data-color-mode="light">
                    Your Answer
                    <MDEditor value={postAnswer} onChange={setPostAnswer} height="300" />
                    <span className="post-answer-btn" onClick={handlePostAnswer}>
                        Post Your Answer
                    </span>
                </div>
            </div>
        </div>
    );
}

export default QuestionPage;
