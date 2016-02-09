var express = require('express')
var passport = require('passport')
var User = require('../../models/User')
var router = module.exports = express.Router()

router.use(passport.initialize())
router.use(passport.session())

passport.use('twitter', require('./twitter'))

passport.serializeUser(function (user, done) {
  done(null, user.id)
})

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user)
  })
})

router.get('/login/twitter', passport.authenticate('twitter'))

router.get('/login/twitter/return',
  passport.authenticate('twitter', { failureRedirect: '/login' }),
    function (req, res) {
      // Successful authentication
      res.json(req.user)
    })
