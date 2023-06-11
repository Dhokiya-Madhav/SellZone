import React from "react";
import { useState } from "react";
export default function SignUp() {
    const [psw,setPsw] = useState("");
    const [cpsw,csetPsw] = useState("");
    const [phone,setPhone] = useState("");
    const validate = () =>{
        if(psw.length <= 5){
            alert("Length of password should be greater than 6");
        }
        if(psw != cpsw){
            alert("Password not matched");
        }
        if(phone.length != 10){
            alert("Enter valid phone number");
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
                                        <form>
                                            <div className="form-outline mb-4">
                                                <label className="form-label" for="form3Example1cg">Username</label>
                                                <input type="text" id="form3Example1cg" className="form-control" required/>
                                            </div>

                                            <div className="form-outline mb-4">
                                                <label className="form-label" for="form3Example3cg">Email Id</label>
                                                <input type="email" id="form3Example3cg" className="form-control" required />
                                            </div>

                                            <div className="form-outline mb-4">
                                                <label className="form-label" for="form3Example4cg">Password</label>
                                                <input type="password" id="form3Example4cg" onChange={(e) => setPsw(e.target.value)} className="form-control" required/>

                                            </div>

                                            <div className="form-outline mb-4">
                                                <label className="form-label" for="form3Example4cdg">Confirm password</label>
                                                <input type="password" id="form3Example4cdg" onChange={(e) => csetPsw(e.target.value)} className="form-control" required/>
                                            </div>

                                            <div className="form-outline mb-4">
                                                <label className="form-label" for="form3Example3cg">Phone No</label>
                                                <input type="number" id="form3Example3cg" className="form-control" onChange={(e) => setPhone(e.target.value)} required />
                                            </div>

                                            <div className="d-flex justify-content-center">
                                                <button type="submit"
                                                    className="btn btn-danger btn-block text-white" onClick={validate}>Register</button>
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