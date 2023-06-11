import React, { useState } from "react";
import { Link } from 'react-router-dom';
export default function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const login = (e) => {
        e.preventDefault();
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
                    sessionStorage.setItem("userEmail",data.data.email);
                    //console.log(sessionStorage.getItem("userEmail"));
                    window.location = "http://localhost:3000/";
                } else {
                    alert("Invalid credentials");
                }
            });
    }
    return (
        <>
            <br></br>
            <center>
                <form onSubmit={login}>
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <input type="email" onChange={(e) => setEmail(e.target.value)} className="form-control w-50" placeholder="Enter email..." />
                            </div>
                        </div>
                        <br></br>
                        <div className="row">
                            <div className="col-12">
                                <input type="password" onChange={(e) => setPassword(e.target.value)} className="form-control w-50" placeholder="Enter password..." />
                            </div>
                        </div>
                        <br></br>
                        <div className="row">
                            <div className="col-12">
                                <button type="Submit" className="btn btn-danger">Login</button>
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