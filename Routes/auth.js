const express = require("express")
const {body, validationResult} = require('express-validator')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const router = express.Router()
const User = require('../Model/User.js')
const fetchUser = require('../middleware/fetchuser.js')

const JWT_Secret = "This is a secret code";

router.post('/signup', [
    body('name', "Name must be atleast 3 character").isLength({min: 3}),
    body('email', "Please enter a valid email").isEmail(),
    body('password', "Please enter a valid password").isLength({min: 5})
], async (req, res)=>{
    const error = validationResult(req)
    if(!error.isEmpty()) {
        return res.status(400).json({error: error.array()})
    }

    try{
        let userExists = await User.findOne({email: req.body.email})
        if(userExists) {
            return res.status(400).json({error: "Sorry a user with this email already exists"})
        }
        let {name, email, password} = req.body
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt)
        const newUser = await User.create({name, email, password: hashedPassword})

        const data = {
            newUser:{
                id: newUser.id
            }
        }
        const authData =  jwt.sign(data, JWT_Secret)

        console.log(authData)

        res.json({authData})
    } catch(error){
        return res.status(500).send("Internal Server Error")
    }
})

router.post('/login', [
    body('email').isEmail(),
    body('password').isLength({min: 5})
], async (req, res)=>{
    const error = validationResult(req)
    if(!error.isEmpty()) {
        return res.status(400).json({error: error.array()})
    }

    try {
        const user = await User.findOne({email: req.body.email})
        if(!user) {
            return res.status(400).json({error: "Try to login with correct credentials"})
        }
        
        const passwordVerification = await bcryptjs.compare(req.body.password, user.password)
        
        if(!passwordVerification) {
            return res.status(400).json({error: "Please try to login with correct credentials"})
        }
        const data = {
            user:{
                id: user.id
            }
        }
        const authData = jwt.sign(data, JWT_Secret)
        res.json({authData})
    } catch(error) {
        res.status(500).send("Internal server error")
    }
})

router.get('/fetchUserData', fetchUser, async (req, res)=>{

    try{
        const user = await User.findById(req.user.id).select("-password")
        if(!user) {
            return res.status(404).send("User not found")
        }
        res.status(200).json(user)
    } catch(error) {
        res.status(500).send("Internal Server Error")
    }
})


module.exports = router