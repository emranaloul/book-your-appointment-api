const express = require('express');
const {Client} = require('pg');
const app = express();
const cors = require('cors');
const multer = require('multer');
const router = require('./routes')
let upload = multer()
require('dotenv').config();
// const client = new Client({connectionString:process.env.DATABASE_URL}) ;

app.use(cors());
app.use(upload.none())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router)

app.get('/', function (req, res) {
    res.send('working before auth')
})



module.exports = { app}