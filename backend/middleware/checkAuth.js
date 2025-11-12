const jwt = require("jsonwebtoken");
const User = require("../models/User");
module.exports = async(req,res,next) => {
    try {
        if(!req.headers.authorization)  {
            return res.status(401).json({msg:"unauthorized"});
        } 
        const token = req.headers.authorization.split(" ")[1];
        const user = jwt.verify(token, process.env.SECRET_KEY);
        const isUserExist = await User.findById(user.id);
        if(!isUserExist) {
            return  res.status(401).json({msg:"unauthorized"});
        }
        req.userData = user;
        next();
    } catch (error) {
        return res.status(401).json({msg:"Token expired or invalid"});
    }
}
