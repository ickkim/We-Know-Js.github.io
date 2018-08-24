const { Users } = require('../../db');

create = (no, id, email = 'default@email.com', phone = '000-0000-0000') => {
  return Users.create({
    users_no: no,
    user_alias: '테스트',
    users_email: email,
    users_phone: phone,
    users_id: id,
  });
};

module.exports = {
  create,
};
