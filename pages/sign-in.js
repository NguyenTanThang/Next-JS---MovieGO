import React, { useEffect } from 'react';
//import { Link } from 'react-router-dom';
import Link from "next/link";
import { authenticationService } from '../_services';
import {message} from "antd";
import useInput from "../hooks/useInput";

function SignIn(props) {

    const [email, emailBind, emailReset] = useInput("");
    const [password, passwordBind, passwordReset] = useInput("");

    useEffect(() => {
        if (authenticationService.currentUserValue) { 
            //props.history.push('/');
            message.error("You are already logged in");
        }
    }, []);

    const onSubmit = async (e) => {
        try {
            e.preventDefault();
            authenticationService.login(email, password)
            .then(
                user => {
                    const { from } = props.location.state || { from: { pathname: "/" } };
                    props.history.push(from);
                    window.location.reload();
                },
                error => {
                    console.log(error);
                }
            );
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="sign-in-page standalone-page">
            <div className="sign-in-wrapper">
            <div className="sign-in-container">
                <h4>Sign In</h4>

                <form className="sign-in-form" onSubmit={onSubmit}>
                    <div className="form-group">
                        <input className="form-control" type="email" required placeholder="Email Address" name="email" value={email} onChange={emailBind.onChange}/>
                    </div>
                    <div className="form-group">
                        <input className="form-control" type="password" required placeholder="Password" name="password" value={password}
                        onChange={passwordBind.onChange}/>
                    </div>
                    <div>
                        <button className="btn btn-primary btn-block">SIGN IN</button>
                    </div>
                </form>
            </div>
            <div className="sign-in-footer">
                <p>New to MovieGO?</p>
                <Link href="/sign-up">
                    <a className="btn btn-outline-primary btn-block">
                        CREATE A NEW ACCOUNT
                    </a>
                </Link>
            </div>
            </div>
        </div>
    )
}

export default SignIn;
