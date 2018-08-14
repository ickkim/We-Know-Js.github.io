const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  return res.render('index.ejs', { title: 'We Know JS' });
});

router.use('/auth', require('./auth'));

router.use((req, res, next) => {
  const err = new Error();
  err.status = 404;
  err.message = 'NOT FOUND';
  return next(err);
});

router.use((err, req, res, next) => {
  const { message, status } = err;
  if (Number.isNaN(status)) {
    console.log('status code 입력 잘못했음..');
  }
  res.status(status).send(message);
});

module.exports = router;
