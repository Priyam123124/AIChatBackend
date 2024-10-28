const express = require('express')
const connectToMongo = require('./db.js')

const port = 5000;

connectToMongo()

const app = express();

app.use(express.json())

app.use('/api/auth/', require("./Routes/auth.js"));
app.use('/api/chat/', require("./Routes/chat.js"))

app.listen(port, ()=>{
    console.log(`The app is listening on port ${port}`);
})