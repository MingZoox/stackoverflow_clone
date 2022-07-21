import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MDEditor from "@uiw/react-md-editor";
import { addQuestion } from "../../Api/question-api";
import "./AskQuestionPage.scss";

function AskQuestionPage() {
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [tags, setTags] = useState("");

    function handleTitle(e) {
        setTitle(e.target.value);
    }

    function handleTags(e) {
        setTags(e.target.value);
    }

    function submmitQuestion() {
        if (window.confirm("Are you sure you want to public your question ?")) {
            addQuestion(title, content, tags).then((res) => {
                if (res) {
                    alert("Post questions success !!");
                    navigate("/questions");
                }
            });
        }
    }

    return (
        <div className="ask-question-page">
            <div className="ask-question-page__header">Ask a public question</div>
            <div className="ask-question-page--ask">
                <div className="ask__title">
                    Title
                    <input
                        type="text"
                        value={title}
                        onChange={handleTitle}
                        placeholder="e.g. Is there an R function for finding the index of an element in a vector?"
                    />
                </div>
                <div className="ask__body" data-color-mode="light">
                    Body
                    <MDEditor value={content} onChange={setContent} height="430" />
                </div>
                <div className="ask__tags">
                    Tags
                    <input
                        type="text"
                        value={tags}
                        onChange={handleTags}
                        placeholder="e.g. (c laravel php)"
                    />
                </div>
            </div>
            <div className="ask__submmit" onClick={submmitQuestion}>
                Post your question
            </div>
        </div>
    );
}

export default AskQuestionPage;
