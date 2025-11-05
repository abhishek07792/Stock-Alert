
const User = require("../models/User");
const jwt = require("jsonwebtoken");
module.exports =  async (req,res) => {
    try {
        const {email,password} = req.body;
        const userExists = await User.findOne({email,password});
        if(!userExists) {
            return res.status(400).json({msg:"Invalid Email or Password"});
        }
        const token = jwt.sign({id:userExists._id,email:userExists.email},process.env.SECRET_KEY,{expiresIn:"1h"});
        res.status(200).json({msg:"Login Successful",token});

    } catch (error) {
        res.status(400).json(error.message);
    }
};