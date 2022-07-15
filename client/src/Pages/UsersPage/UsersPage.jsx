import { useState, useEffect } from "react";
import Sidebar from "../../Layouts/Sidebar/Sidebar";
import PaginationComponent from "../../Components/PaginationComponent/PaginationComponent";
import User from "./User";
import "./UsersPage.scss";
import { getUsers } from "../../Api/user-api";

function UsersPage() {
    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [filter, setFilter] = useState("");

    const LimitRecordInPage = 12;

    useEffect(() => {
        getUsers(page, LimitRecordInPage, filter).then((res) => {
            setUsers(res.users);
            setTotalPages(res.totalPages);
        });
    }, [page, filter]);

    function handleChangeFilter(e) {
        setFilter(e.target.value);
    }

    return (
        <div className="users-page">
            <Sidebar />
            <div className="users-page__content">
                <div className="users-page__header">
                    <div className="users-page__title">Users</div>
                    <div className="users-page__filter">
                        <svg fill="#525960" width="18" height="18">
                            <path d="m18 16.5-5.14-5.18h-.35a7 7 0 1 0-1.19 1.19v.35L16.5 18l1.5-1.5ZM12 7A5 5 0 1 1 2 7a5 5 0 0 1 10 0Z" />
                        </svg>{" "}
                        <input
                            type="text"
                            value={filter}
                            name="filter"
                            placeholder="Filter by tag name"
                            onChange={handleChangeFilter}
                        />
                    </div>
                </div>

                <div className="users">
                    {users.map((user, index) => (
                        <User
                            key={index}
                            userId={user._id}
                            username={user.username}
                            avatar={user.avatar}
                            reputation={user.reputation}
                        />
                    ))}
                </div>

                <PaginationComponent page={page} setPage={setPage} totalPages={totalPages} />
            </div>
        </div>
    );
}

export default UsersPage;
