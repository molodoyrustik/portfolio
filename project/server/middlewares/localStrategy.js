const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const User = require('../models/User');
var user = {};

passport.serializeUser(function (user, done) {
  done(null, user.id);
});
passport.deserializeUser(function (id, done) {
  done(null, user);
});

passport.use('local', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
},
(email, password, done) => {
  User
    .findOne({email: email})
    .then(item => {
      user = {
        email: item.email,
        password: item.password,
        id: item.id
      };
      item.verifyPassword(password)
      .then((pass) => {
        if (email === user.email && pass) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      })
     
    });
}));