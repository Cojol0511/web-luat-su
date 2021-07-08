const jwt = require("jsonwebtoken");
const jwtsalt = process.env.ACCESS_TOKEN_SECRET;
const DEBUG = process.env.DEBUG || 0;

module.exports = {
    verifyToken: function(req,res,next){
        console.log(req.cookies);
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
    },

    checkRole: function(req,res,next){
        console.log(req.headers.cookie);
        role = req.cookies['role']; 
        //console.log(jwtsalt);
        if(role){
            switch (role) {
                case "client":
                    //console.log(err);
                    req.status = 1;
                    break;
                case "lawyer":
                    req.status = 2;
                    break;
                case "admin":
                    req.status = 3;
                    break;
                default:
                    req.status = 4;
                    break;
                } 
                next(); 
        } else {
            req.status = 0;
            next();
        }
    },

    adminAuth: function(req,res,next){
        console.log(req.cookies);
        token = req.cookies['mylawyer']; 
        role = req.cookies['role'];
        //console.log(jwtsalt);
        if(token){
            if (role === "admin"){
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
                req.message = "You must be admin to access this page";
                if (DEBUG) console.log(req.message);
                next();
            }

        } else {
            req.message = "Please login first";
            if (DEBUG) console.log(req.message);
            next();
        }
    }     
};