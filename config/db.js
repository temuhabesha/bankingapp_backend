const mysql = require('mysql2')



const db_connection = mysql.createConnection({
    host:"localhost",
    user:"bankingdb_admin",
    database:"bankingdb",
    password:"1221"
})
db_connection.connect((err)=>{
    if(err){
        console.log(err.message)
    }
    else{
        console.log('the database is connected to the server successfully')
    }
})

module.exports = db_connection.promise()