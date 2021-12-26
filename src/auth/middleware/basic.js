const { createToken, deleteToken } = require('../models/jwt');
const base64 = require('base-64');
const client = require('../../db')
const bcrypt = require('bcrypt')

const getUserByEmail = async email => {
    try {
        let SQL = `SELECT * FROM client WHERE email=$1;`;
        let safeValue = [email];
        let result = await client.query(SQL, safeValue);
        return result.rows[0];

    } catch (error) {
        throw new Error(error.message);
    }
};

async function authenticateBasic(email, password) {
    try {
        
        let user = await getUserByEmail(email);
        
        const valid = await bcrypt.compare(password, user.password);
        if (valid) {
            return user;
        }
        const error = new Error('Invalid User');
        error.statusCode = 403;
        throw error;
    } catch (error) {
        throw new Error(error.message);
    }
}

const basic = async (req, res, next) => {
    if (!req.headers.authorization) {
      return _authError();
    }
    let basic = req.headers.authorization.split(' ').pop();
    
  
    let [email, password] = base64.decode(basic).split(':');
  
    try {
      let userData = await authenticateBasic(email, password);
      console.log("🚀 ~ file: basic.js ~ line 46 ~ basic ~ userData", userData)
      await deleteToken(userData.id);
      const userTokens = await createToken(userData.id);
      delete userTokens.id;
      delete userTokens.user_id;
      if (userData.verified === false) {
        res.status(403).json({
          status: 403,
          message: 'User is not verified, please verify your mobile number!',
        });
      }
      else {
        req.user = userData;
        req.token = userTokens;
        next();
      }
    } catch (e) {
      _authError();
    }
  
    function _authError() {
      res.status(403).json({
        status: 403,
        message: 'Either email or password is wrong!',
      });
    }
  };

  module.exports = basic
  