

module.exports = (req,res,next) => {
    req.body.user = {id:1}
    next()
}



