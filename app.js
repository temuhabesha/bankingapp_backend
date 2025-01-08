// import the module starting point
const express = require('express')
const dotenv = require('dotenv')
dotenv.config()
const userrouts = require('./routs/customerrouts')
const dbconnection = require('./config/db')
const cors = require('cors')
// import the module ending point

// server creating starting point by express
const app = express();
// server creating ending point by express

//the middleware starting point
app.use(express.json())
app.use(cors())
app.use('/',userrouts)
//the middleware ending point


//dotenv file starting point
const PORT = process.env.PORT
//dotenv file ending point

//the server listen staring point
app.listen(PORT,(err)=>{
    console.log('the server is run in port number 5001')
})
//the server listen ending point