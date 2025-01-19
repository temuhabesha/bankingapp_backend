// import starting point
const dbconnection = require('../config/db')
const bcrypt = require('bcrypt')
//import ending point
async function register(req,res){
   const {fullname,fathername,mothername,Nationality,dateofbirth,birthplace,Region,regioncity,zone,Woreda,Kebele,Mobile,Gender,mritalstatus,accountnumber,accounttype,employdetail,username,email,password }= req.body
   
   if(!fullname || !fathername || !mothername || !Nationality || !dateofbirth || !birthplace || !Region || !regioncity || !zone || !Woreda || !Kebele || !Mobile || !Gender || !mritalstatus || !accountnumber || !accounttype || !employdetail || !username || !email || !password ){
    return res.status(400).json({msg:'please fiel all fields'})
   }
   try {
    const [result] = await dbconnection.query("SELECT username,password FROM customer where email = ? or username = ?",[email,username])
    if(result.length>0){
        return res.status(400).json({msg:'the user is already register'})
    }
    
    if(password.length<8){
        return res.status(400).json({msg:'the password is atlist 8 charachters'})
    }
      const salt = await bcrypt.genSalt(10)

      const hashedpassword = await bcrypt.hash(password,salt)

    await dbconnection.query('INSERT INTO customer (fullname,fatherfullname,motherfullname,nationality,gender,dateofbirth,mritalstatus,region,regioncity,zone,Woreda,Kebele,mobile,employditail,accounttype,username,email,password) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',[fullname,fathername,mothername,Nationality,Gender,dateofbirth,mritalstatus,Region,regioncity,zone,Woreda,Kebele,Mobile,employdetail,accounttype,username,email,hashedpassword])
    return res.status(200).json({msg:'the user is registered successfully'})
   }

    catch (error) {
    return res.status(500).json({error:error})
   }

}
// login functionality
async function login(req,res){
  const {email,password}=req.body;
  if(!email || !password){
    return res.status(400).json({msg:'please enter all required fields'})
  }
  try {
    const [user]= await dbconnection.query('select username,password,id from customer where email = ?',[email])
    if(!user){
         return res.status(400).json({msg:"the email is invalid"})
    }


    const isMach = await bcrypt.compare(password,user[0].password)

    if(!isMach){
      return res.status(400).json({msg:"wrong password"})
    }
    return res.status(200).json({msg:"login successfully"})


  } catch (error) {
    return res.status(400).json(error)
  }
  
}

module.exports = {register,login}