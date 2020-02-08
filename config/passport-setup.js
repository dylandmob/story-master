const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const User = require('../models/User');

// Passport/Google Config
// Use the GoogleStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and Google
//   profile), and invoke a callback with a user object.
console.log('Google Client Id', process.env.GOOGLE_CLIENT_ID);

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/auth/google/callback'
    },
    (accessToken, refreshToken, profile, done) => {
      console.log('Google AccessToken', accessToken);
      console.log('Google profile', profile);

      User.findOne({ googleId: profile.id }).then(currentUser => {
        if (currentUser) {
          // User already exists
          console.log('user is:', currentUser);
          done(null, currentUser);
        } else {
          // New user
          new User({
            googleId: profile.id,
            name: profile.displayName,
            email: profile.emails[0].value,
            imageUrl: profile.picture
          })
            .save()
            .then(newUser => {
              console.log('new user created:', newUser);
              done(null, newUser);
            })
            .catch(err => {
              console.log('Error creating a new user', err.message);
              done(err);
            });
        }
      });
    }
  )
);
