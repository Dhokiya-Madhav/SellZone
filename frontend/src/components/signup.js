import React from "react";
import { useState } from "react";
export default function SignUp() {
    const [usrName, setUserName] = useState("");
    const [usrNameErrorMsg, setUserNameErrorMsg] = useState("");
    const [u_email, setEmail] = useState("");
    const [emailErrorMsg, setEmailErrorMsg] = useState("");
    const [psw, setPsw] = useState("");
    const [passwordErrorMsg, setPasswordErrorMsg] = useState("");
    const [cpsw, csetPsw] = useState("");
    const [cnfPasswordErrorMsg, setCnfPasswordErrorMsg] = useState("");
    const [phone, setPhone] = useState("");
    const [phoneNumberErrorMsg, setPhoneNumberErrorMsg] = useState("");

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/;

    const userNameValidate = (e) => {
        const userName = e.target.value;
        setUserName(userName);
        if (userName.length < 4) {
            document.getElementById('userName').style.color='red';
            setUserNameErrorMsg("Username should be greater than 4 character")
        }
        else {
            document.getElementById('userName').style.color='green';
            setUserNameErrorMsg("");
        }
    }

    const emailValidate = (e) => {
        const emailId = e.target.value;
        setEmail(emailId);
        if (!emailRegex.test(emailId)) {
            document.getElementById('userEmail').style.color='red';
            setEmailErrorMsg("Invalid email address")
        }
        else {
            document.getElementById('userEmail').style.color='green';
            setEmailErrorMsg("");
        }
    }

    const passwordValidate = (e) => {
        const userPassword = e.target.value;
        setPsw(userPassword)
        if (!passwordRegex.test(userPassword)) {
            document.getElementById('userPassword').style.color='red';
            setPasswordErrorMsg(
                "Invalid password. It should be at least 6 characters long and include alphabets, numbers, and special characters."
            );
        }
        else {
            document.getElementById('userPassword').style.color='green';
            setPasswordErrorMsg("");
        }
    }

    const phoneNumberValidate = (e) => {
        const userPhoneNumber = e.target.value;
        setPhone(userPhoneNumber);
        if (userPhoneNumber.length != 10) {
            document.getElementById('userNumber').style.color='red';
            setPhoneNumberErrorMsg("Invalid phone number")
        }
        else {
            document.getElementById('userNumber').style.color='green';
            setPhoneNumberErrorMsg("");
        }
    }

    const passwordMatching = (e) => {
        const cnfPassword = e.target.value;
        csetPsw(cnfPassword);
        if (psw != cnfPassword) {
            document.getElementById('userCnfPassword').style.color='red';
            setCnfPasswordErrorMsg("Password does not match")
        } else {
            document.getElementById('userCnfPassword').style.color='green';
            setCnfPasswordErrorMsg("");
        }
    }

    const handleSignup = (e) => {
        e.preventDefault();
        if ((usrNameErrorMsg == "" && emailErrorMsg == "" && passwordErrorMsg == "" && cnfPasswordErrorMsg == "" && phoneNumberErrorMsg == "") && (usrName != "" && u_email != "" && psw != "" && cpsw != "" && phone != "")) {
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
                        window.location = "http://localhost:3000/login";
                    } else if (data.error === "User Exists") {
                        alert("User already exists");
                    }
                });
        }
    };
    return (
        <>
            <section>
                <div  className="mask d-flex align-items-center h-100 gradient-custom-3">
                    <div className="container">
                        <div className="row d-flex justify-content-center align-items-center h-100">
                            <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                                <div className="card text-white" style={{backgroundColor:'transparent'}}>
                                    <div className="card-body p-5">
                                        <form>
                                            <div className="form-outline mb-4">
                                                <label className="form-label" for="form3Example1cg">Username</label>
                                                <input type="text" style={{backgroundColor:'transparent'}} id="userName" onChange={userNameValidate} className="form-control" required />
                                                {usrNameErrorMsg && (
                                                    <div className="text-danger">{usrNameErrorMsg}</div>
                                                )}
                                            </div>

                                            <div className="form-outline mb-4">
                                                <label className="form-label" for="form3Example3cg">Email Id</label>
                                                <input type="email" style={{backgroundColor:'transparent'}} id="userEmail" onChange={emailValidate} className="form-control" required />
                                                {emailErrorMsg && (
                                                    <div className="text-danger">{emailErrorMsg}</div>
                                                )}
                                            </div>

                                            <div className="form-outline mb-4">
                                                <label className="form-label" for="form3Example4cg">Password</label>
                                                <input type="password" style={{backgroundColor:'transparent'}} id="userPassword" onChange={passwordValidate} className="form-control" required />
                                                {passwordErrorMsg && (
                                                    <div className="text-danger">{passwordErrorMsg}</div>
                                                )}
                                            </div>

                                            <div className="form-outline mb-4">
                                                <label className="form-label" for="form3Example4cdg">Confirm password</label>
                                                <input type="password" style={{backgroundColor:'transparent'}} id="userCnfPassword" onChange={passwordMatching} className="form-control" required />
                                                {cnfPasswordErrorMsg && (
                                                    <div className="text-danger">{cnfPasswordErrorMsg}</div>
                                                )}
                                            </div>

                                            <div className="form-outline mb-4">
                                                <label className="form-label" for="form3Example3cg">Phone No</label>
                                                <input type="number" style={{backgroundColor:'transparent'}} id="userNumber" className="form-control" onChange={phoneNumberValidate} required />
                                                {phoneNumberErrorMsg && (
                                                    <div className="text-danger">{phoneNumberErrorMsg}</div>
                                                )}
                                            </div>

                                            <div className="d-flex justify-content-center">
                                                <button type="Submit" onClick={handleSignup}
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