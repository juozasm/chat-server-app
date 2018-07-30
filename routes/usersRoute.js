const express = require('express');
const Users = require('../models/User');
const router = express.Router();

router.get('/', async (req, res) => {
  // uzklausa i DB ir gaunam visus users
  const users = await Users.find();
  res.json(users);
});

module.exports = router;