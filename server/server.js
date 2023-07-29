require('dotenv').config();
const express = require('express');
const app = express();
app.use(express.json());
const bcrypt = require('bcrypt');
const jwt=require('jsonwebtoken');
const cors = require('cors')
app.use(cors())
//connect database (mongodb) with express
const mongoose= require('mongoose');
mongoose.connect(process.env.CONNECTION)

const UserModel=require('./models/Users');

app.get('/users', async (req, res) => {
    try {
      const users = await UserModel.find();

        const formattedResponse = JSON.stringify(users, null, 2);
        res.type('json').send(formattedResponse);
        console.log('response get')
    } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).json({ error: "Error fetching users" });
    }
  });
// create user
app.post("/createUser", async (req, res) => {
  try {
    const newUser = new UserModel(req.body);
    await newUser.save();
    res.json(req.body);
    console.log('res posted successfully')
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Error creating user" });
  }
});
const AdminModel=require('./models/Admins');
//signup
app.post('/register', async (req,res)=> {
  try{
  const {username,password,email}=req.body;
  const admin = await AdminModel.findOne({email});
   admin && res.json({message:"the user is already registered"})

  const hashedPassword=bcrypt.hashSync(password,10);
  const newAdmin= new AdminModel({
      username: username,
      password: hashedPassword,
      email:email
    });
  await newAdmin.save();
    return res.json({ message: "User created successfully" });
  } catch (err) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
});
//login
app.post('/login', async (req,res)=> {
  try{
    const {email,password} = req.body;
    const admin= await AdminModel.findOne({email});

    if (!admin) {
      return res.json({ message: "User not found" });
    }    const isPasswordValid= await bcrypt.compare(password,admin.password);
if (!isPasswordValid) {
      return res.json({ message: "Username or password is incorrect" });
    }    //token to make user login to application
    const token =jwt.sign({id:admin._id},process.env.SECRET)
    return res.json({token, adminId:admin._id})
 }
  catch(err){
  return res.status(500).json({ error: "Internal Server Error" });
}
})
app.listen(process.env.PORT,()=>{
console.log('listening on port' ,process.env.PORT);
})