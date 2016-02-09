var TwitterStrategy = require('passport-twitter').Strategy
var User = require('../../models/User')
var twitter = new TwitterStrategy({
  consumerKey: 'xSWwaTNQIt6c8A5LM6lK6f953',
  consumerSecret: '56XKrxUK2FTRCvb4jythc2deFW5aJMjN2dfTfhUYfvd0abt2cN',
  callbackURL: 'http://127.0.0.1:8081/login/twitter/return'
},
function (token, tokenSecret, profile, cb) {
  process.nextTick(function () {
    User.findOne({
      'twitter.id': profile.id
    }, function (err, user) {
      if (err) {
        return cb(err)
      }
      if (user) {
        return cb(null, user)
      } else {
        var newUser = new User()
        newUser.twitter.id = profile.id
        newUser.twitter.token = token
        newUser.twitter.username = profile.username
        newUser.twitter.displayName = profile.displayName
        newUser.save(function (err) {
          if (err) {
            throw err
          }
          return cb(null, newUser)
        })
      }
    })
  })
})
module.exports = twitter
