const UserModel = require('../models/user');
const jwt = require('jsonwebtoken');
// const {body, checkSchema, validationResult} = require('express-validator');
const argon2 = require('argon2');

module.exports.register = async (req, res) => {
  const { email, password, username } = req.body;

  try {
    const userExist = await UserModel.findOne({ email: email });

    if (userExist) {
      return res.status(403).json({
        message: 'user already exist',
      });
    }
    const newUser = new UserModel({
      username,
      email,
      password: await argon2.hash(password),
    });

    await newUser.save();
    res.status(201).json({
      message: "'Successfully registered 😏 🍀'",
    });
  } catch (err) {
    const errors = await registerErrors(err);
    res.status(500).json({ message: errors });
  }
};

module.exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email: email });

    if (!user) {
      return res.status(403).json({
        message: 'bad user or password',
      });
    }

    const verified = await argon2.verify(user.password, password);

    if (!verified) {
      res.status(403).json({
        message: 'bad user or password',
      });
    }

    const accessToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.TOKEN_SECRET,
      { expiresIn: '3d' }
    );

    res.status(200).cookie('jwt', accessToken).json({
      credential: accessToken,
      message: 'Successfully logged in 😏 🍀',
    });
  } catch (err) {
    const errors = await loginErrors(err);
    res.status(401).json({ message: errors });
  }
};

module.exports.logout = (req, res) => {
  res.clearCookie('jwt').status(200).json({
    message: 'Successfully loggout 😏 🍀',
  });
};
