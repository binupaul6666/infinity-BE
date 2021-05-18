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

router.put('/confirm', function (req, res, next) {
  activateLogin(req, res);
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
  user.active = false;
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
            res.json({ status: true, message: `We now need to verify your email address. We have sent an email to ${req.body.password} to verify your address.` });
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
      if (doc.length > 0 && doc !== null) {
        if (doc[0].active) {
          res.json({ status: doc[0].active, message: 'Successfully login' });
        } else {
          res.json({ status: doc[0].active, message: 'Email Verification is pending' });
        }
      } else {
        res.json({ status: false, message: 'Invalid credentials' });
      }
    }
  });
}

async function activateLogin(req, res) {
  await User.findOneAndUpdate({ _id: req.body.userId }, { $set: { active: true } }, function (err, doc) {
    if (!err) {
      if (doc !== null) {
        res.json({ status: true, message: 'Email verified' });
      } else {
        res.json({ status: false, message: 'Please verify your Email again', error: err });
      }

    } else {
      res.json({ status: false, message: 'Please try again', error: err });
    }
  })
}
module.exports = router;

/**
 * LOGIN Logic Completed
 * @author Binu Paul (Mail: paulbinu1991@gmail.com)
 * @description This application is developing for Royals Pallipadi
 */