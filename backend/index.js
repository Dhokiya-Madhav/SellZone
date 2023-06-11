const express = require('express');
const mongoose = require("mongoose");
const app = express();
const port = 5000;
const cors = require("cors");
app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use(cors());

const uri = "mongodb+srv://madhav:Madhav777@cluster0.3tdc3nr.mongodb.net/SellZone?retryWrites=true&w=majority";


const { user } = require("./models/user.js")

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

function mongoConnected(){
    console.log("Database connected");

    app.post("/registerUser", async (req, res) => {
        const { username, email, password, mobileno} = req.body;

        try {
            const oldUser = await user.findOne({ email });
            const oldUser1 = await user.findOne({ mobileno });

            if (oldUser && oldUser1) {
                return res.json({ error: "User Exists" });
            }else if(oldUser){
                return res.json({ error: "User Exists" });
            }
            else if(oldUser1){
                return res.json({ error: "User Exists" });
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
}

app.listen(port, () => {
    console.log(`Now listening on port ${port}`);
});