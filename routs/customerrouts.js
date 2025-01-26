//importing the module starting point
const express = require('express')
const {register,login}=require('../controller/usercontroller')
const {transfer,save} = require('../controller/transactionController')

// importing the module ending point

const routs = express.Router();

//user registeration rout
routs.post('/register',register)
routs.post('/login',login)
routs.post('/transaction',transfer)
routs.post('/save',save)

module.exports = routs;