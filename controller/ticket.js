const ticket = require("../model/ticket")
const Ticket = require("../model/ticket")
const fs = require("fs");

const mongoose = require("mongoose");


const index = async (req, res, next) => {
    let tickets;
    // console.log(req.role);
    // console.log(req.user._id); // in the string form 
    if (req.role == "customer") {
        tickets = await Ticket.find({ created_by: mongoose.Types.ObjectId(req.user._id) });
    } else if (req.role == "developer") {
        
        // created_by himself 
        // or 
        // assigned to  department where he is assigned 
        // console.log("user",req.user);
        let user_department_ids = req.user.department_ids
        console.log({user_department_ids});
        // return ;

        tickets = await Ticket.find({ $or: [{ created_by: mongoose.Types.ObjectId(req.user._id) }, { department_ids: { $in: user_department_ids } }] })


        // TODO:
        // Ticket.aggregate([
        //     {
        //         // $match:{ $or: [{ created_by: mongoose.Types.ObjectId(req.user._id) }, { department_ids: { $in: user_department_ids } }

        //     },
        //     {
        //         $lookup:{

        //         }
        //     }
            
        // ])









    } else {
        tickets = await Ticket.find({});
    }





    res.send(tickets)
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



const update = async (req, res, next) => {
    let { title, description, department_ids, status, priority, images } = req.body

    images = req.files.map(el => {
        return el.filename;
    })

    let updated_by = req.user._id;

    let ticket = await Ticket.findByIdAndUpdate(req.params.id, {
        title, description, department_ids, status, priority, images, updated_by
    }, { new: true })

    if (ticket) {
        res.send(ticket)
    }
}

const remove = (req, res, next) => {

    Ticket.findByIdAndDelete(req.params.id, (err, data) => {

        if (err) return next(err)

        data.images.forEach(el => {
            fs.unlink(`uploads/${el}`, (err, data) => {

            })

        })




        return res.send({
            data: "removed"
        })



    });
    // console.log(req.params.id)
    // console.log(req.query)

    // res.send("remove")
}

module.exports = {
    index, store, update, remove
}














