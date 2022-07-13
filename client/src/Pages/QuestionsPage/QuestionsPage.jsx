import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getQuestionsByTag } from "../../Api/tag-api";
import Sidebar from "../../Layouts/Sidebar/Sidebar";
import Question from "./Question";
import { getQuestions } from "../../Api/question-api";
import PaginationComponent from "../../Components/PaginationComponent/PaginationComponent";
import "./QuestionsPage.scss";

const Order = {
    NEWEST: "newest",
    UNANSWERED: "unanswered",
    SCORE: "score",
};

function QuestionsPage() {
    const { tag } = useParams();

    const [order, setOrder] = useState(Order.NEWEST);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [questions, setQuestions] = useState([]);
    const [totalQuestions, setTotalQuestions] = useState(0);

    const LimitRecordInPage = 5;

    useEffect(() => {
        if (tag) {
            getQuestionsByTag(page, LimitRecordInPage, tag).then((res) => {
                setTotalPages(res.totalPages);
                setQuestions(res.questions);
                setTotalQuestions(res.totalQuestions);
            });
        } else {
            getQuestions(page, LimitRecordInPage, order).then((res) => {
                setTotalPages(res.totalPages);
                setQuestions(res.questions);
                setTotalQuestions(res.totalQuestions);
            });
        }
    }, [page, order]);

    return (
        <div className="questions-page">
            <Sidebar />
            <div className="questions__content">
                <div className="questions-page__header">
                    <div className="title">All Questions</div>
                    <div className="ask-question-btn">
                        <Link to="/questions/ask">Ask Question</Link>
                    </div>
                    <div className="question-number">{totalQuestions} questions</div>
                    <div className="question-filter">
                        <span
                            onClick={() => {
                                setOrder(Order.NEWEST);
                                setPage(1);
                            }}
                            className={order === Order.NEWEST ? "target-active" : ""}>
                            Newest
                        </span>
                        <span
                            onClick={() => {
                                setOrder(Order.UNANSWERED);
                                setPage(1);
                            }}
                            className={order === Order.UNANSWERED ? "target-active" : ""}>
                            Unanswered
                        </span>
                        <span
                            onClick={() => {
                                setOrder(Order.SCORE);
                                setPage(1);
                            }}
                            className={order === Order.SCORE ? "target-active" : ""}>
                            Score
                        </span>
                    </div>
                </div>

                {questions.map((question) => (
                    <Question
                        key={question._id}
                        questionId={question._id}
                        votes={question.usersLiked.length}
                        title={question.title}
                        tags={question.tags}
                        user={question.user}
                    />
                ))}

                <PaginationComponent page={page} setPage={setPage} totalPages={totalPages} />
            </div>
            <div className="right-sidebar"></div>
        </div>
    );
}

export default QuestionsPage;
