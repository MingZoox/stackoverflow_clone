import React, { useState } from "react";
import PaginationComponent from "../../Components/PaginationComponent/PaginationComponent.jsx";
import { getUsers, updateProfile, addUser, deleteUser } from "../../Api/user-api";
import { Pages } from "./AdminPage.jsx";
import { useEffect } from "react";
import {
    getQuestions,
    addQuestion,
    updateQuestionAdmin,
    deleteQuestion,
} from "../../Api/question-api.js";

// data props have at least one record to use following component
function AdminPageContent({ data, setData, totalPages, pageName, LimitRecordInPage }) {
    const [currentFormData, setCurrentFormData] = useState({});
    const [isFormEnable, setIsFormEnable] = useState(false);
    const [page, setPage] = useState(1);
    const [isFormUpdate, setIsFormUpdate] = useState(false);

    useEffect(() => {
        if (pageName === Pages.USER) {
            getUsers(page, LimitRecordInPage).then((res) => {
                setData(res.users);
            });
        } else if (pageName === Pages.POST) {
            getQuestions(page, LimitRecordInPage).then((res) => {
                res.questions.forEach((question) => {
                    delete question["usersLiked"];
                    delete question["usersDisliked"];
                    delete question["user"];
                });
                setData(res.questions);
            });
        }
    }, [page]);

    function handleSubmit(e) {
        e.preventDefault();
        if (pageName === Pages.USER) {
            if (isFormUpdate) {
                updateProfile(currentFormData).then(
                    (res) => res && alert("User updated successfully !!")
                );
            } else {
                delete currentFormData._id;
                addUser(currentFormData).then((res) => res && alert("Add user success !!"));
            }
        } else if (pageName === Pages.POST) {
            if (isFormUpdate) {
                updateQuestionAdmin(currentFormData).then(
                    (res) => res && alert("Question updated successfully !!")
                );
            } else {
                delete currentFormData._id;
                addQuestion(
                    currentFormData.title,
                    currentFormData.content,
                    currentFormData.tags
                ).then((res) => res && alert("Add question success !!"));
            }
        }
    }

    function handleFormEnable(e, recordData) {
        // enable form for post or update
        if (!recordData?._id) {
            let recordDataEmpty = { ...data[0] };
            Object.keys(recordDataEmpty).forEach((key) => (recordDataEmpty[key] = ""));
            setCurrentFormData(recordDataEmpty);
            setIsFormUpdate(false);
        } else {
            setCurrentFormData(recordData);
            setIsFormUpdate(true);
        }
        setIsFormEnable(true);
    }

    function handleDeleteForm(e, _id) {
        if (window.confirm("Are you sure you want to delete ?")) {
            if (pageName === Pages.USER) {
                deleteUser(_id).then((res) => res && alert("User deleted !!"));
            } else if (pageName === Pages.POST) {
                deleteQuestion(_id).then((res) => res && alert("Question deleted !!"));
            }
        }
    }

    function handleChangeForm(e, key) {
        setCurrentFormData({ ...currentFormData, [key]: e.target.value });
    }

    return (
        <div className="admin__main">
            <div className="main__header">
                <h1>{pageName}</h1>
                <button onClick={(e) => handleFormEnable(e, {})}>+ New {pageName}</button>
            </div>
            <div className="main__list">
                <div className="list__field">
                    {Object.keys(data[0]).map(
                        (key, index) => key !== "_id" && <span key={index}>{key}</span>
                    )}
                </div>

                {data.map((obj, index) => (
                    <div key={index} className="list__record">
                        {Object.values(obj).map((value, index) => {
                            return index !== 0 && <span key={index}>{value}</span>;
                        })}
                        <button
                            onClick={(e) => {
                                handleFormEnable(e, obj);
                            }}>
                            Edit
                        </button>
                        <button
                            onClick={(e) => {
                                handleDeleteForm(e, obj._id);
                            }}>
                            Delete
                        </button>
                    </div>
                ))}
            </div>

            <PaginationComponent page={page} setPage={setPage} totalPages={totalPages} />

            {isFormEnable && (
                <div className="main__form">
                    <div className="form__close" onClick={() => setIsFormEnable(false)}>
                        X
                    </div>
                    <form onSubmit={handleSubmit}>
                        {Object.keys(currentFormData).map((key, index) => {
                            return (
                                key !== "_id" && (
                                    <React.Fragment key={index}>
                                        <div className="form__title">{key}</div>
                                        <input
                                            type="text"
                                            value={currentFormData[key]}
                                            onChange={(e) => {
                                                handleChangeForm(e, key);
                                            }}
                                        />
                                    </React.Fragment>
                                )
                            );
                        })}
                        <input type="submit" value="Submit" />
                    </form>
                </div>
            )}
        </div>
    );
}

export default AdminPageContent;
