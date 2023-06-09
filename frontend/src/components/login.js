import React from "react";

export default function Login() {
    return (
        <>
            <br></br>
            <center>
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <input type="email" className="form-control w-50" placeholder="Enter email..."/>
                        </div>
                    </div>
                    <br></br>
                    <div className="row">
                        <div className="col-12">
                            <input type="password" className="form-control w-50" placeholder="Enter password..."/>
                        </div>
                    </div>
                    <br></br>
                    <div className="row">
                        <div className="col-12">
                            <button type="Submit" className="btn btn-danger">Login</button>
                        </div>
                    </div>
                </div>
            </center>
        </>
    );
}