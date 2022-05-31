
const User = require("../model/user")

const signup = (req, res) => {
    User.create({
        name:"asdf",
        email:"tesfasdfting@testing.com",
        afsd:"afsdf"
    })
    res.send("/signup")
}


const login = (req, res) => {
    res.send("/signup")
}

module.exports = {
    login,
    signup
}

