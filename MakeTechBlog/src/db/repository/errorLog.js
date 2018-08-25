const { errorLog } = require('../../db');

const create = (status, content) => {
  return errorLog.create({
    status,
    content,
  });
};

module.exports = {
  create,
};
