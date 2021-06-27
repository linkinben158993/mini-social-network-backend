const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const dotenv = require('dotenv');
// const mongoose = require("mongoose");
const session = require('express-session');
const passport = require('passport');
const swaggerUI = require('swagger-ui-express');
const auth = require('./middlewares/auth.mdw');
require('dotenv').config();

const app = express();

dotenv.config();

// app.use(
//   session({
//     secret: process.env.secretOrKey,
//     reSave: true,
//     saveUninitialized: true,
//     cookie: { secure: false },
//   })
// );

//app.use(passport.initialize());
//app.use(passport.session());

app.enable('trust proxy');
// app.use(
//   cors({
//     credentials: true
//   })
// );

app.use(cors());

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Swagger configuration
// eslint-disable-next-line node/no-unpublished-require
const swaggerFile = require('./swagger_output.json');
app.use('/apis-doc', swaggerUI.serve, swaggerUI.setup(swaggerFile));

// // Mongo configuration
// mongoose
//     .connect(process.env.URI || 'localhost:27017', {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//     })
//     .then(() => {
//         // Test hook before test case if possible
//         app.emit('app_started');
//     })
//     .catch(() => {});

// mongoose.connection.on('connected', () => {
//     console.log('Mongo connected!');
//     // Test hook before test case if possible
//     app.emit('app_started');
// });

app.use('/', indexRouter);
app.use('/users', usersRouter);

// API Service

app.use('/api/auth', require('./routes/auth.router'));
app.use('/api/admin', require('./routes/admin.router'));
app.use('/api/hi', auth, function (req, res) {
  res.json({
    hi: 'hi'
  });
});
app.use('/api/answers', require('./routes/answer.route'));
app.use('/api/labels', require('./routes/label.route'));
app.use('/api/questioncategories', require('./routes/questionCategory.route'));
app.use('/api/questionQueue', require('./routes/questionQueue.route'));
app.use(
  '/api/questionQueueLabel',
  require('./routes/questionQueueLabel.route')
);
app.use('/api/rating-answers', require('./routes/ratingAnswer.route'));
app.use('/api/rating-questions', require('./routes/ratingQuestion.route'));
app.use('/api/users', require('./routes/users'));

// const CronJob = require("./utils/node-cron");
//
// CronJob.autoFilterAnswer();

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
