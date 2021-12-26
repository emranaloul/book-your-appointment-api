// const {Client} = require('pg')
// require('dotenv').config()
// const client = new Client({connectionString:process.env.DATABASE_URL}) ;
// client.connect()

const client = require('../../db')
// client.connect()
const bcrypt = require('bcrypt')
const signup = async (data) => {
    try {
        let {firstName, lastName, email, password, role, commercialName} = data;
        let hashedPassword = await bcrypt.hash(password,10);
        let SQL = `INSERT INTO client (first_name, last_name, email, password, role, commercial_name) VAlUES ($1,$2,$3,$4,$5,$6) RETURNING *;`;
        let safeValues = [firstName, lastName, email, hashedPassword, role, commercialName];
        let result = await client.query(SQL,safeValues);
        return result.rows[0];
    } catch (error) {
        throw new Error(error.message)
    }
}

const getSellers = async () =>{
    try {
        let SQL = 'SELECT * FROM client WHERE role=$1;'
        let result = await client.query(SQL,['seller'])
        return result.rows;
    } catch (error) {
        throw new Error(error.message)
    }
}

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

module.exports = {signup,getSellers,getUserById}