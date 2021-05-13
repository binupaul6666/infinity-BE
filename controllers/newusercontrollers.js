const mongoose = require('mongoose');
var User = mongoose.model('newUsers');
const express = require('express');
const router = express.Router();

//const instance = new User();
router.post('/', function (req, res, next) {
  insertNewUserDetails(req, res);
});

router.post('/signin', function (req, res) {
  getUserDetails(req, res);
});
async function insertNewUserDetails(req, res) {
  let user = new User();
  user.username = req.body.username;
  user.fullname = req.body.fullname;
  user.password = req.body.password;
  user.email = req.body.email;
  await User.findOne({ email: req.body.email }, function (err, data) {
    if (err) {
      res.json({ status: false, error: err });
    } else {
      if (data !== null) {
        res.json({ status: false, message: 'Email is already exist' });
      } else {
        user.save((err) => {
          if (!err) {
            res.json({ status: true, message: 'Data Saved Successfully' });
          } else {
            res.json({ status: false, error: err });
          }
        });
      }
    }
  });
}

async function getUserDetails(req, res) {
  await User.find({ $and: [{ username: req.body.username }, { password: req.body.password }] }, function (err, doc) {
    if (err) {
      res.json({ status: false, error: err });
    } else {
      if(doc.length > 0 && doc !== null) { 
        console.log(doc, 'doc+++')       
        res.json({ status: true, message: 'Successfully login'});
      } else {
        res.json({ status: false, message: 'Invalid credentials'});
      }
    }
  });
}
module.exports = router;