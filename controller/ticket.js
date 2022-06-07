const ticket = require("../model/ticket")
const Ticket = require("../model/ticket")


const index = (req, res, next) => {
    res.send("index")
}

const store = async (req, res, next) => {

    let { title, description, department_ids, status, priority, images } = req.body

    images = req.files.map(el => {
        return el.filename;
    })

    let created_by = req.user._id;

    let tickets = await Ticket.create({
        title, description, department_ids, status, priority, images, created_by
    })

    if (tickets) {
        res.send(tickets)
    }

}



const update = (req, res, next) => {
    res.send("update")
}

const remove = (req, res, next) => {

    console.log(req.body);
    Ticket.findByIdAndDelete(req.params.id,(err,data) => {

        if(err)return next(err)

        // TODO: delete images from system
        return res.send({
            data:"removed"
        })



    });
    // console.log(req.params.id)
    // console.log(req.query)

    // res.send("remove")
}

module.exports = {
    index, store, update, remove
}














