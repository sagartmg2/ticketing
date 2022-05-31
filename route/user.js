const express = require('express')

const router = express.Router();

const user_controller =require("../controller/user")

const authentication = require("../middleware/authentication")

router.get("/signup",user_controller.signup)

module.exports = router
