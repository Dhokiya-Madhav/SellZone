import React from "react";
import "./styles/nav.css";
import logo from "../images/salesman.png";
import btnIcon from "../images/profile.png";
export default function Navbar() {
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
                        <button className="btn btn-outline-danger">
                            My Profile
                            <span>
                                <img src={btnIcon} className="ms-2" height="30" width="30" />
                            </span>
                        </button>

                    </form>
                </div>
            </div>
        </nav>
    );
}