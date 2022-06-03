const Ticket = require("../model/ticket")


const index = (req, res, next) => {
    res.send("index")
}

const store = (req, res, next) => {
    // Ticket.create()
    res.send("store")
}

const update = (req, res, next) => {
    res.send("update")
}

const remove = (req, res, next) => {
    res.send("remove")
}

module.exports = {
    index, store, update, remove
}














