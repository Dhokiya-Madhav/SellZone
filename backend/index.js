const { MongoClient, ServerApiVersion } = require('mongodb');

const express = require('express');
const app = express();
const port = 5000;

const uri = "mongodb+srv://madhav:Madhav777@cluster0.3tdc3nr.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});
async function run() {
    try {
        await client.connect();
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        await client.close();
    }
}
run().catch(console.dir);

app.listen(port, () => {
    console.log(`Now listening on port ${port}`);
});