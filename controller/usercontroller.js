// import starting point
const dbconnection = require('../config/db')
const bcrypt = require('bcrypt')
//import ending point
async function register(req,res){
   const {fullname,fathername,mothername,Nationality,dateofbirth,birthplace,Region,regioncity,zone,Woreda,Kebele,Mobile,Gender,mritalstatus,accountnumber,accounttype,employdetail,username,email,password }= req.body

   if(!fullname || !fathername || !mothername || !Nationality || !dateofbirth || !birthplace || !Region || !regioncity || !zone || !Woreda || !Kebele || !Mobile || !Gender || !mritalstatus || !accountnumber || !accounttype || !employdetail || !username || !email || !password ){
    return console.log('please fiel all fields')
   }
   try {
    const [result] = await dbconnection.query("SELECT username,password FROM customer where email = ? or username = ?",[email,username])
    if(result.length>0){
        return console.log('the user is already register')
    }
    
    if(password.length<8){
        console.log('the password is atlist 8 charachters')
    }
   
      const salt = await bcrypt.genSalt(10)
      const hashedpassword = await bcrypt.hash(password,salt)

    await dbconnection.query('INSERT INTO customer (fullname,fatherfullname,motherfullname,nationality,gender,dateofbirth,mritalstatus,region,regioncity,zone,Woreda,Kebele,mobile,employditail,accounttype,username,email,password) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',[fullname,fathername,mothername,Nationality,Gender,dateofbirth,mritalstatus,Region,regioncity,zone,Woreda,Kebele,Mobile,employdetail,accounttype,username,email,hashedpassword])
    return console.log('the user is registered successfully')
   } catch (error) {
    return console.log(error)
   }

}
module.exports = {register}