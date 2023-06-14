import React, { useEffect, useState } from "react";

export default function SellProduct() {
    const [mobilenumber, setmobilenumber] = useState(0);
    useEffect(() => {
        let useremail = sessionStorage.getItem("userEmail");
        fetch("http://localhost:5000/user/" + useremail).then((response) => response.json())
            .then((data) => {
                setmobilenumber(data.mobileno);
            })
    }, []);
    return (
        <>

            <form>
                <div className="container">
                    <div className="row">

                        <div className="col-md-6">
                            Image 1:
                            <input type="file" className="form-control" required />

                            Image 2:
                            <input type="file" className="form-control" required />

                            Image 3:
                            <input type="file" className="form-control" required />

                            Image 4:
                            <input type="file" className="mb-2 form-control" required />

                            <b>State :</b>
                            <select id="statesDropdown" className="form-control">
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
                            <input type="text" className="form-control" required />

                            <button type="button" className="mt-2 btn btn-danger" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                                Verify Account
                            </button>


                            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                                <div className="modal-dialog">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title" id="staticBackdropLabel">Verification</h5>
                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div className="modal-body">
                                            Phone Number :
                                            <input type="number" className="form-control mb-2" value={mobilenumber} />
                                            OTP :
                                            <input type="number" className="form-control"/>
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Verify</button>
                                            <button type="button" className="btn btn-warning">Send OTP</button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div className="col-md-6">
                            <b>Product Title :</b>
                            <input type="text" className="form-control mb-2" required />
                            <b>Product Description : </b><br></br>
                            <b><i className="text-danger">Note : Enter valuable product description</i></b>
                            <textarea className="form-control"></textarea>
                            Include condition, features etc.
                            <br></br>
                            <b><div className="mt-2">Product Type :</div></b>
                            <select name="Product-Type" className="mb-2 form-control">
                                <option value="Electronics">Electronics</option>
                                <option value="Electronics">Furniture</option>
                                <option value="Electronics">Sports</option>
                                <option value="Electronics">Home Decor</option>
                                <option value="Electronics">Vehicle</option>
                                <option value="Electronics">Fashion</option>
                                <option value="Electronics">Musical Instruments</option>
                                <option value="Electronics">Books</option>
                            </select>

                            <b>Product Price (Rs):</b>
                            <input type="number" className="form-control" />

                            <button className="btn btn-danger mt-2">Post</button>
                        </div>
                    </div>
                </div>
            </form>
        </>
    );
}