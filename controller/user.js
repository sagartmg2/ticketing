
const User = require("../model/user");
const router = require("../route/user");
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');

const signup = async (req, res, next) => {

    let { name, email, password, role_id, department_ids } = req.body

    // let user = await User.create({
    //     name: "1111",
    //     email: "tesfsdfasdfsSDFdsdfting@testing.com",
    //     afsd: "afsdf"
    // })

    const saltRounds = 10;
    let hashed_password = await bcrypt.hash(password, saltRounds);

    let user = await User.create({
        name,
        email,
        password: hashed_password,
        role_id,
    })

    if (user) {
        res.send(user)
    }

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

