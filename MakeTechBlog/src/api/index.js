const express = require('express');
const router = express.Router();
const errorDB = require('../db/repository/errorLog');

router.get('/', async (req, res) => {
  return res.status(301).redirect('/posts');
});

router.get('/about', async (req, res) => {
  if (req.session.isLogin) return res.render('team/aboutTeam');
  return res.render('noauth/aboutTeam');
});

router.use('/auth', require('./auth'));
router.use('/posts', require('./posts'));

router.use(function NotFound(req, res) {
  if (req.session.isLogin) return res.status(404).render('team/404');
  res.status(404).render('noauth/404');
});

router.use((err, req, res, next) => {
  err.status = err.status || 500;
  err.message = err.message || 'Server Error';
  //errorDB.create(err.status, err.stack);

  res.status(err.status).end(err.message);
});

module.exports = router;
