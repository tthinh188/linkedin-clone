import React, { useState, useEffect } from 'react'
import "./Login.css"
import { auth } from "./firebase"
import { useDispatch } from "react-redux";
import { login } from "./features/userSlice"

function Login() {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [photoURL, setPhotoURL] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [email, setEmail] = useState("");
    const dispatch = useDispatch();

    const register = () => {
        if(!name) {
            return alert("Please enter a full name!");
        }

        if(password == confirmPassword) {
            auth.createUserWithEmailAndPassword(email, password)
            .then ( userAuth => {
                userAuth.user.updateProfile({
                    displayName:name,
                    photoURL: photoURL,
                })
                .then(() =>{
                    dispatch(
                        login({
                            email: userAuth.user.email,
                            uid: userAuth.user.uid,
                            displayName: name,
                            photoURL: photoURL,
                        })
                    );
                });
            }).catch( error => alert(error));
        }

        else {
            alert("Fail to confirm password");
        }
    }

    const signIn = (e) => {
        e.preventDefault();
        auth.signInWithEmailAndPassword(email, password)
        .then(userAuth => {
            dispatch(
                login({
                    email: userAuth.user.email,
                    uid: userAuth.user.uid,
                    displayName: userAuth.user.displayName,
                    photoURL: userAuth.user.photoURL,
                })
            )
        }).catch(error => alert(error))
    }

    return (
        <div className="login">
            <div className="login_logo">
                <h2>Linked<span className="logo">in</span></h2>
            </div>

            <form>
                <input 
                    placeholder="Full name (required if register)"
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}/>

                <input
                    placeholder="Profile pic URL (optional)" 
                    type="text"
                    value={photoURL}
                    onChange={e=> setPhotoURL(e.target.value)}/>

                <input 
                    placeholder="Email"
                    type="text"
                    value={email}
                    onChange={e=> setEmail(e.target.value)}/>

                <input
                    placeholder="Password"
                    type="password"
                    value={password}
                    onChange={e=> setPassword(e.target.value)}/>

                <input
                    placeholder="Confirm password (required if register)" 
                    type="password"
                    value={confirmPassword}
                    onChange={e=> setConfirmPassword(e.target.value)}/>
                <button onClick={signIn}>Sign In</button>
            </form>

            <p>Not a member? 
                <span className="login_register"
                    onClick={register}
                > Register Now</span>
            </p>
        </div>
    )
}

export default Login
