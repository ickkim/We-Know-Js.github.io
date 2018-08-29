function isLogin(req, res, next) {
  if (req.session.isLogin === undefined || !req.session.isLogin)
    return res.status(401).render('error/unauthorized');
  next();
}

module.exports = {
  isLogin,
};
