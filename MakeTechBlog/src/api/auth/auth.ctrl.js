const userDB = require('../../db/Repository/users');
const loginDB = require('../../db/Repository/userLogin');
const db = require('../../db');
const crypto = require('crypto');
const constants = require('constants');

const padding = constants.string;
const pub = `-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDv/3H5l/j/W3vpnsWLgJnlUuLc
s2lzwzXEwmNB318WGWJGPIAbY3j8OY7dn3GeqRIOXIHK0w9wRZZLHC3MY/mHxtnb
NT+AzNbC/J/N+ZzYi9oXuDbGKZA5K8RKbne2f6ykYxkHv6VbHTdELTcktamhqXTc
piYcygskW7qyi1wboQIDAQAB
-----END PUBLIC KEY-----`;
const pre = `-----BEGIN RSA PRIVATE KEY-----
MIICXgIBAAKBgQDv/3H5l/j/W3vpnsWLgJnlUuLcs2lzwzXEwmNB318WGWJGPIAb
Y3j8OY7dn3GeqRIOXIHK0w9wRZZLHC3MY/mHxtnbNT+AzNbC/J/N+ZzYi9oXuDbG
KZA5K8RKbne2f6ykYxkHv6VbHTdELTcktamhqXTcpiYcygskW7qyi1wboQIDAQAB
AoGAImiJOrOjK1k+ZrwwrlN9vPcpN2MxlztBljgYavVPeKejA1bhNwwH6IGIDhYy
AAFVaWGx6hZgfEQ9y/76QfeDasDq/n53c2TwY9fICy2FIpX4hA1vw3MT4otBBlo2
eXMmBGz0UniOEjvN23uVq3aFe4P6O0vymoc4GBnFM22c6cECQQD+C+VPPX9rbogs
Aj1EQNynKF3eVUGJmOo+S5zxuSCC/Zs645r7kAygQVh61zamAqH1QB8M2pfUW644
ktiL7lX9AkEA8dfk234V97MwPSpKQ1rkKNUy/IraURSwfY7dyY39Jjh5b+YZ6lJC
xqFeolKo9gQDsk5DJuuoAJ8GDW7EO8u7dQJBAO7O8+IHJ04v+yWTfVA5wLIJiiPD
9PWJnzisD35SzjMUfuVeq4Oqp5PFmYzv3dk0RFaszgNhQLRI8n8P2yu/AWkCQQDx
LOfhq9+kYWHd3WqpuN6HifWKu73z1bobvHmZIqwtjWwtFz8I2ngVNZ/2KJCuplo5
WqrFCYVE+VFD3A59wzJxAkEA/W744wafuCMooOJIYefwhqd8w1mn3uihkCDvwi9g
u1qp1uC1dU/Gm3la1XDl3mfeeoIfdohwdY0RT85UY9WV2A==
-----END RSA PRIVATE KEY-----
`;

const loginView = (req, res) => res.render('login');

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

const register = async (req, res, next) => {
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
    res.locals.message = e.name;
    res.locals.status = 500;
    console.error(e);
    await transaction.rollback();
    return next(e);
  }

  console.dir(result.dataValues.userLogin_no);
};

const registerView = (req, res) => {
  // TODO : SESSION 있으면 Histroy back...처리
  var msg = new Buffer('hehehoho', 'utf8');
  console.log(msg.toString());

  var clr = crypto.publicEncrypt(pub, msg);
  console.log(clr.toString('base64'));

  var sig = crypto.privateDecrypt(pre, clr);
  console.log(sig.toString());

  res.locals.crypto = crypto;
  return res.render('register', { publicKey: pub, crypto });
};

// const registerView = (req, res) => {
//   // TODO : SESSION 있으면 Histroy back...처리
//   var msg = new Buffer('hehehoho', 'utf8');
//   console.log(msg.toString());

//   var clr = crypto.publicEncrypt(pub, msg);
//   console.log(clr.toString('base64'));

//   var sig = crypto.privateDecrypt(pre, clr);
//   console.log(sig.toString());

//   return res.render('register');
// };

const logout = (req, res) => {};

module.exports = {
  login,
  loginView,
  register,
  registerView,
  logout,
};
