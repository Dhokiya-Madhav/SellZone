import React, { useEffect, useState } from "react";

export default function SellProduct() {
    const [mobilenumber, setmobilenumber] = useState(0);
    const [usrId, setUsrId] = useState("");

    const getInitialState = () => {
        const value = "Electronics";
        return value;
    };

    const getInitialStateStates = () => {
        const value = "Andhra Pradesh";
        return value;
    };
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [type, setType] = useState(getInitialState);
    const [price, setPrice] = useState(0);
    const [state, setState] = useState(getInitialStateStates);
    const [city, setCity] = useState("");
    const [image, setImage] = useState("");

    const handleChangePtype = (e) => {
        setType(e.target.value);
    }

    const handleChangeState = (e) => {
        setState(e.target.value);
    }
    useEffect(() => {
        let useremail = sessionStorage.getItem("userEmail");
        fetch("http://localhost:5000/user/" + useremail).then((response) => response.json())
            .then((data) => {
                setmobilenumber(data.mobileno);
                setUsrId(data._id);

            })
    }, []);

    function convertToBase64(e) {
        var reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = () => {
            setImage(reader.result);
        };
        reader.onerror = error => {
            console.log(error);
        }
    }

    function postProduct() {
        fetch("http://localhost:5000/post-product", {
            method: "POST",
            crossDomain: true,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({
                userId: usrId,
                product_title: title,
                product_desc: desc,
                product_type: type,
                product_price: price,
                state: state,
                city: city,
                img: image,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                if (data.status === "ok") {
                    alert("Product posted");
                }
                else { alert("Error occured") }
            });
    }
    return (
        <>
            <div className="container text-white">
                <div className="row">

                    <div className="col-md-6">
                        <b>Image :</b>
                        <input type="file" accept="image/*" style={{backgroundColor:'transparent'}} onChange={convertToBase64} className="form-control mb-2 text-white" required />
                        <b>State :</b>
                        <select id="statesDropdown" value={state} style={{backgroundColor:'transparent'}} onChange={handleChangeState} className="form-control">
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

                        <b><div className="mt-2">City :</div></b>
                        <input type="text" style={{backgroundColor:'transparent'}} onChange={(e) => setCity(e.target.value)} className="form-control text-white" required />


                    </div>

                    <div className="col-md-6">
                        <b>Product Title :</b>
                        <input type="text" style={{backgroundColor:'transparent'}} onChange={(e) => setTitle(e.target.value)} className="form-control mb-2 text-white" required />
                        <b>Product Description : </b><br></br>
                        <b><i className="text-danger">Note : Enter valuable product description</i></b> <br></br>
                        <b><i className="text-danger">Enter features comma seperated.</i></b>
                        <textarea className="form-control text-white" style={{backgroundColor:'transparent'}} onChange={(e) => setDesc(e.target.value)}></textarea>
                        Include condition, features etc.
                        <br></br>
                        <b><div className="mt-2">Product Type :</div></b>
                        <select name="Product-Type" style={{backgroundColor:'transparent'}} value={type} onChange={handleChangePtype} className="mb-2 form-control">
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

                        <b>Product Price (Rs):</b>
                        <input type="number" style={{backgroundColor:'transparent'}} onChange={(e) => setPrice(e.target.value)} className="form-control text-white" />

                        <button className="btn btn-danger mt-2" onClick={postProduct}>Post</button>
                    </div>
                </div>
            </div>

        </>
    );
}