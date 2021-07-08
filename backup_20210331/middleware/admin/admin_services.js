const jwt = require("jsonwebtoken");
const jwtsalt = process.env.ACCESS_TOKEN_SECRET;

module.exports = {
    getALl: function(req, res, next)
    verifyToken: function(req,res,next){
        console.log(req.headers.cookie);
        token = req.cookies['mylawyer']; 
        if(token){
            jwt.verify(token, jwtsalt, function(err,decoded){
                if(err){
                    req.message = "Invalid/Expired Token"
                    console.log(req.message);
                    next();
                } else {
                    req.decode = decoded; // attaching decoded info in req 
                    console.log(req.decode);
                    next(); 
                }
            });
        } else {
            req.message = "Please login first";
            console.log(req.message);
            next();
        }
    }
};