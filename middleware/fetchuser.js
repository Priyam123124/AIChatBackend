const jwt = require('jsonwebtoken')
const JWT_Secret = "This is a secret code"

const fetchUser = async (req, res, next)=> {
    const token = await req.header('auth-token')
    if(!token) {
        return res.status(401).json({error: "Login using correct credentials"})
    }

    try{
        const data = jwt.verify(token, JWT_Secret)
        console.log(data.user.id)
        if(!data){
            return res.status(400).json({error: 'An error occured'})
        }
        req.user = await data.user
        console.log(req.user)

        next()
    } catch(error) {
        res.status(401).send({error: 'Please authenticate using valid token'})
    }
}

module.exports = fetchUser