var mongoose = require('mongoose')
var Schema = mongoose.Schema

// create User Schema
var User = new Schema({
  name: String,
  twitterId: String,
  twitter: {
    id: String,
    token: String,
    displayName: String,
    username: String
  },
  someID: String
})

module.exports = mongoose.model('user', User)
