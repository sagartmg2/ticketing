const express = require('express')

const router = express.Router();

const ticket_controller = require("../controller/ticket")


const multer = require('multer')
// const upload = multer({ dest: 'uploads/' })

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix)
        // TODO:use path module

        // TODO:add global middleware in server.js
        // http://localhost:8000/photos-1654426871435-714155380.png
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

const forbidAlteration = (req, res, next) => {
    if (req.role === "customer") {
        res.status(403).send({
            data: "Forbidden"
        })
    } else if (req.role === "developer") {
        /* block if tries to delete others ticket */

        // TODO:block if tries to delete others ticket

        next()
    }

}



router.get("", ticket_controller.index)
router.post("", upload.array('photos', 12), checkRole, ticket_controller.store)
router.put("/:id", checkRole, forbidAlteration, ticket_controller.update)
router.delete("/:id", forbidAlteration, ticket_controller.remove)

module.exports = router

