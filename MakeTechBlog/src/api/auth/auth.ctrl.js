const userDB = require('../../db/repository/users');
const loginDB = require('../../db/repository/userLogin');
const db = require('../../db');

loginView = (req, res) => res.render('login');

login = async (req, res, next) => {
  const { id, pw } = req.body;
  const lenID = id.length;
  const lenPW = pw.length;
  if (lenID < 5 || lenID > 20 || lenPW < 5 || lenPW > 25) {
    const err = new Error();
    err.status = 400;
    err.message = '형식이 올바르지 않습니다.';
    return next(err);
  }

  const checkId = await loginDB.findById(id);
  if (!checkId) {
    let err = new Error();
    err.status = 404;
    err.message = 'login fail';
    return next(err);
  }

  if (checkId.dataValues.userLogin_pw !== pw) {
    let err = new Error();
    err.status = 404;
    err.message = 'login fail';
    return next(err);
  }
  req.session.userid = checkId.dataValues.userLogin_no;
  return res.send('로그인 성공');
};

register = async (req, res, next) => {
  const { id, pw, email, alias, phone } = req.body;

  console.log(req.body);
  console.log(id, pw, alias, email, phone);
  let result, transaction;

  try {
    transaction = await db.sequelize.transaction();

    result = await loginDB.create(id, pw, 2222);
    const userNo = result.dataValues.userLogin_no;
    await userDB.create(userNo, id);
    await transaction.commit();
  } catch (e) {
    await transaction.rollback();
    console.error(e);
    return next(e);
  }

  console.dir(result.dataValues.userLogin_no);
  return res.send('회원가입..');
};

registerView = (req, res) => {
  // TODO : SESSION 있으면 Histroy back...처리
  return res.render('register');
};

logout = (req, res) => {};

module.exports = {
  login,
  loginView,
  register,
  registerView,
  logout,
};
