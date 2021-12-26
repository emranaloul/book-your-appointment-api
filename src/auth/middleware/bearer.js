const jwt = require('jsonwebtoken')
const client = require('../../db')


const getUserById = async id => {
    try {
        let SQL = `SELECT * FROM client WHERE id=$1;`;
        let safeValue = [id];
        let result = await client.query(SQL, safeValue);
        return result.rows[0];
    } catch (error) {
        console.log(error)
    }
};

let authenticateWithToken = async (token)=>{
    try {
        let parsedToken = jwt.verify(token,process.env.SECRET);
        console.log("🚀 ~ file: bearer.js ~ line 19 ~ authenticateWithToken ~ parsedToken", parsedToken)
        
         const user = await getUserById(parsedToken.userId);
         if(user) return user;
    } catch (error) {
        throw new Error(error.message);
    }
}

let getTokenRecord = async (token) =>{

    try {
        let SQL = 'SELECT * FROM JWT WHERE token = $1;';
        let safeValue = [token];
        let result = await client.query(SQL,safeValue);
        return result.rows[0];
        
    } catch (error) {
        throw new Error(error.message);
    }
}

module.exports = async (req, res, next) => {
    try {
        if (!req.headers.authorization) {
            return _authError();
        }
        let token = req.headers.authorization.split(' ').pop();

        let tokenRecord = await getTokenRecord(token);
        
        if (!tokenRecord) {
            res.status(403).json({
                status: 403,
                message: 'Invalid token!',
            });
        }
        else {
            let validUser = await authenticateWithToken(token);
        
            // request.user:

            req.user = validUser;
         
            next();
        }

    } catch (error) {
        next(error);
    }
    function _authError() {
        res.status(403).send('Header authorization is not provided');
    }

}