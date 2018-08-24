const { UserLogin } = require('../../db');

create = (id, pw, salt) => {
  return UserLogin.create({
    userLogin_id: id,
    userLogin_pw: pw,
    userLogin_salt: salt,
  });
};

findById = id => {
  return UserLogin.find({
    users_id: id,
  });
};

module.exports = {
  create,
  findById,
};
