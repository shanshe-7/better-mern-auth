const User = require('../models/user');
const jwt = require('jsonwebtoken');
const { secret } = require('../config');

const tokenForUser = (user) => {
  return jwt.sign(
    {
      iss: 'shanshe',
      sub: user.id,
      iat: new Date().getTime(),
      exp: new Date().setDate(new Date().getDate() + 1),
    },
    secret
  );
};

module.exports = {
  // signUp route
  signUp: async (req, res, next) => {
    try {
      const { firstname, lastname, email, password } = req.body;

      // See if user given email exists
      const findUser = await User.findOne({ email });

      if (findUser) {
        // If a user with email exists, throw error
        return res.status(422).send({ error: 'Emain already used' });
      }

      // If a user with email not exists, created and save a record
      const newUser = new User({
        firstname,
        lastname,
        email,
        password,
      });

      await newUser.save((err) => {
        if (err) return next(newUser);

        // Respond to request indicating that the user was created
        const token = tokenForUser(newUser);
        res.json({ token });
      });
    } catch (error) {
      next(error);
    }
  },

  // Sign inroute
  signIn: async (req, res, next) => {
    // Generate  token
    const token = tokenForUser(req.user);
    res.send({ token });
  },

  secret: async (req, res, next) => {
    res.send({ secret: 'resourse' });
  },
};
