const express = require('express');
const router = express.Router();
const Chat = require('../models/Chat');
const validateChat = require('../validate/chat');
const multer = require('multer');
const fs = require('fs');
const auth = require('../auth/auth');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/img/uploaded')
  },
  filename: function (req, file, cb) {
    const filename = Date.now()+file.originalname;
    req.filename = filename;
    cb(null, filename)
  }
});

var upload = multer({storage: storage});

// @route   GET    /api/chat
// @access  Public
// @desc    Get all chat items
router.get('/', async (req, res) => {
  // uzklausa i DB ir gaunam visus chat items
  const chat = await Chat.find();
  res.json(chat);
});

// @route   POST  /api/chat
// @access  Admin
// @desc    Create chat item
router.post('/',auth, upload.single('image'), async (req, res) => {
  // console.log(req.file);
  // console.log(req.body);
  console.log(req.filename);
  const {errors, isValid} = validateChat(req.body);
  if (!isValid) return res.status(400).json(errors);
  if(req.filename){var img='/img/uploaded/'+req.filename}else img=''
  const chat = new Chat({
    name: req.body.name,
    message: req.body.message,
    img:img
  });
  try {
    await chat.save();
    const io = req.app.get('socketio');
    io.emit('newitem', chat);
    res.status(200)
  } catch (err) {
    console.log(err);
    res.status(400).json(err)
  }
  
});

// @route   DELETE  /api/chat/:id
// @desc    Delete chat item
router.delete('/:id',auth, async (req, res) => {
  try {
    const item = await Chat.findByIdAndRemove(req.params.id);
    fs.unlink('public/'+item.img, (err)=>{
        if(!err) return console.log('file removed');
        console.log(err);
    });
    res.json(item)
  } catch (err) {
    console.log(err);
  }
});



module.exports = router;