import { useState, useEffect } from "react";
import AdminPageContent from "./AdminPageContent";
import { getAllUsers } from "../../Api/user-api";
import { getAllPosts } from "../../Api/question-api";
import "./AdminPage.scss";

function AdminPage() {
    const Pages = {
        USER: "User",
        POST: "Post",
    };

    const [data, setData] = useState([]);
    const [pageName, setPageName] = useState(Pages.USER);

    useEffect(() => {
        getAllUsers().then((res) => {
            setData(res);
        });
    }, []);

    function handleSideUser() {
        getAllUsers().then((res) => {
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
                    <a
                        href="#"
                        onClick={handleSideUser}
                        className={pageName === Pages.USER ? "target-active" : ""}>
                        {Pages.USER}
                    </a>
                    <a
                        href="#"
                        onClick={handleSidePost}
                        className={pageName === Pages.POST ? "target-active" : ""}>
                        {Pages.POST}
                    </a>
                </div>
            </div>

            {data.length && <AdminPageContent data={data} pageName={pageName} />}
        </div>
    );
}

export default AdminPage;
