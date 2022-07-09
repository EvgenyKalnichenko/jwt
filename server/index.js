require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const router = require('./router/index');
const mongoose = require('mongoose');
const { MongoClient, ServerApiVersion } = require('mongodb');

const PORT = process.env?.PORT || 5000;
const DB_URL = process.env?.DB_URL

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use('/api', router);

const start = async () => {
    try {
        // const client = new MongoClient(process.env?.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
        await mongoose.connect(DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        },() => {
            console.log('mongoose')
        });
        app.listen(PORT,  () => {
            console.log(`Server started on localhost:${PORT}`)
        })
        // await client.connect(err => {
        //     const collection = client.db("test").collection("devices");
        //     console.error(err, collection)
        //     // perform actions on the collection object
        //     client.close();
        // });

    } catch (e) {
        console.error(e)
    }
}

start()
