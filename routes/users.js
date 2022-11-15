var express = require('express');
var router = express.Router();
const User = require("../models/user");
const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const jwt = require('express-jwt');


/* GET users listing. */
router.post('/login', async (req, res) => {
  try {
    bcrypt.hash(req.body.password, 10, (err, hash) => {
      if (err) {
        return res.status(500).json({
          error: err
        })
      } else {
        const user = User.find({
          password: hash,
          email: req.body.email,
        });

        if (user) {
          res.status(201).json({
            "status": "true",
            "message": "login successfully"
          })
        }
      }
    });
  } catch (error) {
    res.status(400).json(error);
  }
});


router.post('/register', function (req, res, next) {

  bcrypt.hash(req.body.password, 10, (err, hash) => {
    if (err) {
      return res.status(500).json({
        error: err
      })
    } else {
      const user = new User({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        password: hash,
        email: req.body.email,
        mobile: req.body.mobile,
        role: 1
      });
      user.save().then(result => {
        if (result) {
          jwt.sign({
              email:user[0].email,
              userId:[0]._id
          }, );
          res.status(201).json({
            message: "register successfully",
            status: true
          })
        }
      })

    }
  });
});

module.exports = router;
