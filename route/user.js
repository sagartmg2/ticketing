const express = require('express')

const router = express.Router();
const User = require("../model/user")

const user_controller = require("../controller/user")

const authentication = require("../middleware/authentication")

const { body, validationResult } = require('express-validator');

const validate = validations => {
    return async (req, res, next) => {
        await Promise.all(validations.map(validation => validation.run(req)));

        const errors = validationResult(req);
        if (errors.isEmpty()) {
            return next();
        }

        res.status(400).json({ errors: errors.array() });
    };
};

const checkValidation = validate([
    body('email').isEmail().custom(value => {
        return User.findOne({ email: value }).then(user => {
            if (user) {
                return Promise.reject('E-mail already in use');
            }
        });
    }),
    // password must be at least 5 chars long
    body('password').isLength({ min: 5 }),
    body('role_id').custom(value => {
        if (value) {
            return User.findById(value).then(role => {
                if (role) {
                    return Promise.reject('E-mail already in use');
                }
            });
        } else {
            return Promise.reject('Role is required');

        }
    })
])

// router.post("/signup",user_controller.signup)
router.post("/signup", checkValidation, user_controller.signup)
router.post("/login", user_controller.login)
router.post("/get-token", user_controller.getAccessToken)

module.exports = router
