// sio failo viduje sukuriam user
const User = require('../models/User');
const bcrypt = require('bcryptjs');

const createUser = async (name, password) => {
  try {
    // hash password
    const hash = await bcrypt.hash(password,10);
    const user = new User({name, password:hash});
    await user.save();
    console.log('User was created');
    
  } catch (err) {
    console.log(err);
   
  }
};

module.exports = createUser;