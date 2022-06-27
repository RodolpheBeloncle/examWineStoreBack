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
      return res.status(403).json({
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

    const { username, profilPic } = user;

    return res.status(200).cookie('jwt', accessToken).json({
      currentUser: true,
      credential: user._id,
      username: username,
      profilPic: profilPic,
    });
  } catch (err) {
    return res.status(401).json({ message: err });
  }
};

module.exports.logout = (req, res) => {
  let { currentUser } = req.body;
  currentUser = false;
  res.clearCookie('jwt').status(200).json(currentUser);
};
