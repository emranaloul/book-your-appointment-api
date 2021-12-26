const {getUserById} = require('../models/user')
const sellerCheck = async (req, res, next) =>{
    try {
        let user = await getUserById(req.user.id)
        if(user.role === 'seller'){
            next()
        } else {
            res.status(403).send('not authorized')
        }
    } catch (error) {
        res.send(error.message)
    }
}

module.exports = sellerCheck;