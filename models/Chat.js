const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ChatSchema = new Schema({
  name:{
    type:String,
    required:true,
  },
  message:{
    type:String,
    required:true,
  },
  img:String
});

module.exports = mongoose.model('chats',ChatSchema);