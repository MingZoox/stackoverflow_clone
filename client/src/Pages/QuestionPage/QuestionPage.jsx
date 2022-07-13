import Sidebar from "../../Layouts/Sidebar/Sidebar";
import "./QuestionPage.scss";
import { useParams } from "react-router-dom";
import MDEditor from "@uiw/react-md-editor";
import { useState, useEffect } from "react";
import { getPost } from "../../Api/question-api";

function QuestionPage() {
    const { idQuestion } = useParams();
    const [comment, setComment] = useState();
    const [question, setQuestion] = useState();

    useEffect(() => {}, []);

    return (
        <div className="question-page">
            <Sidebar />
            <div>
                <div className="question-content">
                    <MDEditor.Markdown source={comment} />
                </div>
                <div className="answer" data-color-mode="light">
                    <MDEditor value={comment} onChange={setComment} height="430" />
                </div>
            </div>
        </div>
    );
}

export default QuestionPage;
