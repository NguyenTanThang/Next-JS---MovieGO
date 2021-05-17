import React from 'react'
//import { Link } from 'react-router-dom';
import Link from "next/link";
import {signUp} from "../requests";
import {message} from "antd";
import useInput from "../hooks/useInput";

function SignUp(props) {

    const [username, usernameBind, usernameReset] = useInput("");
    const [email, emailBind, emailReset] = useInput("");
    const [confirmPassword, confirmPasswordBind, confirmPasswordReset] = useInput("");
    const [password, passwordBind, passwordReset] = useInput("");

    const onSubmit = async (e) => {
        e.preventDefault();
        message.destroy();

        if (password !== confirmPassword) {
            return message.error("Confirm password must be the same as password");
        }

        const {success} = await signUp({
            username, email, password
        });

        if (success) {
            props.history.push("/sign-in");
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
                        <input className="form-control" type="email" required placeholder="Email Address" name="email" onChange={emailBind.onChange} value={email}/>
                    </div>
                    <div className="form-group">
                        <input className="form-control" type="password" required placeholder="Password" name="password" onChange={passwordBind.onChange} value={password}/>
                    </div>
                    <div className="form-group">
                        <input className="form-control" type="password" required placeholder="Confirm Password" name="confirmPassword" onChange={confirmPasswordBind.onChange} value={confirmPassword}/>
                    </div>
                    <div>
                        <button type="submit" className="btn btn-primary btn-block">CREATE ACCOUNT</button>
                    </div>
                </form>
            </div>
            <div className="sign-in-footer">
                <p>Already have an account?</p>
                <Link href="/sign-in">
                    <a className="btn btn-outline-primary btn-block">
                        SIGN IN
                    </a>
                </Link>
            </div>
            </div>
        </div>
    )
}

export default SignUp;