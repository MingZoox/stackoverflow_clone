import { useState } from "react";
import { useNavigate } from "react-router-dom";

function HeaderNotification({ notifications }) {
    const navigate = useNavigate();

    const [notificationView, setNotificationView] = useState(false);

    function handleNotificationView() {
        setNotificationView(!notificationView);
    }

    function handleOnClickNotification(link) {
        setNotificationView(false);
        navigate(link);
    }

    return (
        <div className="header__notification">
            <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/OOjs_UI_icon_bell.svg/1024px-OOjs_UI_icon_bell.svg.png"
                onClick={handleNotificationView}></img>

            {notificationView && (
                <div className="notification__notifications">
                    <p>NOTIFICATIONS</p>
                    {notifications.map((notification) => (
                        <div
                            className="notification"
                            key={notification._id}
                            onClick={() => handleOnClickNotification(notification.link)}>
                            <div className="notification__date">
                                {notification.date.slice(0, 10)}
                            </div>
                            <div className="notification__content">{notification.content}</div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default HeaderNotification;
