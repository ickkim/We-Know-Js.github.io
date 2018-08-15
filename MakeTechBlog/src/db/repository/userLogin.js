const { UserLogin } = require('../../db');

const create = (id, pw, salt) => {
  return UserLogin.create({
    userLogin_id: id,
    userLogin_pw: pw,
    userLogin_salt: salt,
  });
};

module.exports = {
  create,
};
