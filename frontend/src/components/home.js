import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Home() {
    const [productData, setProductData] = useState([]);
    useEffect(() => {
        fetch("http://localhost:5000/get-products").then((response) => response.json())
            .then((data) => {
                setProductData(data);
                console.log(productData);
            })
    }, []);

    const p_data = productData.map(
        (element)=>{
            return(
                <div className="col">
                    <div className="card h-100">
                        <img src={element.img}  className="card-img-top img-fluid" alt="..."/>
                            <div className="card-body">
                                <h5 className="card-title">{element.product_title}</h5>
                                <p className="card-text">#{element.product_type}</p>
                            </div>
                            <div className="card-footer">
                                <small className="text-muted"><Link to="/productDetails" state={{id:element._id}}><button className="btn btn-outline-danger">More details</button></Link></small>
                            </div>
                    </div>
                </div>
            )
        })
    return (
        <>
            <div className="row row-cols-1 row-cols-md-3 g-4">
                {p_data}
            </div>
        </>
    );
}