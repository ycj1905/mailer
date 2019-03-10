
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const key = require('../config/key');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
  // done(errorCalbk, ..)
  // user ID is not profile id, is MongoDB Object ID,
  // we can use of different authentication providers
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(new GoogleStrategy({
    clientID: key.GOOGLE_CLIENT_ID,
    clientSecret: key.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback"
  },
  async (accessToken, refreshToken, profile, done) => {
    const existingUser = await User.findOne({ googleId: profile.id });

    if (existingUser) {
      return done(null, existingUser);
    }

    const user = await new User({
        googleId: profile.id
      }).save();
    
    done(null, user);
  }
));