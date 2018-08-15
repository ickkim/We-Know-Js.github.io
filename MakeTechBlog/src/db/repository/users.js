const { Users } = require('../../db');

const create = (
  id,
  name,
  isman = 0,
  email = 'default@email.com',
  phone = '000-0000-0000',
) => {
  return Users.create({
    users_no: id,
    users_name: name,
    users_isman: isman,
    users_email: email,
    users_phone: phone,
  });
};

module.exports = {
  create,
};
