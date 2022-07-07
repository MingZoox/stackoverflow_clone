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
} from "./Pages/pages";
import RequireAuth from "./Auth/RequireAuth";
import { Routes, Route } from "react-router-dom";
import { getCurrentUser } from "./Api/user-api";
import AuthContext from "./Auth/AuthProvider";
import Cookies from "js-cookie";

function App() {
    const { setAuth } = useContext(AuthContext);

    useEffect(() => {
        Cookies.get("Authorization") &&
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
                    <Route path="login" element={<LoginPage />} />
                    <Route path="signup" element={<SignupPage />} />
                    <Route path=":idUser" element={<UserProfilePage />} />
                </Route>
                <Route path="questions">
                    <Route index element={<QuestionsPage />} />
                    <Route path=":idQuestion" element={<QuestionPage />} />
                    <Route path="ask" element={<AskQuestionPage />} />
                </Route>
                <Route path="*" element={<NotFoundPage />} />

                {/* protected routes */}
                <Route element={<RequireAuth allowedRole="admin" />}></Route>
                
                <Route path="admin" element={<AdminPage />} />
            </Routes>

            <Footer />
        </React.Fragment>
    );
}

export default App;
