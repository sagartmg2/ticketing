const express = require('express')
const path = require("path")

const router = express.Router();

const ticket_controller = require("../controller/ticket")
const mongoose = require('mongoose');


const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;


const multer = require('multer');
const Ticket = require('../model/ticket');
// const upload = multer({ dest: 'uploads/' })

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname))
    }
})

const upload = multer({ storage: storage })

const checkRole = (req, res, next) => {
    if (req.role === "customer") {
        req.body.department_ids = []
        req.body.priority = "low"
        req.body.status = "pending"
    }
    next();
}

/* 
    // executation task 
    @parms 
    @return void
*/

const forbidAlteration = async (req, res, next) => {
    if (req.role === "customer") {
        return res.status(403).send({
            data: "Forbidden"
        })
    } else if (req.role === "developer") {
        /* block if tries to delete others ticket */

        let ticket = await Ticket.findById(req.params.id)

        if (ticket.created_by != req.user._id && req.method == "DELETE") {
            return res.status(403).send({
                data: "Forbidden"
            })
        } else {

            // should be able to acess if tickets.department_ids has its deparment

            let user_dept_ids = req.user.department_ids;
            // let ticket_dept_ids = ticket.department_ids.map(String);
            let ticket_dept_ids = ticket.department_ids.map(el => el.toString());


            console.log(ticket_dept_ids); // [ '6298972e01e42754cd2956d1', '6298972e01e42754cd2956d0' ]
            console.log(user_dept_ids); // [ '6298972e01e42754cd2956d1' ]

            // let status = ticket_dept_ids.some(el => {
            //     return user_dept_ids.includes(el)
            // })

            // user_dept_ids= [ ObjectId('6298972e01e42754cd2956d1') ]
            // db.tickets.find({_id:ObjectId("")department_ids:{$in:user_dept_ids}}).count();

            let response = await Ticket.findOne({ _id: mongoose.Types.ObjectId(req.params.id), department_ids: { $in: [mongoose.Types.ObjectId('6298972e01e42754cd2956d1')] } })

            // console.log(status);
            if (!response) {
                // if (!status) {
                return res.status(403).send({
                    data: {},
                    msg: "Forbidden"
                })
            }
        }
        next()
    } else {
        next();
    }
}

router.get("", ticket_controller.index)
router.post("", upload.array('photos', 12), checkRole, ticket_controller.store)
router.put("/:id", upload.array('photos', 12), checkRole, forbidAlteration, ticket_controller.update)
router.delete("/:id", forbidAlteration, ticket_controller.remove)

module.exports = router

