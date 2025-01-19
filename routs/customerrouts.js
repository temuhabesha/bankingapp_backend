//importing the module starting point
const express = require('express')
const {register,login}=require('../controller/usercontroller')
const transfer = require('../controller/transactionController')

// importing the module ending point

const routs = express.Router();

//user registeration rout
routs.post('/register',register)
routs.post('/login',login)
routs.post('/transaction',transfer)

module.exports = routs;