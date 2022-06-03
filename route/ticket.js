const express = require('express')

const router = express.Router();

const ticket_controller = require("../controller/ticket")

router.get("", ticket_controller.index)
router.post("", ticket_controller.store)
router.put("", ticket_controller.update)
router.delete("", ticket_controller.remove)


module.exports = router

