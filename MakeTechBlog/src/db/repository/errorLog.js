const { errorLog } = require('../../db');

const create = (status, content) => {
  return errorLog.create({
    errorLog_status: status,
    errorLog_content: content,
  });
};

module.exports = {
  create,
};
