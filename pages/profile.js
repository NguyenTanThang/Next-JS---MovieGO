import React, { Component, useEffect } from 'react'
//import { Link } from 'react-router-dom';
import Link from "next/link"
import {updateProfile} from "../requests";
import {message} from "antd";
import { authenticationService } from '../_services';
import useInput from "../hooks/useInput";

function Profile(props) {

    const [username, usernameBind, usernameReset] = useInput("");
    const [confirmPassword, confirmPasswordBind, confirmPasswordReset] = useInput("");
    const [password, passwordBind, passwordReset] = useInput("");

    useEffect(() => {
        if (authenticationService.currentUserValue) {
            usernameBind.changeValue(authenticationService.currentUserValue.username);
        }
    }, []);

    const onSubmit = async (e) => {
        e.preventDefault();
        message.destroy();

        if (password !== confirmPassword) {
            return message.error("Confirm password must be the same as password");
        }

        const {success} = await updateProfile({
            username, password
        });

        if (success) {
            //props.history.push("/");
        }
    }

    return (
        <div className="sign-up-page standalone-page">
            <div className="sign-in-wrapper">
            <div className="sign-in-container">
                <h4>Create Account</h4>

                <form className="sign-in-form" onSubmit={onSubmit}>
                    <div className="form-group">
                        <input className="form-control" type="text" required placeholder="Username" name="username" onChange={usernameBind.onChange} value={username}/>
                    </div>
                    <div className="form-group">
                        <input className="form-control" type="password" required placeholder="New Password" name="password" onChange={passwordBind.onChange} value={password}/>
                    </div>
                    <div className="form-group">
                        <input className="form-control" type="password" required placeholder="Confirm New Password" name="confirmPassword" onChange={confirmPasswordBind.onChange} value={confirmPassword}/>
                    </div>
                    <div>
                        <button type="submit" className="btn btn-primary btn-block">SAVE CHANGES</button>
                    </div>
                </form>
            </div>
            <div className="sign-in-footer">
                <p>Don't want to change your profile?</p>
                <Link href="/">
                    <a className="btn btn-outline-primary btn-block">
                        GO BACK HOME
                    </a>
                </Link>
            </div>
            </div>
        </div>
    )
}

export default Profile;

