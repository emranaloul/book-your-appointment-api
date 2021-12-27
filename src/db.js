const {Client} = require('pg')
require('dotenv').config()
const client = new Client({connectionString:process.env.DATABASE_URL}) ;
// const client = new Client( {
//     connectionString: process.env.DATABASE_URL,
//     ssl: process.env.LOCALLY ? false : {rejectUnauthorized: false}
//   } );
client.connect()

module.exports = client