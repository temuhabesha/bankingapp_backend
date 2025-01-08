//importing the module starting point
const express = require('express')
const {register}=require('../controller/usercontroller')
// importing the module ending point

const routs = express.Router();

//user registeration rout
routs.post('/register',register)

module.exports = routs;