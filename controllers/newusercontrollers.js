const mongoose = require('mongoose');
var User = mongoose.model('addUsers');
const express = require('express');
const router = express.Router();

//const instance = new User();
router.post('/', function (req, res, next) {
  insertNewUserDetails(req, res);
});

async function insertNewUserDetails(req, res) {
  let user = new User();
  user.username = req.body.username;
  user.fullname = req.body.fullname;
  user.password = req.body.password;
  user.email = req.body.email;
  await User.findOne({ email: req.body.email }, function (err, data) {
    if (err) {
      res.json({status: 'Something went wrong'});
    } else {
      if (data !== null) {
        res.json({ status: 'Email is alerady exists' });
      } else {
        user.save((err) => {
          if (!err) {
            res.json({ status: 'Data Saved Successfully' });
          } else {
            res.json({status: 'Something went wrong'});
          }
        });
      }
    }
  });
}
module.exports = router;