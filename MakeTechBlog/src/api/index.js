const express = require('express');
const router = express.Router();
const errorDB = require('../db/repository/errorLog');

router.get('/', (req, res) => {
  return res.render('index', { title: 'We Know JS' });
});

router.use('/auth', require('./auth'));
router.use('/posts', require('./posts'));

router.use((req, res) => {
  res.status(404).render('404');
});

router.use((err, req, res, next) => {
  err.status = err.status || 500;
  errorDB.create(err.status, err.stack);

  res.status(err.status).end(err.stack);
});

module.exports = router;
