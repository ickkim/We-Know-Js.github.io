function isLogin(req, res, next) {
  if (req.session.isLogin === undefined || !req.session.isLogin) return next();
  return res.send('이미로그인중이당');
}

module.exports = {
  isLogin,
};
