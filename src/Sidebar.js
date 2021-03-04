import React from 'react'
import "./Sidebar.css"
import { Avatar } from "@material-ui/core"
import { selectUser } from "./features/userSlice"
import { useSelector } from "react-redux"

function Sidebar() {
    const user = useSelector(selectUser)

    const recentItem = (topic) => (
        <div className="sidebar_recentItem">
            <span className="sidebar_hash">#</span>
            <p>{topic}</p>
        </div>
    )
    return (
        <div className="sidebar">
            <div className="sidebar_top">
                <img src="https://wallpapercave.com/wp/wp2740673.jpg" alt="" />
                <Avatar className="sidebar_avatar" src={user.photoURL}>
                    {user.displayName[0].toUpperCase()}
                </Avatar>
                <h2>{user.displayName}</h2>
                <h4>{user.email}</h4>
            </div>

            <div className="sidebar_stats">
                <div className="sidebar_stat">
                    <p>Who viewed you</p>
                    <p className="sidebar_statNumber">10,000</p>
                </div>
                <div className="sidebar_stat">
                    <p>Views on post  </p>
                    <p className="sidebar_statNumber">18,430</p>
                </div>
            </div>
            <div className="sidebar_bottom">
                    <p>Recent</p>
                    {recentItem('reactjs')}
                    {recentItem('programming')}
                    {recentItem('softwareengineering')}
                    {recentItem('design')}
                    {recentItem('developer')}

                </div>
        </div>
    )
}

export default Sidebar
