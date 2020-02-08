const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const User = require('../models/User');

// Passport/Google Config
// Use the GoogleStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and Google
//   profile), and invoke a callback with a user object.
console.log('Google Client Id', process.env.GOOGLE_CLIENT_ID);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

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
      const email = profile.emails[0].value;

      User.findOne({ email }).then(async currentUser => {
        if (currentUser) {
          // User already exists
          console.log('user is:', currentUser);
          if (!currentUser.googleId) {
            // Link google if not already linked
            console.log('user is not linked to google');
            try {
              await currentUser.updateOne({
                $set: { googleId: profile.id }
              });
              console.log('Updated user', currentUser);
              done(null, currentUser);
            } catch (err) {
              console.log('Error updating user', err.message);
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
