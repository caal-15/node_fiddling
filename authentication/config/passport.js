var passportLocal = require('passport-local');
var User = require('../models/user.js');

module.exports = function (passport) {
  //session serialization
  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });
  //deserialization
  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    })
  });

  //local signup strategy
  passport.use('local-signup', new passportLocal({passReqToCallback : true},
    function (req, username, password, done) {
      process.nextTick(function () {
        User.findOne({'username': username}, function (err, user) {
          if (err)
            return done(err);
          if (user){
            return done(null, false);
          } else {
            var newUser = new User({
              'username': username,
              'password': password,
              'role': 'standard'
            });

            newUser.save(function (err) {
              if (err)
                throw err;
              return done(null, newUser, {message: 'OK'})
            });
          }
        })
      });
    }
  ));

  passport.use('local-signin', new passportLocal({passReqToCallback: true},
    function (req, username, password, done) {
      User.findOne({'username': username}, function (err, user) {
        console.log('here');
        if (err)
          return done(err);
        //No user found
        if (!user)
          return done(null, false);
        //Incorrect password
        if (user.password != password)
          return done(null, false);
        //All checks out
        return done(null, user, {message: 'OK'});
      });
    }
  ));
}
