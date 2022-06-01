
const User = require("../model/user");
const router = require("../route/user");
const { body, validationResult } = require('express-validator');

const signup = async (req, res, next) => {

    // let user = await User.create({
    //     name: "1111",
    //     email: "tesfsdfasdfsSDFdsdfting@testing.com",
    //     afsd: "afsdf"
    // })


    User.create({
        name: "1111",
        email: "tesfsdfasdfsSDFdsdfting@testing.com",
        afsd: "afsdf"
    }, (err, data) => {
        if (err) return next(err)
    })

    // let user  =  new User()
    // user.name = "123",
    // user.email = "t@t.com"
    // user.save();

    // console.log(user);




    // res.send("/signup")
}


const login = (req, res) => {
    res.send("/signup")
}

module.exports = {
    login,
    signup
}

