const express = require('express')
const Chat = require('../Model/Chat.js')
const fetchUser = require('../middleware/fetchuser.js')

const router = express.Router()

//storing user's chat in database
router.post('/addChat', fetchUser, async (req, res)=>{
    const {float, message} = req.body
    try{
        const chat = await Chat.create({user: req.user.id, float: float, message: message})
        res.status(200).send(chat)
    }catch(error){
        res.status(500).send('Internal Server Error')
    }
})

//fetching user's chat from database 

router.get('/getChat', fetchUser, async (req, res)=>{
    try{
        const chats = await Chat.find({user: req.user.id})
        res.status(200).send(JSON.stringify(chats))
    } catch(error) {
        res.status(500).send({error: "Internal server error"})
    }
        
})

//Deleting user's chat from database
router.delete('/deleteChat/:id', fetchUser, async (req, res)=>{

    try {
        let chat = await Chat.findById(req.params.id)
        if(!chat){
            return res.status(404).send("Not Found")
        }
        if (chat.user.toString() != req.user.id) {
            return res.status(401).send("Not Allowed");
        }
        chat = await Chat.findByIdAndDelete(req.params.id);
        res.json({"Success": "Note has been deleted", chat: chat});
    } catch(error) {
        console.log(error.message)
        res.status(500).send("Internal server error")
    }
})

module.exports = router