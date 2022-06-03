

module.exports = (req,res,next) => {

    console.log(req.headers.authorization);

    // token 

    // jwt.verify token 

    // if right token  next()
    // else{
        // res.send(401)
    // }

    return;
    req.headers
    //jwt.very()
    req.body.user = {id:1}
    next()
}



