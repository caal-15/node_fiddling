var User = require('../models/user.js');

//routes
module.exports = function (app, passport) {
  //Restricted access to kittens
  app.get('/kittens', isLoggedIn, function (req, res) {
    res.end('Miau');
  });

  app.get('/puppies', isAdmin, function (req, res) {
    res.end('Guau');
  });

  //Logout
  app.get('/logout', function (req, res) {
    //In THIS order
    req.logOut();
    req.session.destroy(function (err) {
      res.end('Session terminated');
    });

  })

  app.post('/signin', passport.authenticate('local-signin'), function (req, res) {
    res.end(req.authInfo.message);
  });

  app.post('/signup', passport.authenticate('local-signup'), function (req, res) {
    res.end(req.authInfo.message);
  });

};

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated())
    return next();
  else
    return res.end('Not_logged');
}

function isAdmin(req, res, next){
  if (req.isAuthenticated()){
    if (req.user.role === 'admin')
      return next();
    else
      return res.end('Not_Admin')
  } else {
    return res.end('Not_logged');
  }

}
