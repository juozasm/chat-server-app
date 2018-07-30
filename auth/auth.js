const jwt = require('jsonwebtoken');

const auth = (req,res,next)=>{
  try{
    const token = req.headers.authorization.split(' ')[1];
    const user =jwt.verify(token, process.env.JWT_KEY);
    req.user=user;
    req.kazkas ='kazkas';
    next()
  }catch (err){
    res.status(401).json({message:'unauthorized'})
  }
};

module.exports = auth;