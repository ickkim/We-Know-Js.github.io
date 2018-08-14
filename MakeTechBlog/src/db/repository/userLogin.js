const { UserLogin } = require('../../db');

const create = () => {
  return UserLogin.create({
    userLogin_id: 'dsadsadsadsadsadssdsdsdsad',
    userLogin_pw: 'ds2121dsa',
    userLogin_salt: '112321',
  });
};

module.exports = {
  create,
};
