const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const User = require('../models/User');

// Passport/Google Config
// Use the GoogleStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and Google
//   profile), and invoke a callback with a user object.

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/auth/google/callback',
    },
    (accessToken, refreshToken, profile, done) => {
      const email = profile.emails[0].value;

      User.findOne({ email }).then(async (currentUser) => {
        if (currentUser) {
          // User already exists
          if (!currentUser.googleId) {
            // Link google if not already linked
            try {
              await currentUser.updateOne({
                $set: { googleId: profile.id },
              });
              done(null, currentUser);
            } catch (err) {
              done(err);
            }
          } else {
            done(null, currentUser);
          }
        } else {
          // New user
          new User({
            googleId: profile.id,
            name: profile.displayName,
            email: profile.emails[0].value,
            imageUrl: profile.photos[0].value,
          })
            .save()
            .then((newUser) => {
              done(null, newUser);
            })
            .catch((err) => {
              done(err);
            });
        }
      });
    }
  )
);
