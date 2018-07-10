// Passport js configuration
const passport = require('passport'),
      LocalStrategy = require('passport-local').Strategy,
      bcrypt = require('bcrypt-nodejs');


// Configure Passport authenticated session persistence.
//
// In order to restore authentication state across HTTP requests, Passport needs
// to serialize users into and deserialize users out of the session.  The
// typical implementation of this is as simple as supplying the user ID when
// serializing, and querying the user record by ID from the database when
// deserializing.
passport.serializeUser((user, cb) => {
  cb(null, user.id);
});

passport.deserializeUser((id, cb) => {
  User.findOne({ id }, (err, user) => {
    cb(err, user);
  });
});


// Configure the local strategy for use by Passport.
//
// The local strategy require a `verify` function which receives the credentials
// (`username` and `password`) submitted by the user.  The function must verify
// that the password is correct and then invoke `cb` with a user object, which
// will be set at `req.user` in route handlers after authentication.
passport.use(new LocalStrategy({
  usernameField: 'username',
  passportField: 'password'
}, (username, password, cb) => {
  User.findOne({ username: username }, (err, user) => {
    if (err) return cb(err);

    // Error if user is not found
    if (!user) return cb(null, false, { message: 'Username not found' });

    // Start comparing password with encrypted password inside database
    bcrypt.compare(password, user.password, (err, res) => {
      // Error if the password does not match
      console.log(user)
      if(!res) return cb(null, false, { message: 'Invalid Password' });

      delete user.password;
      return cb(null, user, { message: 'Login successful' });
    });
  });
}));