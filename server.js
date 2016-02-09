var express = require('express')
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
var routes = require('./routes/')
var session = require('express-session')
var MongoStore = require('connect-mongo')(session)
// var sass = require('node-sass-middleware')
var cookieParser = require('cookie-parser')
var passport = require('passport')
var app = express()

app.set('dbhost', '127.0.0.1')
app.set('dbname', 'guarded')

mongoose.connect('mongodb://' + app.get('dbhost') + '/' + app.get('dbname'))

app.set('port', process.env.PORT || 8081)
app.set('ip', process.env.IP || '127.0.0.1')

// Set static directory to /public
app.use(express.static(__dirname + '/public'))

// Set Jade as the view engine
app.set('view engine', 'jade')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: false
}))
app.locals.siteName = 'Watch List'

var sessionStore = new MongoStore({
  mongooseConnection: mongoose.connection
})

app.use(cookieParser('config.cookieSecret watch list')) // these values are temporary and will be chnaged
app.use(session({
  secret: 'config.sessionSecret  list', // these values are temporary and will be chnaged
  key: 'config.sessionSecretwatch jet set key', // these values are temporary and will be chnaged
  store: sessionStore,
  resave: true,
  saveUninitialized: true,
  cookie: {
    secure: false
  }
}))

app.use('/', routes)

app.listen(app.get('port'), app.get('ip'), function () {
  console.log('started LineUp')
})
