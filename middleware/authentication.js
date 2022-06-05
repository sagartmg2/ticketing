const jwt=  require("jsonwebtoken")
const Role = require("../model/role")

module.exports = async (req,res,next) => {

    if (!req.headers.authorization || !req.headers.authorization.startsWith("Bearer")) {
        res.status(401).send({
            data: "Invalid Authorization Header"
        })
    }
    
    const token = req.headers.authorization.split(" ")[1];

    let decoded = jwt.verify(token, process.env.SECRET)

    if (decoded) {
        req.user = decoded

        let role =  await Role.findById(req.user.role_id)
        req.role = role.toObject().name
        next()
    } else {
        res.status(401).send({
            data: "unauthenticated"
        })
    }
    
}



