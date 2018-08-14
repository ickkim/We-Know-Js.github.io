const { Users } = require('../../db');

const findById = id => {
  return Users.findOne({
    where: {
      user_id: id,
    },
  });
};

module.exports = {
  findById,
};
