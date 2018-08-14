const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');
const morgan = require('morgan');

if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev'));
}

app.set('views', `${__dirname}/views/pages`);
app.set('view engine', 'ejs');

app.use(express.static(`${__dirname}/public`));
app.use(
  session({
    key: 'WeKnowJS',
    secret: 'WeKnowJS',
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 60 * 1000 * 60 * 3, //3시간
    },
  }),
);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', require('./api'));

module.exports = app;
