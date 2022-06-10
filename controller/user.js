
const User = require("../model/user");
const router = require("../route/user");
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

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
}


const getAccessToken =  (req,res) => {
    // req.refresh_token
    // if exits then only generate new access token
}


const login = async (req, res) => {

    const { email, password } = req.body;

    // Load hash from your password DB.

    let user = await User.findOne({ email })

    let status = await bcrypt.compare(password, user.password);

    // console.log(user);
    let user_obj = user.toObject();
    delete user_obj.password;

    var access_token = jwt.sign(user_obj, process.env.SECRET);

    var refresh_token = jwt.sign(user_obj, process.env.REFRESH_TOKEN_SECRET);

    // save refresh_tokens in Database

    res.send({
        data:"success",
        access_token,
        refresh_token,
    })
    
}

module.exports = {
    login,
    signup,
    getAccessToken,
}

