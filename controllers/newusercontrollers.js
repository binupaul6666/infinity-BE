const mongoose = require('mongoose');
var User = mongoose.model('newUsers');
const express = require('express');
const router = express.Router();
const mail = require("./mailcontrollers");

//const instance = new User();
router.post('/', function (req, res, next) {
  insertNewUserDetails(req, res);
});

router.post('/signin', function (req, res) {
  getUserDetails(req, res);
});

// router.get('/:id', function (req, res, next) {
//   console.log('Success');
// })
async function insertNewUserDetails(req, res) {
  let user = new User();
  user.username = req.body.username;
  user.fullname = req.body.fullname;
  user.password = req.body.password;
  user.email = req.body.email;
  user.confirmemail = false;
  await User.findOne({ email: req.body.email }, function (err, data) {
    if (err) {
      res.json({ status: false, error: err });
    } else {
      if (data !== null) {
        res.json({ status: false, message: 'Email is already exist' });
      } else {
        user.save((err, doc) => {
          if (!err) {            
            mail.mail(req.body.email, doc._id);
            res.json({ status: true, message: 'Our Technical Team send an email to your registered mail ID. Please confirm if you are a genuine user' });
          } else {
            res.json({ status: false, error: err, message: 'User Name already exist' });
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
      if (doc.length > 0 && doc !== null && doc[0].confirmemail) {
        res.json({ status: doc[0].confirmemail, message: 'Successfully login' });
      } else {
        res.json({ status: false, message: 'Invalid credentials' });
      }
    }
  });
}
module.exports = router;