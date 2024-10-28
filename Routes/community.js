const express = require('express')
const Community = require('../Model/Community')

const router = express.Router();

router.post('/add_comment', fetchUser, async (req,res)=>{
    const {userName, comment} = req.body

    try{
        const comment1 = await Community.create({userName, comment, user: req.user.id})
        res.json({comment1})
    } catch(error){
        res.status(500).send('Internal server error')
    }

})