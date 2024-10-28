const { Schema } = require('mongoose')
const mongoose = require('mongoose')

const CommunitySchema = new Schema({
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User
      },
      userName: {
        type: String,
        required: true
      },
      comment: {
        type: String,
        required: true
      }
})

const Community = mongoose.model('Community', CommunitySchema)

module.exports = Community