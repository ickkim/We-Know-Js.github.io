const userDB = require('../../db/Repository/users');
const loginDB = require('../../db/Repository/userLogin');
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

register = async (req, res, next) => {
  const { id, pw, name, email, sex, phone } = req.body;

  console.log(req.body);
  console.log(id, pw, name, email, sex, phone);
  let result, transaction;

  try {
    transaction = await db.sequelize.transaction();

    result = await loginDB.create(id, pw, 2222);
    const userNo = result.dataValues.userLogin_no;
    await userDB.create(userNo, name);
    await transaction.commit();
  } catch (e) {
    await transaction.rollback();
    return next(e);
  }

  console.dir(result.dataValues.userLogin_no);
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
