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

    const getInitialState = () => {
        const value = "Electronics";
        return value;
    };

    const getInitialSize = () => {
        const value = "M";
        return value;
    };

    const getInitialStateStates = () => {
        const value = "Andhra Pradesh";
        return value;
    };

    const getInitialStatePrice = () => {
        const value = "1000-5000 Rs";
        return value;
    };

    const [state, setState] = useState(getInitialStateStates);
    const [type, setType] = useState(getInitialState);
    const [siz, setSize] = useState(getInitialSize);
    const [priceRange, setRange] = useState(getInitialStatePrice);

    const handleChangePtype = (e) => {
        setType(e.target.value);
    }
    const handleChangeState = (e) => {
        setState(e.target.value);
    }
    const handleChangeSize = (e) => {
        setSize(e.target.value);
    }
    const handleChangePriceRange = (e) => {
        setRange(e.target.value);
    }
    var size;
    if (type == "Fashion") {
        size = <select name="Size" value={siz} onChange={handleChangeSize} className="">
            <option value="M">M</option>
            <option value="L">L</option>
            <option value="XL">XL</option>
            <option value="XXL">XXL</option>
            <option value="XXXL">XXXL</option>
        </select>;
    }
    const p_data = productData.map(
        (element) => {
            return (
                <div className="col">
                    <div className="card border border-1 border-success text-white" style={{backgroundColor:'transparent'}}>
                        <img src={element.img} className="card-img-top p-3 img-fluid" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title">{element.product_title}</h5>
                            <p className="card-text">#{element.product_type}</p>
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