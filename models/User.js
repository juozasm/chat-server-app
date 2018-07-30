const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name:{
    type:String,
    unique:true,
    required:true
  },
  password:{
    required:true,
    type:String
  }
});

module.exports = mongoose.model('users', UserSchema);