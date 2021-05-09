const mongoose = require('mongoose');
const User = mongoose.model('NewUser');
const express = require('express');
const router = express.Router();

//const instance = new User();
router.get('/', function(req, res, next) {
    res.send({'status': 'Success'});
  });
  //instance.save();
module.exports = router;