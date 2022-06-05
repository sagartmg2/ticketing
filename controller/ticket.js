const ticket = require("../model/ticket")
const Ticket = require("../model/ticket")


const index = (req, res, next) => {
    res.send("index")
}

const store = async (req, res, next) => {

    let { title, description, department_ids, status, priority, images } = req.body

    console.log(req.files)

    images = req.files.map( el => {
        return el.filename;
    })

    let tickets = await Ticket.create({
        title, description, department_ids, status, priority, images
    })
    if (tickets) {
        res.send(tickets)
    }

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














