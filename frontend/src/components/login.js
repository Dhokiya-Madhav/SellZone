import React, { useState } from "react";
import { Link } from 'react-router-dom';
export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailErrorMsg, setEmailErrorMsg] = useState("");
    const [passwordErrorMsg, setPasswordErrorMsg] = useState("");

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/;

    const emailValidate = (e) => {
        const newEmail = e.target.value;
        setEmail(newEmail);
        if (!emailRegex.test(newEmail)) {
            document.getElementById('email').style.color='red';
            setEmailErrorMsg("Invalid email address");
        } else {
            setEmailErrorMsg("");
            document.getElementById('email').style.color='green';
        }
    };

    const passwordValidate = (e) => {
        const newPassword = e.target.value;
        setPassword(newPassword);
        if (!passwordRegex.test(newPassword)) {
            document.getElementById('password').style.color='red';
            setPasswordErrorMsg(
                "Invalid password. It should be at least 6 characters long and include alphabets, numbers, and special characters."
            );
        } else {
            document.getElementById('password').style.color='green';
            setPasswordErrorMsg("");
        }
    };

    const login = (e) => {
        e.preventDefault();
        if ((emailErrorMsg == "" && passwordErrorMsg == "") && (email != "" && password != "")) {
            fetch("http://localhost:5000/login-user", {
                method: "POST",
                crossDomain: true,
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    "Access-Control-Allow-Origin": "*",
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data.status === "ok") {
                        alert("Login Successful");
                        //console.log(data.data.email);
                        sessionStorage.setItem("userEmail", data.data.email);
                        //console.log(sessionStorage.getItem("userEmail"));
                        window.location = "http://localhost:3000/";
                    } else {
                        alert("Invalid credentials");
                    }
                });
        }
    }
    return (
        <>
            <br></br>
            <center>
                <form>
                    <div className="container">
                        <div className="fs-3">Login</div>
                        <div className="row">
                            <div className="col-12">
                                <input type="email" id='email' onChange={emailValidate} className="form-control w-50" placeholder="Enter email..." />
                                {emailErrorMsg && (
                                    <div className="text-danger">{emailErrorMsg}</div>
                                )}
                            </div>
                        </div>
                        <br></br>
                        <div className="row">
                            <div className="col-12">
                                <input type="password" id='password' onChange={passwordValidate} className="form-control w-50" placeholder="Enter password..." />
                                {passwordErrorMsg && (
                                    <div className="text-danger">{passwordErrorMsg}</div>
                                )}
                            </div>
                        </div>
                        <br></br>
                        <div className="row">
                            <div className="col-12">
                                <button type="Submit" onClick={login} className="btn btn-danger">Login</button>
                            </div>
                        </div>
                        <br></br>
                        <div className="row">
                            <div className="col-12">
                                Don't have an account? <Link to='/signup'>Signup</Link>
                            </div>
                        </div>
                    </div>
                </form>
            </center>
        </>
    );
}