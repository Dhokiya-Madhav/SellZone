import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function UserSpecificProduct() {
    const [productData, setProductData] = useState([]);
    const uid = sessionStorage.getItem("userId");
    console.log(uid);
    useEffect(() => {
        fetch("http://localhost:5000/product/user/" + uid).then((response) => response.json())
            .then((data) => {
                setProductData(data);
                console.log(data);
            })
    }, []);

    var p_data = productData.map(
            (element) => {
                return (
                    <div className="col">
                        <div className="card">
                            <img src={element.img} style={{ height: 250, width: 280 }} className="card-img-top p-3 img-fluid" alt="..." />
                            <div className="card-body">
                                <h5 className="card-title">{element.product_title}</h5>
                                <p className="card-text">#{element.product_type}</p>
                                <p><Link to="/productUpdate" state={{ id: element._id }}><button className="btn btn-danger">Update product details</button></Link></p>
                            </div>
                            <div className="card-footer">
                                <small className="text-muted"><Link to="/productDetails" state={{ id: element._id }}><button className="btn btn-outline-danger">More details</button></Link></small>
                            </div>
                        </div>
                    </div>
                )
            })
        

    return (
        <>
            <br></br>
            <div className="row row-cols-1 row-cols-md-4 g-4">
                {p_data}
            </div>
        </>
    );
}