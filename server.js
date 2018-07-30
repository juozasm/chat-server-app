const https = require('https');
const fs = require('fs');
const express = require('express');
require('dotenv').config();
const app = express();
const chalk = require('chalk');
const createUser = require('./auth/createUser');
const usrRoutes = require('./routes/usersRoute');
const authRoutes = require('./routes/authRoutes');
const chatRoutes = require('./routes/chatRoutes');
const mongoose = require('mongoose');
mongoose.connect(process.env.DB_HOST, {useNewUrlParser: true});
mongoose.connection
    .once('open', () => console.log('connected to DB'))
    .on('error', (err) => console.log(err));
mongoose.Promise = global.Promise;

// create user:   node server username userpassword
// argumentai pasiekiami process.argv
console.log(process.argv);
if (process.argv[2] && process.argv[3]) {
  createUser(process.argv[2], process.argv[3]);
}

// config.
app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.use('/api/chat', chatRoutes);
app.use('/api', authRoutes);
app.use('/api/users', usrRoutes);
app.get('/test', (req,res)=>{
    res.send('ok')
});

if(process.env.NODE_ENV==='production'){
  app.use(express.static(__dirname+'/client/build'));
  app.get('/*', (req,res)=>{
    res.sendFile(__dirname+'/client/build/index.html');
  })
}

const port = process.env.PORT;
const options = {
  cert: fs.readFileSync('/etc/letsencrypt/live/thecat.lt/fullchain.pem'),
  key: fs.readFileSync('/etc/letsencrypt/live/thecat.lt/privkey.pem')
};


const server = app.listen(port, () => {
  console.log(chalk.bgGreen(`server is running on port ${port}`));
});

const secureServer=https.createServer(options, app).listen(9443);
const io = require('socket.io')(secureServer);
io.on('connection', (socket) => {
  console.log('new user has connected');
  socket.on('test', (data) => {
    console.log(data);
    if(data!=='socket'){
      socket.emit('badsocket', 'gg')
    }
  })
});

app.set('socketio', io);
app.use(require('helmet')());