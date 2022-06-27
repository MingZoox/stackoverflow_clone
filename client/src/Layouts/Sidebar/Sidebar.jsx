import { NavLink } from "react-router-dom";
import "./Sidebar.scss";

function Sidebar() {
    return (
        <div className="sidebar">
            <div className="sidebar-nav">
                <NavLink to="/">Home</NavLink>
                <p>PUBLIC</p>
                <NavLink
                    to="/questions"
                    className={({ isActive }) =>
                        isActive ? "target-active" : ""
                    }
                >
                    Questions
                </NavLink>
                <NavLink
                    to="/tags"
                    className={({ isActive }) =>
                        isActive ? "target-active" : ""
                    }
                >
                    Tags
                </NavLink>
                <NavLink
                    to="/users"
                    className={({ isActive }) =>
                        isActive ? "target-active" : ""
                    }
                >
                    Users
                </NavLink>
            </div>
        </div>
    );
}

export default Sidebar;
