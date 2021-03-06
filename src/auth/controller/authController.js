const {signup,getSellers, getUserById} = require('../models/user')
const {createToken, deleteToken} = require('../models/jwt')

const signupHandler = async (req,res) => {
    try {
        let result = await signup(req.body)
        let token = await createToken(result.id)
        res.status(200).json({token:token.token})
    } catch (error) {
        res.send(error.message)
    }
}

const signinHandler = async (req,res) => {
    try {
        res.status(200).json({token:req.token.token})
    } catch (error) {
        res.send(error.message)
    }
    
}

const check = async (req,res) => {
    res.send('working')
}

const getSellersHandler = async (req,res) => {
    try {
        let result = await getSellers()
        res.status(200).json(result)
    } catch (error) {
        res.send(error.message)
    }
}

const getUserHandler = async (req,res) => {
    try {
        let id = req.user.id
        let result = await getUserById(id)
        res.status(200).json(result)
    } catch (error) {
        res.send(error.message)
    }
}

const logOutHandler = async (req,res) => {
    try {
        let result = await deleteToken(req.user.id)
        res.status(200).send('logged out successfully')
    } catch (error) { 
        res.send(error.message)
    }
}

module.exports = {signupHandler,signinHandler,check,getSellersHandler,getUserHandler,logOutHandler}