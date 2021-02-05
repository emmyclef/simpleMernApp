'use strict';
var debug = require('debug');
var express = require('express');
var path = require('path');
// var cors = require('cors');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();
var Website = require('./models/website')




mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/websi', {
   useNewUrlParser: true,
   useUnifiedTopology: true,
})

mongoose.connection.on('connected', () => {
   console.log('Mongoose is connected!!!')
})


app.use(express.json());
app.use(express.urlencoded({ extended: false}));


// const data = {
//     title: "Welcome to Nibtech",
//     body: "This is a demo program about my Back end developement stuffs"
// };

// const newWebsite = new Website(data); // instance of the model

// newWebsite.save((error) => {
//  if (error) {
//      console.log("oops, something happened")
//  } else {
//      console.log("data has been saved!!")
//   }
// });






// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use(cors());
//http request
app.use('/', routes);
app.use('/users', users);


if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
}

app.get('/api/rates', function (req, res) {
 res.sendFile('index.html');
});


// catch 404 and forward to error handler
// app.use(function (req, res, next) {
//     var err = new Error('Not Found');
//     err.status = 404;
//     next(err);
// });

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

app.set('port', process.env.PORT || 8080);

var server = app.listen(app.get('port'), function () {
    console.log("server started running", new Date().toString("hh:mm tt"))
    debug('Express server listening on port ' + server.address().port);
});
