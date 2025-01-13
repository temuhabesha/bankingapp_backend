// module importing starting point
const express = require('express')
const db_connection = require('./config/db')
const customerRoutes = require('./routs/customerrouts')
const cors = require('cors')
// module importing ending point

const app = express();
const PORT = 3001;
// middleware starting point
app.use(express.json())
app.use(cors())
app.use('/',customerRoutes)
// middleware ending point


app.listen(PORT,(err)=>{
    if(!err){
        return console.log(`the server is running in port number ${PORT}`)
    }
    else{
        console.log(err)
    }
})