const express = require('express')

const router = express.Router();

const user_controller = require("../controller/user")

const authentication = require("../middleware/authentication")

const { body, validationResult } = require('express-validator');


// router.post("/signup",user_controller.signup)
router.post("/signup", body('username').isEmail(),
    // password must be at least 5 chars long
    body('password').isLength({ min: 5 }),
    (req, res) => {
        // Finds the validation errors in this request and wraps them in an object with handy functions
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        User.create({
            username: req.body.username,
            password: req.body.password,
        }).then(user => res.json(user));
    })

module.exports = router
