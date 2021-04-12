const router = require('express').Router();
require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const dbConnection = require('../db/Connection');
const User = require('../models/User');
const {
  registerValidation,
  loginValidation,
} = require('../middlewares/validation');

//Connection to access DB
let db = dbConnection.connection;
db.once('open', () => {
  console.log('Connection to Login DB');
});

router.post('/register', async (req, res) => {
  //Validate data before a user is created
  const { error } = await registerValidation(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  //Checking if a user already exists
  const emailExists = await User.findOne({ email: req.body.email });
  if (emailExists) {
    return res.status(400).send('Email already exists');
  }

  //Hash passwords
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  const hashedPassword_confirmation = await bcrypt.hash(
    req.body.password_confirmation,
    salt
  );

  const user = new User({
    email: req.body.email,
    password: hashedPassword,
    password_confirmation: hashedPassword_confirmation,
  });

  try {
    const savedUser = await user.save();
    res.send({ 'The user was created with the email': user.email });
  } catch (error) {
    res.status(404).send(error);
  }
});

router.post('/login', async (req, res) => {
  //Validate data before a user is created
  const { error } = await loginValidation(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  //Checking if the emails exists
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).send('Email is not found');
  }

  //Checking if the password is correct
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) {
    return res.status(400).send('Invalid Password');
  }

  //Create and assign a validation token
  const token = jwt.sign({ _id: user._id }, process.env.SECRET_TOKEN);
  res
    .header('authentication-token', token)
    .send(user.email + ' logged in and auth-token is generated: ' + token);
});

module.exports = router;
