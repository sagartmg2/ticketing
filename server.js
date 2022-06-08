const express = require('express')
const mongoose = require('mongoose');
require('dotenv').config()
const user_route = require("./route/user")
const ticket_route = require("./route/ticket");
const authentication = require('./middleware/authentication');

const app = express()

// global middleware
app.use(express.json());
app.use(express.static('uploads'))

app.use("/api/users", user_route)
app.use("/api/tickets",authentication,ticket_route)

var mongoDB = 'mongodb://localhost:27017/ticketing';
mongoose.connect(mongoDB, { useNewUrlParser: true });

app.use((req, res) => {
    res.status(404).send({
        data: "page not found"
    })
})

app.use((err, req, res, next) => {
    res.status(500).send({
        data: "Server Error",
        error: err,
        msg: err.message
    })
})

app.listen(process.env.PORT, () => {
    console.log("listening");
})


