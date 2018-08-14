const db = require('../db');

module.exports = () => {
  //return db.sequelize.sync({}); // db sync

  return db.sequelize.sync({ force: true }); // dbsync + db 삭제후 다시 만듬.. 데이터삭제됨 주의..
};
