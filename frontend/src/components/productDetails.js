import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import profileIcon from '../images/profile.png';
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
            getUserData();
            
    }, []);
    uid = singleProduct.userId;
    //console.log(uid);
    
    const getUserData = () => {
        
        fetch("http://localhost:5000/owner/"+uid).then((response) => response.json())
            .then((data) => {
                setUserData(data);
                //console.log(data);
            })
    }
    
    return (
        <>
            
            <br></br>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12 text-center">
                        <img src={singleProduct.img} className="img-fluid" />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-10 fs-1">
                        {singleProduct.product_title}
                        <div className="fs-6">#{singleProduct.product_type}</div>

                        Current Owner Details:
                        <div className="row fs-4 bg-danger">
                            <div className="col-2  bg-light">
                                <img src={profileIcon} height={30} />
                                {userData.username}
                            </div>

                            <div className="col-2 bg-light">
                            </div>

                            <div className="col-2 bg-light">
                                Contact :
                            </div>

                            <div className="col-2 bg-light">
                            </div>

                            <div className="col-2 bg-light">
                                hi
                            </div>
                        </div>

                        Description : <hr></hr>
                        {singleProduct.product_desc}
                    </div>

                    <div className="col-2">
                        <div className="fs-2"><b>&#8377;{singleProduct.product_price}</b></div>
                        <button className="btn btn-success">Make offer</button>
                    </div>
                </div>
            </div>
        </>
    );
}