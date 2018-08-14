const app = require('../app');
const dbSync = require('./syncDB');

dbSync()
  .then(result => {
    console.log('\x1b[33m%s\x1b[0m', 'dbSync Success');

    app.listen(3000, (req, res) => {
      console.log('\x1b[33m%s\x1b[0m', 'Server is Running');
    });
  })
  .catch(err => {
    console.log('\x1b[31m', 'dbSync Fail!!');
    console.error(err);
  });
