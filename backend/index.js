const express = require('express');
const mongoose = require("mongoose");
var bodyParser = require('body-parser');
var fs = require('fs');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');



app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json({ limit: '50mb' }));

const port = 5000;
const cors = require("cors");
app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const uri = "mongodb+srv://madhav:Madhav777@cluster0.3tdc3nr.mongodb.net/SellZone?retryWrites=true&w=majority";


const { user } = require("./models/user.js")
const { product } = require("./models/productDetails.js");
const { log } = require('console');



// transporter.sendMail(mailOptions, function (error, info) {


mongoose.connect(

    "mongodb+srv://madhav:Madhav777@cluster0.3tdc3nr.mongodb.net/SellZone",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
);

var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", mongoConnected);

function mongoConnected() {
    console.log("Database connected");

    app.post("/registerUser", async (req, res) => {
        const { username, email, password, mobileno } = req.body;

        try {
            const oldUser = await user.findOne({ email });

            if (oldUser) {
                return res.send({ error: "User Exists" });
            }
            await user.create({
                username,
                email,
                password,
                mobileno,
            });
            res.send({ status: "ok" });
        } catch (error) {
            console.log(error);
            res.send({ status: "error" });
        }
    });

    app.post("/login-user", async (req, res) => {
        try {
            const { email, password } = req.body;

            const userCheck = await user.findOne({ email, password });
            if (!userCheck) {
                return res.send({ error: "Invalid credentials" });
            }
            //res.send({ status: "ok" });
            return res.json({
                status: "ok",
                data: {
                    email: email,
                },
            });
        }
        catch (error) {
            console.log(error);
        }
    });

    app.get("/user/:email", (req, res) => {
        user.findOne({ email: req.params.email }, (err, users) => {

            if (err) {
                return res.status(400).json({ status: "error", error: err });
            }
            if (users) {
                return res.status(200).json(users);
            }
            else {
                return res.json({ status: "error", error: "User not found" });
            }
        }).clone();
    });

    app.get("/owner/:id", (req, res) => {
        user.find({ _id: req.params.id }, (err, users) => {
            if (err) {
                return res.status(400).json({ status: "error", error: err });
            }
            return res.status(200).json(users[0]);
        }).clone();
    });

    app.post("/filter", (req, res) => {
        const { type, state, price } = req.body;
        console.log(type, state, price);
        var min, max;
        if (price == "1000-5000") {
            min = 1000;
            max = 5000;
        }
        else if (price == "5000-10000") {
            min = 5000;
            max = 10000;
        }
        else if (price == "10000-20000") {
            min = 10000;
            max = 20000;
        }
        else if (price == "10000-20000") {
            min = 10000;
            max = 20000;
        }
        else if (price == "20000-50000") {
            min = 20000;
            max = 50000;
        }
        else if (price == "50000+") {
            min = 50000;
            product.find({ $and: [{ product_type: type }, { state: state }, { product_price: { $gte: min } }] }, (err, prod) => {
                if (err) {
                    return res.status(400).json({ status: "error", error: err });
                }
                if (prod) {
                    return res.status(200).json(prod);
                    //console.log(prod);
                }
                else {
                    return res.json({ status: "error", error: "Product not found" });
                }
            }).clone();
        }
        product.find({ $and: [{ product_type: type }, { state: state }, { product_price: { $gte: min, $lt: max } }] }, (err, prod) => {
            if (err) {
                return res.status(400).json({ status: "error", error: err });
            }
            if (prod) {
                return res.status(200).json(prod);
                //console.log(prod);
            }
            else {
                return res.json({ status: "error", error: "Product not found" });
            }
        }).clone();
    });

    app.put("/user-update/:email", async (req, res) => {
        const { username, email, password, mobileno } = req.body;

        try {
            const result = await user.updateOne(
                { email: req.params.email },
                { $set: { username: username, email: email, password: password, mobileno: mobileno } }
            );
            return res.json({ status: "User updated", data: result });
        } catch (error) {
            console.log(error);
            res.json({ status: "error", error: error });
        }
    });

    app.put("/product-update/:id", async (req, res) => {
        const { userId,
            product_title,
            product_desc,
            product_type,
            product_price,
            state,
            city,
            img } = req.body;

        try {
            const result = await product.updateOne(
                { _id: req.params.id },
                { $set: { userId: userId, product_title: product_title, product_desc: product_desc, product_type: product_type, product_price: product_price, state: state, city: city, img: img } }
            );
            return res.json({ status: "Product updated", data: result });
        } catch (error) {
            console.log(error);
            res.json({ status: "error", error: error });
        }
    });

    app.delete('/delete/product/:id', (req, res) => {
        const itemId = req.params.id;

        product.findByIdAndRemove(itemId, (err, deletedItem) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ message: 'Error deleting item' });
            }

            if (!deletedItem) {
                return res.status(404).json({ message: 'Item not found' });
            }

            res.json({ message: 'Item deleted successfully' });
        });
    });

    app.post("/post-product", async (req, res) => {
        try {
            const { userId, product_title, product_desc, product_type, product_price, state, city, img } = req.body;
            await product.create({
                userId,
                product_title,
                product_desc,
                product_type,
                product_price,
                state,
                city,
                img,
            });
            res.send({ status: "ok" });
        }
        catch (error) {
            console.log(error);
        }
    });

    app.get("/get-products", (req, res) => {

        product.find({}, { _id: 1, __v: 0 }, (err, prod) => {
            if (err) {
                return res.status(400).json({ error: err });
            }
            if (prod && prod.length == 0) {
                return res.status(400).json({ error: "No records found!" });
            }
            return res.status(200).json(prod);
        }).clone();

    })

    app.get("/product/:id", (req, res) => {
        product.findOne({ _id: req.params.id }, (err, prod) => {

            if (err) {
                return res.status(400).json({ status: "error", error: err });
            }
            if (prod) {
                return res.status(200).json(prod);
            }
            else {
                return res.json({ status: "error", error: "Product not found" });
            }
        }).clone();
    });

    app.get("/product/user/:uid", (req, res) => {
        product.find({ userId: req.params.uid }, (err, prod) => {
            if (err) {
                return res.status(400).json({ status: "error", error: err });
            }
            if (prod) {
                return res.status(200).json(prod);
            }
            else {
                return res.json({ status: "error", error: "Product not found" });
            }
        }).clone();
    });
}

app.listen(port, () => {
    console.log(`Now listening on port ${port}`);
});