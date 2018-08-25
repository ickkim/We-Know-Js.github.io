const express = require('express');
const router = express.Router();
const errorDB = require('../db/repository/errorLog');
const postDB = require('../db/repository/posts');

router.get('/', async (req, res) => {
  let list = await postDB.findAllList();

  return res.render('noauth/index', { list });
});

router.get('/about', async (req, res) => {
  return res.render('noauth/aboutTeam');
});

router.use('/auth', require('./auth'));
router.use('/posts', require('./posts'));

router.use((req, res) => {
  res.status(404).render('noauth/404');
});

router.use((err, req, res, next) => {
  err.status = err.status || 500;
  err.message = err.message || 'Server Error';
  //errorDB.create(err.status, err.stack);

  res.status(err.status).end(err.message);
});

module.exports = router;
