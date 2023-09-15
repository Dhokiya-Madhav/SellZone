import React, { useEffect, useState } from "react";
import profile from "../images/profile.png";
import { Link } from "react-router-dom";
export default function UserProfile() {
    const userName = sessionStorage.getItem("userName");
    const [username, setUsername] = useState("");
    const [usrNameErrorMsg, setUserNameErrorMsg] = useState("");
    const [email, setEmail] = useState("");
    const [emailErrorMsg, setEmailErrorMsg] = useState("");
    const [psw, setPsw] = useState("");
    const [passwordErrorMsg, setPasswordErrorMsg] = useState("");
    const [mobilenumber, setMobileNumber] = useState(0);
    const [phoneNumberErrorMsg, setPhoneNumberErrorMsg] = useState("");

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/;

    const userNameValidate = (e) => {
        const userName = e.target.value;
        setUsername(userName);
        if (userName.length < 4) {
            document.getElementById('userName').style.color = 'red';
            setUserNameErrorMsg("Username should be greater than 4 character")
        }
        else {
            document.getElementById('userName').style.color = 'green';
            setUserNameErrorMsg("");
        }
    }

    const emailValidate = (e) => {
        const emailId = e.target.value;
        setEmail(emailId);
        if (!emailRegex.test(emailId)) {
            document.getElementById('userEmail').style.color = 'red';
            setEmailErrorMsg("Invalid email address")
        }
        else {
            document.getElementById('userEmail').style.color = 'green';
            setEmailErrorMsg("");
        }
    }

    const passwordValidate = (e) => {
        const userPassword = e.target.value;
        setPsw(userPassword)
        if (!passwordRegex.test(userPassword)) {
            document.getElementById('userPassword').style.color = 'red';
            setPasswordErrorMsg(
                "Invalid password. It should be at least 6 characters long and include alphabets, numbers, and special characters."
            );
        }
        else {
            document.getElementById('userPassword').style.color = 'green';
            setPasswordErrorMsg("");
        }
    }

    const phoneNumberValidate = (e) => {
        const userPhoneNumber = e.target.value;
        setMobileNumber(userPhoneNumber);
        if (userPhoneNumber.length != 10) {
            document.getElementById('userNumber').style.color = 'red';
            setPhoneNumberErrorMsg("Invalid phone number")
        }
        else {
            document.getElementById('userNumber').style.color = 'green';
            setPhoneNumberErrorMsg("");
        }
    }
    useEffect(() => {
        if (userName == null || userName == undefined) {
            window.location = "http://localhost:3000/";
        } else {
            let useremail = sessionStorage.getItem("userEmail");
            fetch("http://localhost:5000/user/" + useremail).then((response) => response.json())
                .then((data) => {
                    console.log(data);
                    setUsername(data.username);
                    setEmail(data.email);
                    setPsw(data.password);
                    setMobileNumber(data.mobileno);
                })
        }
    }, []);

    const updateProfile = (e) => {
        e.preventDefault();

        fetch("http://localhost:5000/user-update/" + sessionStorage.getItem("userEmail"), {
            method: "put",
            crossDomain: true,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({
                username: username,
                email: email,
                password: psw,
                mobileno: mobilenumber,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                if (data.data.modifiedCount >= 1) {
                    alert("Profile Updated Successfully..");
                } else {
                    alert("Error occured try again");
                }
            });
    }
    return (
        <>
            <br></br>
            <div className="container text-white">
                <div className="row">
                    <div className="col-md-6 text-center">
                        <img src={profile} className="img-fluid" /> <br></br>
                        <Link to="/sell"><button className="btn mt-4 btn-danger">Sell Product</button></Link>
                    </div>
                    <div className="col-md-6">
                        <br></br>
                        <form onSubmit={updateProfile}>
                            <b>Username :</b>
                            <input type="text" id="userName" className="form-control" onChange={userNameValidate} value={username} />
                            {usrNameErrorMsg && (
                                <div className="text-danger">{usrNameErrorMsg}</div>
                            )}
                            <b>Email :</b>
                            <input type="email" id="userEmail" className="form-control" onChange={emailValidate} value={email} />
                            {emailErrorMsg && (
                                <div className="text-danger">{emailErrorMsg}</div>
                            )}
                            <b>Password :</b>
                            <input type="text" id="userPassword" className="form-control" onChange={passwordValidate} value={psw} />
                            {passwordErrorMsg && (
                                <div className="text-danger">{passwordErrorMsg}</div>
                            )}
                            <b>Phone no :</b>
                            <input type="number" id="userNumber" className="form-control" onChange={phoneNumberValidate} value={mobilenumber} />
                            {phoneNumberErrorMsg && (
                                <div className="text-danger">{phoneNumberErrorMsg}</div>
                            )}
                            <br></br>
                            <button type="Submit" className="btn btn-outline-danger">Update Profile</button>
                            <Link to="/sp"><button className="btn ms-2 btn-outline-danger">Posted products</button></Link>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}