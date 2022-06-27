import { useState } from "react";
import { useNavigate } from "react-router-dom";

function HeaderNotification() {
    const navigate = useNavigate();

    const [notificationView, setNotificationView] = useState(false);
    const [messages, setMessages] = useState([
        { title: "title", date: "date", content: "content", link: "/" },
        { title: "title", date: "date", content: "content", link: "/" },
        { title: "title", date: "date", content: "content", link: "/" },
    ]);

    function handleNotificationView() {
        setNotificationView(!notificationView);
    }

    function handleOnClickMessage(link) {
        navigate(link);
        setNotificationView(false);
    }

    return (
        <div className="header__notification">
            <img
                src="https://uxwing.com/wp-content/themes/uxwing/download/37-communication-chat-call/bell.png"
                onClick={handleNotificationView}></img>

            {notificationView && (
                <div className="notification__messages">
                    <p>MESSAGE</p>
                    {messages.map((message, index) => (
                        <div
                            className="message"
                            key={index}
                            onClick={() => handleOnClickMessage(message.link)}>
                            <div className="message__title">{message.title}</div>
                            <div className="message__date">{message.date}</div>
                            <div className="message__content">{message.content}</div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default HeaderNotification;
