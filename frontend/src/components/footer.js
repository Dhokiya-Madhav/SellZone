import React from "react";
import img from "../images/salesman.png";
export default function Footer() {
    return (
        <>
            <div>
                <footer className="text-center text-lg-start text-white">
                    <div className="container p-4">
                        <div className="row my-4">
                            <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
                                <div className="rounded-circle bg-white shadow-1-strong d-flex align-items-center justify-content-center mb-4 mx-auto" style={{width: 150,height: 150}}>
                                    <img src={img} height="70" alt="" loading="lazy" />
                                </div>
                                <p className="text-center">Sell-Zone</p>
                                <ul className="list-unstyled d-flex flex-row justify-content-center">
                                    <li>
                                        <a className="text-white px-2" href="#!">
                                            <i className="fab fa-facebook-square"></i>
                                        </a>
                                    </li>
                                    <li>
                                        <a className="text-white px-2" href="#!">
                                            <i className="fab fa-instagram"></i>
                                        </a>
                                    </li>
                                    <li>
                                        <a className="text-white ps-2" href="#!">
                                            <i className="fab fa-youtube"></i>
                                        </a>
                                    </li>
                                </ul>

                            </div>
                            
                            <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
                                <h5 className="text-uppercase mb-4">Links</h5>

                                <ul className="list-unstyled">
                                    <li className="mb-2">
                                        <a href="#!" className="text-white"><i className="fas fa-paw pe-3"></i>Home</a>
                                    </li>
                                    <li className="mb-2">
                                        <a href="#!" className="text-white"><i className="fas fa-paw pe-3"></i>My profile</a>
                                    </li>
                                    <li className="mb-2">
                                        <a href="#!" className="text-white"><i className="fas fa-paw pe-3"></i>My products</a>
                                    </li>
                                    <li className="mb-2">
                                        <a href="#!" className="text-white"><i className="fas fa-paw pe-3"></i>About us</a>
                                    </li>
                                </ul>
                            </div>
                            
                            <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
                                
                            </div>
                            
                            <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
                                <h5 className="text-uppercase mb-4">Contact</h5>

                                <ul className="list-unstyled">
                                    <li>
                                        
                                    </li>
                                    <li>
                                        <p><i className="fas fa-phone pe-2"></i>+91 7383655121</p>
                                    </li>
                                    <li>
                                        <p><i className="fas fa-envelope pe-2 mb-0"></i>sellzone14@gmail.com</p>
                                    </li>
                                </ul>
                            </div>
                            
                        </div>
                        
                    </div>
                    <div className="text-center p-3">
                        © 2023 Copyright:
                        <a className="text-white">Sell-Zone</a>
                    </div>
                    
                </footer>

            </div>
        </>
    );
}