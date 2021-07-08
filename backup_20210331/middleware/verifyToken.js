const jwt = require("jsonwebtoken");
const jwtsalt = process.env.ACCESS_TOKEN_SECRET;
const DEBUG = process.env.DEBUG || 0;

module.exports = {
    verifyToken: function(req,res,next){
        //console.log(req.headers.cookie);
        token = req.cookies['mylawyer']; 
        //console.log(jwtsalt);
        if(token){
            jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, function(err,decoded){
                if(err){
                    //console.log(err);
                    req.status = 0;
                    req.message = "Invalid/Expired Token";
                    res.clearCookie('mylawyer');
                    console.log(req.message);
                    next();
                } else {
                    req.message = "Verify Successful";
                    req.status = 1;
                    req.decode = decoded; // attaching decoded info in req 
                    console.log(req.decode);
                    next(); 
                }
            });
        } else {
            req.message = "Please login first";
            if (DEBUG) console.log(req.message);
            next();
        }
    },

    checkAuth: function(req,res,next){
        console.log(req.headers.cookie);
        token = req.cookies['mylawyer']; 
        //console.log(jwtsalt);
        if(token){
            jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, function(err,decoded){
                if(err){
                    //console.log(err);
                    req.status = 0;
                    next();
                } else {
                    req.status = 1;
                    req.decode = decoded; // attaching decoded info in req 
                    if (DEBUG) console.log(req.decode);
                    next(); 
                }
            });
        } else {
            req.status = 0;
            next();
        }
    }
};