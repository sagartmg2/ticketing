const express = require('express')
const mongoose = require('mongoose');
require('dotenv').config()
const user_route = require("./route/user")

const app = express()

app.use(express.json());
app.use(user_route)

var mongoDB = 'mongodb://localhost:27017/ticketing';
mongoose.connect(mongoDB, {useNewUrlParser: true});

app.use((req, res) => {
    res.status(404).send({
        data: "page not found"
    })
})


app.listen(process.env.PORT, () => {
    console.log("listening");
})


