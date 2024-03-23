const asyncHandler = require("express-async-handler");
const jwt = require('jsonwebtoken')

const validateToken = asyncHandler(async (req,res,next) => {
    
    let token;
    let authHeader = req.headers.Authorization || req.headers.authorization;
    if(authHeader && authHeader.startsWith("Bearer")) {
        token = authHeader.split(" ")[1];
        jwt.verify(token,process.env.ACCESS_TOKEN_SECRET, (err,decoded_user) => {
            if(err) {
                res.status(400).json({message:"User not authorized!!!"})
            } else {
                req.user = decoded_user.user;
                console.log(req.user)
                next();
            }
        })
        if(!token) {
            res.status(401).json({message:"Token is not authorized or missing!!!"})
        }
    }
})

module.exports = validateToken

