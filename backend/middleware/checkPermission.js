const jwt = require("jsonwebtoken");

module.exports = async(req,res,next) => {
    console.log(req.headers.authorization);
    if(!req.headers.authorization)  {
        return res.status(404).json({msg:"unauthorized"});
    } 
    const user = jwt.verify(req.headers.authorization.split(" ")[1],"TerePapaMain");
    
    req.userData = user;
    next();
}





