const express = require('express');
const asyncHandler = require('express-async-handler');
const passport = require('passport');
const userCtrl = require('../controllers/user.controller');
const authCtrl = require('../controllers/auth.controller');
const config = require('../config/config');
const User = require('../models/user.model');
const fs = require('fs');
const os = require('os');



const router = express.Router();
module.exports = router;

router.post('/register', asyncHandler(register), login);
router.post(
  '/login',
  passport.authenticate('local', { session: false }),
  login
);
router.get('/me', passport.authenticate('jwt', { session: false }), login);

async function register(req, res, next) {
  try{
  let user = await userCtrl.insert(req.body);
  user = user.toObject();
  delete user.hashedPassword;
  req.user = user;
  createUserFolder(req.body.email)
  console.log('User directory created Successfully')
  next();
  } catch (err) {
    res.sendStatus(500) 
  }

}

async function createUserFolder(email) {
  folderName = email.match(/^([^@]*)@/)[1];
  homedir = os.homedir();
  dir = homedir+'/'+folderName;
  if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
  }
  var user = await User.findOneAndUpdate({email: email }, {homedir: dir}, {
      new: true,
      runValidators: true,
    })
  console.log(user)
}



function login(req, res) {
  let user = req.user;
  let token = authCtrl.generateToken(user);
  res.json({ user, token });
}
