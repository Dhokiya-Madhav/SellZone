const express = require('express');
const mongoose = require("mongoose");
var bodyParser = require('body-parser');
var fs = require('fs');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

var multer = require('multer');

const port = 5000;
const cors = require("cors");
app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const uri = "mongodb+srv://madhav:Madhav777@cluster0.3tdc3nr.mongodb.net/SellZone?retryWrites=true&w=majority";

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});
var upload = multer({ storage: storage });

const { user } = require("./models/user.js")
const { product } = require("./models/productDetails.js");



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
            const oldUser1 = await user.findOne({ mobileno });

            if (oldUser && oldUser1) {
                return res.send({ error: "User Exists" });
            } else if (oldUser) {
                return res.send({ error: "User Exists" });
            }
            else if (oldUser1) {
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

    app.post('/post-product', upload.single('image'), (req, res, next) => {

        var obj = {
            userId: req.body,
            product_title: req.body,
            product_desc: req.body,
            product_type: req.body,
            product_price: req.body,
            state: req.body,
            city: req.body,
            img1: {
                data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
                contentType: 'image/png'
            },
            img2: {
                data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
                contentType: 'image/png'
            },
            img3: {
                data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
                contentType: 'image/png'
            },
            img4: {
                data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
                contentType: 'image/png'
            }
        }
        product.create(obj)
            .then((err, item) => {
                if (err) {
                    console.log(err);
                }
                else {
                    // item.save();
                    
                }
            });
    });


}

app.listen(port, () => {
    console.log(`Now listening on port ${port}`);
});