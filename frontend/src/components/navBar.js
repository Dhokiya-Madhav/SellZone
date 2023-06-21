import React, { useState, useEffect } from "react";
import "./styles/nav.css";
import logo from "../images/salesman.png";
import btnIcon from "../images/profile.png";
import loginIcon from "../images/login.png";
import { Link, redirect } from 'react-router-dom';
export default function Navbar() {
    const userName = sessionStorage.getItem("userName");
    const logoutUser = () => {
        sessionStorage.clear();
        window.location = "http://localhost:3000";
    };
    if (userName) {
        var button = <button onClick={logoutUser} className="btn me-3 btn-outline-danger">
            Logout
        </button>;
    } else {
        var button = <Link to="/login">
            <button className="btn me-3 btn-outline-danger">
                Login
                <span>
                    <img src={loginIcon} className="ms-2" height="30" width="30" />
                </span>
            </button>
        </Link>
    }

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [mobilenumber, setmobilenumber] = useState(0);
    useEffect(() => {
        if (sessionStorage.getItem("userEmail") != null) {
            let useremail = sessionStorage.getItem("userEmail");

            fetch("http://localhost:5000/user/" + useremail).then((response) => response.json())
                .then((data) => {
                    console.log(data);
                    setUsername(data.username);
                    sessionStorage.setItem("userName", data.userName);
                    sessionStorage.setItem("userId", data._id);
                    setEmail(data.email);
                    setmobilenumber(data.mobileno);
                })
        }
    }, []);
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-dark">
            <div className="container-fluid">
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                    <img src={logo} height="55" width="55" />
                    <a class="navbar-brand fw-bold fs-3 text-danger" href="#">SellZone</a>
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a className="nav-link text-white" aria-current="page" href="#">Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link text-white" href="#">About</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link text-white" href="#">Contact</a>
                        </li>
                    </ul>
                    <form className="d-flex">
                        {button}
                        <Link to="/up">
                            <button className="btn btn-outline-danger">
                                {username}
                                <span>
                                    <img src={btnIcon} className="ms-2" height="30" width="30" />
                                </span>
                            </button>
                        </Link>
                    </form>
                </div>
            </div>
        </nav>
    );
}