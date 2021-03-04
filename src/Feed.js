import React, { useState, useEffect } from 'react'
import "./Feed.css"
import CreateIcon from "@material-ui/icons/Create"
import InputOption from "./InputOption"
import ImageIcon from "@material-ui/icons/Image"
import SubscriptionsIcon from "@material-ui/icons/Subscriptions"
import EventNoteIcon from "@material-ui/icons/EventNote"
import CalendarViewDayIcon from "@material-ui/icons/CalendarViewDay"
import Post from "./Post"
import { db } from "./firebase"
import firebase from "firebase"
import { selectUser } from "./features/userSlice";
import { useSelector } from "react-redux";
import FlipMove from "react-flip-move";

function Feed() {
    const [input, setInput] = useState("");
    const [posts, setPosts] = useState([]);
    const user = useSelector(selectUser);

    useEffect(() => {
        db.collection("posts").orderBy("timestamp","desc").onSnapshot(
            snapshot => (
                setPosts(snapshot.docs.map(doc =>({
                        id:doc.id,
                        data: doc.data()
                    }))
                )
            )
        );
    }, []);

    const sendPost = e => {
        e.preventDefault();

        db.collection("posts").add({
            name: user.displayName,
            description: "Job Alert",
            message: input,
            photoURL: user.photoURL || "",
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        });

        setInput("");
    }

    return (
        <div className="feed">
            <div className="feed_inputContainer">
                <div className="feed_input">
                    <CreateIcon />
                    <form>
                        <input 
                            type="text" 
                            placeholder="Start a post"
                            value={input}
                            onChange={e => setInput(e.target.value)}/>
                        <button
                            onClick={sendPost} 
                            type="submit">Send</button>
                    </form>
                </div>
                
                <div className="feed_inputOptions">
                    <InputOption title="Photo" Icon={ImageIcon}
                    color="#70B5F9"/>
                    <InputOption title="Video" Icon={SubscriptionsIcon}
                    color="#E7A33E"/>
                    <InputOption title="Event" Icon={EventNoteIcon}
                    color="#C0CBCD"/>
                    <InputOption title="Write article" Icon={CalendarViewDayIcon}
                    color="#7FC15E"/>
                </div>
            </div>
            
            <FlipMove>
                {posts.map(({id, data: {name, description, message, photoURL}}) => (
                    <Post 
                        key={id}
                        name={name}
                        description={description}
                        message={message}
                        photoURL={photoURL}
                    />
                ))}
            </FlipMove>
        </div>
    )
}

export default Feed
