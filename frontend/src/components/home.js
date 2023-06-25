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
                    <div className="card">
                        <img src={element.img} style={{ height: 250, width: 280 }} className="card-img-top p-3 img-fluid" alt="..." />
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

            <button type="button" className="btn mb-2 ms-2 btn-outline-danger" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Filters
            </button>

            <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-xl">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Apply filters</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col-md-2">
                                        <select name="Product-Type" value={type} onChange={handleChangePtype} className="mb-2">
                                            <option value="Electronics">Electronics</option>
                                            <option value="Furniture">Furniture</option>
                                            <option value="Sports">Sports</option>
                                            <option value="Home Decor">Home Decor</option>
                                            <option value="Vehicle">Vehicle</option>
                                            <option value="Fashion">Fashion</option>
                                            <option value="Musical Instruments">Musical Instruments</option>
                                            <option value="Books">Books</option>
                                            <option value="Other">Other</option>
                                        </select>
                                    </div>

                                    <div className="col-md-2">
                                        <select id="statesDropdown" value={state} onChange={handleChangeState} className="mb-2" style={{width:150}}>
                                            <option value="" disabled selected>Select a state</option>
                                            <option value="Andhra Pradesh">Andhra Pradesh</option>
                                            <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                                            <option value="Assam">Assam</option>
                                            <option value="Bihar">Bihar</option>
                                            <option value="Chhattisgarh">Chhattisgarh</option>
                                            <option value="Goa">Goa</option>
                                            <option value="Gujarat">Gujarat</option>
                                            <option value="Haryana">Haryana</option>
                                            <option value="Himachal Pradesh">Himachal Pradesh</option>
                                            <option value="Jharkhand">Jharkhand</option>
                                            <option value="Karnataka">Karnataka</option>
                                            <option value="Kerala">Kerala</option>
                                            <option value="Madhya Pradesh">Madhya Pradesh</option>
                                            <option value="Maharashtra">Maharashtra</option>
                                            <option value="Manipur">Manipur</option>
                                            <option value="Meghalaya">Meghalaya</option>
                                            <option value="Mizoram">Mizoram</option>
                                            <option value="Nagaland">Nagaland</option>
                                            <option value="Odisha">Odisha</option>
                                            <option value="Punjab">Punjab</option>
                                            <option value="Rajasthan">Rajasthan</option>
                                            <option value="Sikkim">Sikkim</option>
                                            <option value="Tamil Nadu">Tamil Nadu</option>
                                            <option value="Telangana">Telangana</option>
                                            <option value="Tripura">Tripura</option>
                                            <option value="Uttar Pradesh">Uttar Pradesh</option>
                                            <option value="Uttarakhand">Uttarakhand</option>
                                            <option value="West Bengal">West Bengal</option>
                                            <option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option>
                                            <option value="Chandigarh">Chandigarh</option>
                                            <option value="Dadra and Nagar Haveli">Dadra and Nagar Haveli</option>
                                            <option value="Daman and Diu">Daman and Diu</option>
                                            <option value="Delhi">Delhi</option>
                                            <option value="Lakshadweep">Lakshadweep</option>
                                            <option value="Puducherry">Puducherry</option>
                                        </select>
                                    </div>
                                    <div className="col-md-2">
                                        <select name="price-range" value={priceRange} onChange={handleChangePriceRange}>
                                            <option value="1000-5000">1000-5000 Rs</option>
                                            <option value="5000-10000">5000-10000 Rs</option>
                                            <option value="10000-20000">10000-20000 Rs</option>
                                            <option value="20000-50000">20000-50000 Rs</option>
                                            <option value="50000+">50000+ Rs</option>
                                        </select>
                                    </div>
                                    <div className="col-md-1">
                                        {size}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary">Apply filters</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row row-cols-1 row-cols-md-4 g-4">
                {p_data}
            </div>
        </>
    );
}