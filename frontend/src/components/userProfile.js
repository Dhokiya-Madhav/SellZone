import React, { useEffect, useState } from "react";
import profile from "../images/profile.png";
import { Link } from "react-router-dom";
export default function UserProfile() {
    const userName = sessionStorage.getItem("userName");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [psw, setPsw] = useState("");
    const [mobilenumber, setmobilenumber] = useState(0);
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
                    setmobilenumber(data.mobileno);
                })
        }
    }, []);

    const updateProfile = (e) => {
        e.preventDefault();

        fetch("http://localhost:5000/user-update/"+sessionStorage.getItem("userEmail"), {
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
            <div className="container">
                <div className="row">
                    <div className="col-md-6 text-center">
                        <img src={profile} className="img-fluid" /> <br></br>
                        <Link to="/sell"><button className="btn mt-4 btn-danger">Sell Product</button></Link>
                    </div>
                    <div className="col-md-6">
                        <br></br>
                        <form onSubmit={updateProfile}>
                            <b>Username :</b>
                            <input type="text" className="form-control" onChange={(e) => setUsername(e.target.value)} value={username} />

                            <b>Email :</b>
                            <input type="email" className="form-control" onChange={(e) => setEmail(e.target.value)} value={email} />

                            <b>Password :</b>
                            <input type="text" className="form-control" onChange={(e) => setPsw(e.target.value)} value={psw} />

                            <b>Phone no :</b>
                            <input type="number" className="form-control" onChange={(e) => setmobilenumber(e.target.value)} value={mobilenumber} />
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