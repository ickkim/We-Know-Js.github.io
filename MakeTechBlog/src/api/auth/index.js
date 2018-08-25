const express = require('express');
const router = express.Router();
const ctrl = require('./auth.ctrl');
const { isLogin } = require('../../lib/validation/isAuth');

router
  .route('/login')
  .get(isLogin, ctrl.loginView)
  .post(isLogin, ctrl.login);

router
  .route('/register')
  .get(isLogin, ctrl.registerView)
  .post(isLogin, ctrl.register);

router.get('/logout', ctrl.logout);

module.exports = router;
