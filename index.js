const {app} = require('./src/server') 
let port = process.env.PORT || 3000;
const {Client} = require('pg')
const client = new Client({connectionString:process.env.DATABASE_URL});
// const client = new Client( {
//     connectionString: process.env.DATABASE_URL,
//     ssl: process.env.LOCALLY ? false : {rejectUnauthorized: false}
//   } );
app.listen(port, ()=>{
    client.connect()
    .then(()=>{console.log(`listing on PORT ${port}`)})
    .catch(err=>{console.log(err.message)})
})

module.exports = client