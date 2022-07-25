import { useState, useEffect } from "react";
import AdminPageContent from "./AdminPageContent";
import { getUsers } from "../../Api/user-api";
import { getQuestions } from "../../Api/question-api";
import "./AdminPage.scss";

export const Pages = {
    USER: "User",
    POST: "Post",
    ANSWER: "Answer",
    COMMENT: "Comment",
};

function AdminPage() {
    const [data, setData] = useState([]);
    const [pageName, setPageName] = useState(Pages.USER);
    const [totalPages, setTotalPages] = useState(1);

    const LimitRecordInPage = 10;

    useEffect(() => {
        getUsers(1, LimitRecordInPage).then((res) => {
            res.users.forEach((user) => {
                delete user["_id"];
            });
            setData(res.users);
            setTotalPages(res.totalPages);
        });
    }, []);

    function handleSideUser() {
        getUsers(1, LimitRecordInPage).then((res) => {
            setData(res.users);
            setPageName(Pages.USER);
        });
    }

    function handleSidePost() {
        getQuestions(1, LimitRecordInPage, "newest").then((res) => {
            res.questions.forEach((question) => {
                delete question["usersLiked"];
                delete question["usersDisliked"];
                delete question["user"];
            });
            setData(res.questions);
            setPageName(Pages.POST);
        });
    }

    return (
        <div className="admin-page">
            <div className="admin__sidebar">
                <div className="sidebar-nav">
                    <h4>ADMIN</h4>
                    <span
                        onClick={handleSideUser}
                        className={pageName === Pages.USER ? "target-active" : ""}>
                        {Pages.USER}
                    </span>
                    <span
                        onClick={handleSidePost}
                        className={pageName === Pages.POST ? "target-active" : ""}>
                        {Pages.POST}
                    </span>
                    <span
                        onClick={handleSidePost}
                        className={pageName === Pages.ANSWER ? "target-active" : ""}>
                        {Pages.ANSWER}
                    </span>
                </div>
            </div>

            {data.length && (
                <AdminPageContent
                    data={data}
                    setData={setData}
                    totalPages={totalPages}
                    pageName={pageName}
                    LimitRecordInPage={LimitRecordInPage}
                />
            )}
        </div>
    );
}

export default AdminPage;
