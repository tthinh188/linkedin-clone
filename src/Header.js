import React from 'react'
import "./Header.css"
import HeaderOption from "./HeaderOption"
import SearchIcon from "@material-ui/icons/Search"
import HomeIcon from "@material-ui/icons/Home"
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount"
import BusinessCenterIcon from "@material-ui/icons/BusinessCenter"
import ChatIcon from "@material-ui/icons/Chat"
import NotificationsIcon from "@material-ui/icons/Notifications"
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { useDispatch, useSelector } from "react-redux";
import { auth } from "./firebase"
import { selectUser, login, logout } from "./features/userSlice";

function Header() {
    const user = useSelector(selectUser);
    const dispatch = useDispatch();

    const logoutApp = () => {
        dispatch(logout())
        auth.signOut();
    }
    return (
        <div className="header">
            <div className="header_left">
                <h3 className="header_logo"> in</h3>
                <div className="header_search">
                    <SearchIcon />
                    <input type="type" placeholder="Search"/> 
                </div>
            </div>

            <div className="header_right">
                <HeaderOption Icon={HomeIcon} title="Home" />
                <HeaderOption Icon={SupervisorAccountIcon} title="My Network" />
                <HeaderOption Icon={BusinessCenterIcon} title="Jobs" />
                <HeaderOption Icon={ChatIcon} title="Messaging" />
                <HeaderOption Icon={NotificationsIcon} title="Notification" />
                <HeaderOption avatar={true}
                    title="me"
                />

                <HeaderOption Icon={ExitToAppIcon}
                    title="Logout"
                    onClick={logoutApp}
                />
            </div>
        </div>
    )
}

export default Header
