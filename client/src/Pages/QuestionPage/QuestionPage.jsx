import Sidebar from "../../Layouts/Sidebar/Sidebar";
import "./QuestionPage.scss";
import { useParams } from "react-router-dom";
import MDEditor from "@uiw/react-md-editor";
import { useState, useEffect } from "react";
import { getPost } from "../../Api/question-api";

function QuestionPage() {
    let { idQuestion } = useParams();
    const [comment, setComment] = useState();
    const [question, setQuestion] = useState();
    useEffect(() => {
        getPost(idQuestion).then((res) => {
            setQuestion(res);
        });
    }, []);
    return (
        <div className="question-page">
            <Sidebar />
            {/* {idQuestion} */}
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
