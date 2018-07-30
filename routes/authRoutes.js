const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../auth/auth');
const createUser = require('../auth/createUser');

router.post('/login',async (req,res)=>{
   // surandam user
  console.log(req.body);
  const user = await User.findOne({name:req.body.name});
  if(!user) return res.status(400).json({message:'bad login credentials'});
  // kai surandam user tikrinam ivesta password
  const match = await bcrypt.compare(req.body.password, user.password);
  if(!match) return res.status(400).json({message:'bad login credentials'});

  // jei viskas ok grazinam JWT token
  // sugeneruojam JWT
  const token = jwt.sign(
      {name:user.name, _id:user._id},
      process.env.JWT_KEY);
  res.send(token)
});


router.post('/register', (req,res)=>{
  // surandam user

createUser(req.body.name,req.body.password)
res.send('registered user')
});


router.post('/test', auth, (req,res)=>{
  console.log(req.user);
  console.log(req.kazkas);
    res.send('authorized')
});





module.exports = router;