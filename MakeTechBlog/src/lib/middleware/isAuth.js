function isLogin(req, res, next) {
  if (req.session.isLogin === undefined || !req.session.isLogin)
    return res.render('error/unauthorized');
  next();
}

module.exports = {
  isLogin,
};
