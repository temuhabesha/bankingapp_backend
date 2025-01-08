const mysql = require('mysql2')
const dbconnection = mysql.createConnection({
    host:'localhost',
    database:'bankingdb',
    user:'bankingadmin',
    password:'1221'
})

dbconnection.connect((err)=>{
    if(err){
        console.log('err')
    }
    else{
        console.log('the database is connected to the server')
    }
})
module.exports = dbconnection.promise();