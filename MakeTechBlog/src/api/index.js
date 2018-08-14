const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  return res.render('index.ejs', { title: 'We Know JS' });
});

router.use('/auth', require('./auth'));

router.use((req, res, next) => {
  res.locals.message = 'NOT FOUND';
  res.locals.status = 404;
  return next(err);
});

router.use((err, req, res, next) => {
  const { message, status } = res.locals;

  //TODO : 에러 DB 저장하기 ,, ERROR처리 개선찾아보기 BY Jonghwa

  if (Number.isNaN(status)) {
    console.log('으이구 숫자하나 입력못하니 ..? status code 입력 잘못했다..');
  }
  return res.status(status).send(message);
});

module.exports = router;
