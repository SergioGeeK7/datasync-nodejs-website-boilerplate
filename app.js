const createError = require('http-errors')
const express = require('express')
const logger = require('morgan')
const app = express()
const nunjucks = require('nunjucks')

// setting view and nunjuks configuration
app.set('view engine', 'html')

// configure nunjucks
nunjucks.configure('views', {
  autoescape : false,
  express   : app
})

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
// TODO: check cookie parser
// app.use(cookieParser())

//setting static files
app.use('/static',express.static(__dirname + '/public'))

//requiring routes
require('./routes')(app)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404))
})

// error handler
app.use(function(err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

export { app }
