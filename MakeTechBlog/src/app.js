const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');
const morgan = require('morgan');
const helmet = require('helmet');

// if (process.env.NODE_ENV !== 'test') {
//   app.use(morgan('dev'));
// }

app.set('views', `${__dirname}/views/pages`);
app.set('view engine', 'ejs');
app.set('port', process.env.port || 80);

app.use(helmet());
app.use(express.static(`${__dirname}/public`));
app.use(express.static(`${__dirname}/uploads`));
app.set('trust proxy', 1);
app.use(
  session({
    key: 'sessionid',
    secret: '비밀입니다만..?',
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 60 * 1000 * 60 * 3, //3시간
      httpOnly: true,
      secure: true,
    },
  }),
);
app.disable('x-powered-by');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: '50mb' }));

app.use('/', require('./api'));

module.exports = app;
