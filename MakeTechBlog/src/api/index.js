const express = require('express');
const router = express.Router();
const errorDB = require('../db/repository/errorLog');
const postDB = require('../db/repository/posts');

router.get('/', async (req, res) => {
  let list = await postDB.findAllList();

  return res.render('index', { list });
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
