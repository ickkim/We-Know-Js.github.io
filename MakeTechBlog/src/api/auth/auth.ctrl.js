const crypto = require('crypto');
const userDB = require('../../db/Repository/users');

const loginView = (req, res) => {
  return res.render('login');
};

const login = async (req, res, next) => {
  const { id, pw } = req.body;
  const lenID = id.length;
  const lenPW = pw.length;
  if (lenID < 5 || lenID > 20 || lenPW < 5 || lenPW > 25) {
    const err = new Error();
    err.status = 400;
    err.message = '형식이 올바르지 않습니다.';
    return next(err);
  }

  const checkId = await userDB.findById(id);
  if (!checkId) {
    let err = new Error();
    err.status = 404;
    err.message = '존재하지 않는 아이디 입니다.';
    return next(err);
  }
  if (pw !== checkId.user_pw) {
    let err = new Error();
    err.status = 401;
    err.message = '패스워드가 올바르지 않습니다.';
    return next(err);
  }

  req.session.userid = checkId.user_id;

  return res.json({ id: checkId.user_id });
};

module.exports = {
  login,
  loginView,
};
