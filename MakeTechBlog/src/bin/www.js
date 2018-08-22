const app = require('../app');
const dbSync = require('./syncDB');
require('dotenv').config();

dbSync()
  .then(result => {
    console.log('\x1b[33m%s\x1b[0m', 'dbSync Success');

    app.listen(app.get('port'), (req, res) => {
      console.log('\x1b[33m%s\x1b[0m', 'Server is Running');
    });
  })
  .catch(err => {
    console.log('디비페일');
    //console.log('\x1b[31m', 'dbSync Fail!!');
    console.info(err);
  });
