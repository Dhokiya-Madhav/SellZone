import React from "react";
import { useState } from "react";
export default function SignUp() {
    const [usrName, setUserName] = useState("");
    const [u_email, setEmail] = useState("");
    const [psw, setPsw] = useState("");
    const [cpsw, csetPsw] = useState("");
    const [phone, setPhone] = useState("");
    const validate = (e) => {
        e.preventDefault();
        var check = 0;
        if (psw.length <= 5) {
            alert("Length of password should be greater than 6");
            check = 1;
        }
        if (psw != cpsw) {
            alert("Password not matched");
            check = 1;
        }
        if (phone.length != 10) {
            alert("Enter valid phone number");
            check = 1;
        }

        if (check == 0) 
        {
            fetch("http://localhost:5000/registerUser", {
                method: "POST",
                crossDomain: true,
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    "Access-Control-Allow-Origin": "*",
                },
                body: JSON.stringify({
                    username: usrName,
                    email: u_email,
                    password: psw,
                    mobileno: phone,
                }),
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log(data);
                    if (data.status === "ok") {
                        alert("Sign Up Successful");
                        window.location="http://localhost:3000/login";
                    } else if(data.error === "User Exists"){
                        alert("User already exists");
                    }
                });
        }
    };
    return (
        <>
            <section>
                <div className="mask d-flex align-items-center h-100 gradient-custom-3">
                    <div className="container">
                        <div className="row d-flex justify-content-center align-items-center h-100">
                            <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                                <div className="card">
                                    <div className="card-body p-5">
                                        <form onSubmit={validate}>
                                            <div className="form-outline mb-4">
                                                <label className="form-label" for="form3Example1cg">Username</label>
                                                <input type="text" id="form3Example1cg" onChange={(e) => setUserName(e.target.value)} className="form-control" required />
                                            </div>

                                            <div className="form-outline mb-4">
                                                <label className="form-label" for="form3Example3cg">Email Id</label>
                                                <input type="email" id="form3Example3cg" onChange={(e) => setEmail(e.target.value)} className="form-control" required />
                                            </div>

                                            <div className="form-outline mb-4">
                                                <label className="form-label" for="form3Example4cg">Password</label>
                                                <input type="password" id="form3Example4cg" onChange={(e) => setPsw(e.target.value)} className="form-control" required />

                                            </div>

                                            <div className="form-outline mb-4">
                                                <label className="form-label" for="form3Example4cdg">Confirm password</label>
                                                <input type="password" id="form3Example4cdg" onChange={(e) => csetPsw(e.target.value)} className="form-control" required />
                                            </div>

                                            <div className="form-outline mb-4">
                                                <label className="form-label" for="form3Example3cg">Phone No</label>
                                                <input type="number" id="form3Example3cg" className="form-control" onChange={(e) => setPhone(e.target.value)} required />
                                            </div>

                                            <div className="d-flex justify-content-center">
                                                <button type="Submit"
                                                    className="btn btn-danger btn-block text-white">Register</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}