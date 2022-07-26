import React, { useEffect, useContext } from "react";
import Header from "./Layouts/Header/Header";
import Footer from "./Layouts/Footer/Footer";
import {
    HomePage,
    LoginPage,
    SignupPage,
    QuestionsPage,
    NotFoundPage,
    AdminPage,
    AskQuestionPage,
    QuestionPage,
    UserProfilePage,
    TagsPage,
    UsersPage,
} from "./Pages/pages";
import RequireAuth from "./Auth/RequireAuth";
import { Routes, Route } from "react-router-dom";
import { getCurrentUser } from "./Api/user-api";
import AuthContext from "./Auth/AuthProvider";

function App() {
    const { setAuth } = useContext(AuthContext);

    useEffect(() => {
        getCurrentUser().then((currentUser) => {
            setAuth(currentUser);
        });
    }, []);

    return (
        <React.Fragment>
            <Header />

            <Routes>
                {/* public routes */}
                <Route index element={<HomePage />} />
                <Route path="users">
                    <Route index element={<UsersPage />} />
                    <Route path="login" element={<LoginPage />} />
                    <Route path="signup" element={<SignupPage />} />
                    <Route path=":userId" element={<UserProfilePage />} />
                </Route>
                <Route path="questions">
                    <Route index element={<QuestionsPage />} />
                    <Route path=":questionId" element={<QuestionPage />} />
                    <Route path="ask" element={<AskQuestionPage />} />
                </Route>
                <Route path="tags">
                    <Route index element={<TagsPage />} />
                    <Route path=":tag" element={<QuestionsPage />} />
                </Route>
                <Route path="*" element={<NotFoundPage />} />

                {/* protected routes */}
                <Route element={<RequireAuth allowedRole="admin" />}>
                    <Route path="admin" element={<AdminPage />} />
                </Route>
            </Routes>

            <Footer />
        </React.Fragment>
    );
}

export default App;
