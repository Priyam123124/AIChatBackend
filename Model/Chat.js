const {Schema} = require('mongoose')
const mongoose = require('mongoose')
const User = require('./User')
const chatSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User
      },
    float: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    }
})

const Chat = mongoose.model('Chat', chatSchema)
module.exports = Chat