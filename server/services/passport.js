const passport = require('passport');
const User = require('../models/user');
const { secret } = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const localStrategy = require('passport-local').Strategy;
const { ExtractJwt } = require('passport-jwt');

// Options for jwt strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: secret,
};

// Create jwt strategy
const jwtLogin = new JwtStrategy(jwtOptions, async (payload, done) => {
  try {
    // Find user specified in token
    const user = await User.findById(payload.sub);

    // If user doesn't exist handle it
    if (!user) {
      return done(null, false);
    }

    // Othervise return the user
    done(null, user);
  } catch (error) {
    done(error, false);
  }
});

// using passport
passport.use(jwtLogin);

// Options for local strategy
const localStrategyOptions = { usernameField: 'email' };

// Create local strategy
const localLogin = new localStrategy(
  localStrategyOptions,
  async (email, password, done) => {
    try {
      // Find the user given email
      const user = await User.findOne({ email });

      // If user doesn't exist handle it
      if (!user) {
        return done(null, false);
      }
      // Check if password is correct
      const isMatch = await user.comparePassword(password);

      // If user doesn't exist handle it
      if (!isMatch) {
        return done(null, false);
      }

      // Othervise return the user
      done(null, user);
    } catch (error) {
      done(error, false);
    }
  }
);

// Use local strategy
passport.use(localLogin);
