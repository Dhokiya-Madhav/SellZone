import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import profileIcon from '../images/profile.png';
import phoneIcon from '../images/phone.png';
import locationIcon from '../images/location.png';
export default function ProductDetails() {
    const location = useLocation();
    const [singleProduct, setSingleProduct] = useState([]);
    const [userData, setUserData] = useState([]);
    var uid;
    useEffect(() => {
        fetch("http://localhost:5000/product/" + location.state.id).then((response) => response.json())
            .then((data) => {
                setSingleProduct(data);
            })
    }, []);
    uid = singleProduct.userId;
    const getUserData = (uid) => {
        fetch("http://localhost:5000/owner/" + uid).then((response) => response.json())
            .then((data) => {
                setUserData(data);
            })
    }
    getUserData(uid);
    return (
        <>
            <br></br>
            <div className="container-fluid text-white">
                <div className="row">
                    <div className="col-md-12 text-center">
                        <img src={singleProduct.img} className="img-fluid" />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-10 fs-3">
                        {singleProduct.product_title}
                        <div className="fs-6">#{singleProduct.product_type}</div>
                        <hr></hr>

                        Current Owner Details:
                        <div className="row fs-4">
                            <div className="col-md-2">
                                <img src={profileIcon}  className="me-2" height={30} />
                                {userData.username}
                            </div>

                            <div className="col-2">
                            </div>

                            <div className="col-md-3">
                                <img src={phoneIcon} style={{backgroundColor:'transparent'}} className="me-2" height={30} />
                                {userData.mobileno}
                            </div>

                            <div className="col-2">
                            </div>

                            <div className="col-md-2">
                                <img src={locationIcon} className="me-2" height={30} />
                                {singleProduct.state} <br></br>
                                <div className="fs-5 ms-4">{singleProduct.city}</div>
                            </div>
                        </div>
                        <hr></hr>
                        Description : <br></br>
                        <div className="fs-4">{singleProduct.product_desc}</div>
                    </div>

                    <div className="col-2">
                        <div className="fs-2"><b>&#8377;{singleProduct.product_price}</b></div>
                        <button className="btn btn-danger">Make a bid</button>
                    </div>
                </div>
            </div>
        </>
    );
}