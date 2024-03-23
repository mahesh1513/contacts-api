const asyncHandler = require("express-async-handler");
const User = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const loginUser = asyncHandler(async (req,res,next)=> {

    const {email,password} = req.body;
    if(!email || !password) {
        res.status(400).json("All fields are mandatory!!!")
    }

    const user = await User.findOne({email})
    //Compare the password with hashed password
    if(user && await bcrypt.compare(password,user.password)) {
        const accessToken = jwt.sign({
            user:{
                username:user.username,
                email:user.email,
                id:user.id
            }
        },process.env.ACCESS_TOKEN_SECRET,{
           expiresIn:"5m" 
        })
        res.status(200).json({"accessToken":accessToken})
    } else {
        res.status(401).json({message:"Email or Password is not valid"})
    }
    
})

const registerUser = asyncHandler(async (req,res,next)=> {

    const {username,email,password} = req.body;
    if(!username || !email || !password) {
        //res.status(400)
        ///throw new Error("All fields are mandatory")
        res.status(400).json({message:"All fields are mandatory"})
    }
    const userAvailable = await User.findOne({email})
    if(userAvailable) {
        //res.status(400)
        //throw new Error("User Already Registered!!!")
        res.status(400).json({message:"User Already Registered!!!"})
    }

    //Hash the password
    const hashedPassword = await bcrypt.hash(password,10)
    
    const user = await User.create({
        username,
        email,
        password:hashedPassword
    })
    console.log(`User Created ${user}`)
    if(user) {
        res.status(201).json({_id:user.id,email:user.email})
    } else {
        res.status(400).json({message:"User Not Registered!!!"})
    }
})

const currentUser = asyncHandler(async (req,res,next)=> {
    res.json(req.user)
})

module.exports = {loginUser,registerUser,currentUser}

