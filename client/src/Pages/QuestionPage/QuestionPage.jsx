import { Link, useNavigate, useParams } from "react-router-dom";
import Sidebar from "../../Layouts/Sidebar/Sidebar";
import Answer from "./Answer";
import "./QuestionPage.scss";
import MDEditor from "@uiw/react-md-editor";
import { useState, useEffect } from "react";

function QuestionPage() {
    const { idQuestion } = useParams();
    let navigate = useNavigate();

    const [answers, setAnswers] = useState([]);
    const [question, setQuestion] = useState('`console.log("Hello")` \n xin chao');
    const [isEditCommentEnable, setIsEditComentEnable] = useState(false);
    const [commentEditing, setCommentEditing] = useState("");
    const [postAnswer, setPostAnswer] = useState("");

    useEffect(() => {}, []);

    function handleDeleteQuestion() {
        if (window.confirm("Are you sure you want to delete question ?")) {
            navigate("/questions");
        }
    }

    function handleDeleteComment() {
        if (window.confirm("Are you sure you want to delete comment ?")) {
            navigate("/questions");
        }
    }

    function handlePostAnswer() {
        if (window.confirm("Are you sure you want to post your answer ?")) {
            navigate("/questions");
        }
    }

    function handleEnableEditComment(value) {
        setIsEditComentEnable(true);
        setCommentEditing(value);
    }

    function handleSumbitComment() {}

    return (
        <div className="question-page">
            <Sidebar />
            <div className="question-page__content">
                <div className="question-page__header">
                    <div className="question-page__title">
                        Why is processing a sorted array faster than processing an unsorted array?
                    </div>
                    <div className="ask-question-btn">
                        <Link to="/questions/ask">Ask Question</Link>
                    </div>
                    <div className="question-page__created-at">Asked 123</div>
                </div>

                <div className="question-page__main-content" data-color-mode="light">
                    <div className="question-vote">
                        <svg fill="#525960" width="36" height="36">
                            <path d="M2 25h32L18 9 2 25Z" />
                        </svg>
                        123
                        <svg fill="#525960" width="36" height="36">
                            <path d="M2 11h32L18 27 2 11Z" />
                        </svg>
                    </div>
                    <div className="question-page__question">
                        <MDEditor.Markdown source={question} />
                        <div className="question-page__question-footer">
                            <div className="question--edit">
                                <Link to={`/questions/123/edit`}>Edit</Link>
                                <div className="question--delete" onClick={handleDeleteQuestion}>
                                    Delete
                                </div>
                            </div>
                            <div className="question__user">
                                <div className="question__user__asked">Asked 123</div>
                                <div className="question__user__avatar">
                                    <img
                                        src="https://i.stack.imgur.com/FkjBe.png?s=64&g=1"
                                        alt=""
                                    />
                                </div>
                                <div className="question__user__username">
                                    <Link to={`/users/123`}>vune</Link>
                                </div>
                                <div className="question__user__reputation">123</div>
                            </div>
                        </div>

                        <div className="commment__content">
                            <div className="comment">
                                <div className="comment__content">
                                    For the record, your data need not be sorted, only partitioned .
                                    - <Link to={`/users/123`}>Username</Link>
                                </div>
                                <div className="comment--edit">
                                    <span
                                        onClick={() => {
                                            handleEnableEditComment("For the record");
                                        }}>
                                        Edit
                                    </span>
                                    <span onClick={handleDeleteComment}>Delete</span>
                                </div>
                            </div>

                            <div
                                className="comment--add"
                                onClick={() => {
                                    handleEnableEditComment("");
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
                    <div className="total-answers">27 Answers</div>
                    <Answer />
                    <Answer />
                    <Answer />
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
