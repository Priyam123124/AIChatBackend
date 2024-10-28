const mongoose = require("mongoose")
const URI = "mongodb+srv://priyamber0684:Priyam2@cluster0.ux1zr.mongodb.net/mydb"

const connectToMongo = async ()=>{
    await mongoose.connect(URI)
    .then(()=>{
        console.log("Connected to MongoDB successfully")
    })

}

module.exports = connectToMongo