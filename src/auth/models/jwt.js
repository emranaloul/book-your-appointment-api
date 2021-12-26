const jwt = require('jsonwebtoken');
const client = require('../../db')

let getToken = (userId) => {
    try {
        let expireDate = 86400;
        return jwt.sign({userId: userId, expires: expireDate}, process.env.SECRET, { expiresIn: expireDate });
    } catch (error) {
        throw new Error(error.message);
    }
}


const createToken = async (userId) => {
    try {
        let token = await getToken(userId);
        let SQL = 'INSERT INTO jwt (token, client_id) VALUES ($1,$2) RETURNING *;'
        let safeValues = [token,userId];
        console.log("🚀 ~ file: jwt.js ~ line 19 ~ createToken ~ safeValues", safeValues)
        let result = await client.query(SQL, safeValues)
        return result.rows[0]
    } catch (error) {
        throw new Error(error.message);
    }
}

const deleteToken = async (userId) => {
    try {
        let SQL = 'DELETE FROM jwt WHERE client_id =$1 RETURNING *;'
        let result = await client.query(SQL, [userId])
        return result.rows[0]
    } catch (error) {
        throw new Error(error.message);
    }
}

module.exports = {createToken,deleteToken}