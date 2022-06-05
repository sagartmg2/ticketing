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
        // use path module

        // add global middleware in server.js
        // http://localhost:8000/image.png
    }
})

const upload = multer({ storage: storage })

router.get("", ticket_controller.index)
router.post("", upload.array('photos', 12), ticket_controller.store)
router.put("", ticket_controller.update)
router.delete("", ticket_controller.remove)


module.exports = router

