const { UserLogin } = require('../../db');

create = (id, pw, salt = '11', transaction) => {
  return UserLogin.create(
    {
      id,
      pw,
      salt,
    },
    { transaction },
  );
};

findById = id => {
  return UserLogin.findOne({
    where: {
      id,
    },
  });
};

module.exports = {
  create,
  findById,
};
