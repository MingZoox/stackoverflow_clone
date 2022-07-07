/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState, useEffect } from "react";
import AdminPageContent from "./AdminPageContent";
import { getUsers } from "../../Api/user-api";
import { getAllPosts } from "../../Api/question-api";
import "./AdminPage.scss";

export const Pages = {
    USER: "User",
    POST: "Post",
};

function AdminPage() {
    const [data, setData] = useState([]);
    const [pageName, setPageName] = useState(Pages.USER);
    const [totalPages, setTotalPages] = useState(1);

    const LimitRecordInPage = 5;

    useEffect(() => {
        getUsers(1, LimitRecordInPage).then((res) => {
            setData(res.users);
            setTotalPages(res.totalPages);
        });
    }, []);

    function handleSideUser() {
        getUsers(1, LimitRecordInPage).then((res) => {
            setData(res);
            setPageName(Pages.USER);
        });
    }

    function handleSidePost() {
        getAllPosts().then((res) => {
            setData(res);
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
