const userDB = require('../../db/repository/users');
const loginDB = require('../../db/repository/userLogin');
const db = require('../../db');
const validation = require('../../lib/validation/validation');
const bcrypt = require('bcrypt');

loginView = (req, res) => {
  res.render('login');
};

login = async (req, res, next) => {
  let { id, pw } = req.body;

  if (!validation.arrayElementIsString([id, pw])) {
    return res.status(400).json('입력이 올바르지 않습니다.');
  }

  if (!(validation.isLength(id, 5, 20) && validation.isLength(pw, 5, 20))) {
    return res.status(400).json('입력이 올바르지 않습니다.');
  }

  id = id.toLowerCase();
  pw = pw.toLowerCase();

  const checkId = await loginDB.findById(id);
  let { no, hash } = checkId.dataValues;

  if (!(await bcrypt.compare(pw, hash))) {
    return res.status(404).json('아이디 혹은 패스워드가 일치하지 않습니다.');
  }
  console.log(`같음`);
  req.session.isLogin = true;
  req.session.userid = no;
  return res.status(200).end();
};

register = async (req, res, next) => {
  let { id, pw, nickname } = req.body;

  if (!validation.arrayElementIsString([id, pw, nickname])) {
    return res.status(400).json('입력이 올바르지 않습니다.');
  }

  if (
    !(
      validation.isLength(id, 5, 20) &&
      validation.isLength(pw, 5, 20) &&
      validation.isLength(nickname, 2, 20)
    )
  ) {
    return res.status(400).json('입력이 올바르지 않습니다.');
  }

  id = id.toLowerCase();
  pw = pw.toLowerCase();
  let isExistId;
  try {
    isExistId = await loginDB.findById(id);
  } catch (e) {
    return next(e);
  }

  if (isExistId) {
    return res.status(400).json('이미존재하는 아이디입니다.');
  }

  let salt;
  let hash;
  try {
    salt = await bcrypt.genSalt(11);
    hash = await bcrypt.hash(pw, salt);
  } catch (e) {
    return next(e);
  }

  let result, transaction;
  try {
    transaction = await db.sequelize.transaction();

    result = await loginDB.create(id, hash, transaction);
    const userNo = result.dataValues.no;
    await userDB.create(userNo, id, nickname, transaction);
    await transaction.commit();
  } catch (e) {
    await transaction.rollback();
    return next(e);
  }

  return res.status(200).end();
};

registerView = (req, res) => {
  return res.render('register');
};

logout = (req, res, next) => {
  req.session.destroy(err => {
    if (err) {
      console.log(err);
      return next(err);
    }
    res.clearCookie('WeKnowJS');
    res.redirect('/');
  });
};

module.exports = {
  login,
  loginView,
  register,
  registerView,
  logout,
};
