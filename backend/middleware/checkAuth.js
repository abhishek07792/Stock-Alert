const jwt = require("jsonwebtoken");
const User = require("../models/User");
module.exports = async(req,res,next) => {
    if(!req.headers.authorization)  {
        return res.status(404).json({msg:"unauthorized"});
    } 
    const user = jwt.verify(req.headers.authorization.split(" ")[1],process.env.SECRET_KEY);
    const isUserExist = await User.findById(user.id);
    if(!isUserExist) {
        return  res.status(404).json({msg:"unauthorized"});
    }
    req.userData = user;
    next();
}
