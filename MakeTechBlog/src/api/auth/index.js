const express = require('express');
const router = express.Router();
const ctrl = require('./auth.ctrl');

router.get('/', ctrl.loginView);

router.post('/login', ctrl.login);
router.route('/register').get((req, res) => {
  res.send('auth/register 페이지');
});
router.post('/register', ctrl.login);

// router.route("/").post((req, res) => {
//   const { id, pw } = req.body;
//   console.log(`id는 ${id} pw는 ${pw} 입니다.`);

//   crypto.randomBytes(64, (err, buf) => {
//     console.log(`buf is ${buf}`);
//     crypto.pbkdf2(
//       pw,
//       buf.toString("base64"),
//       100000,
//       64,
//       "sha512",
//       (err, key) => {
//         console.log(key.toString("base64")); // 'dWhPkH6c4X1Y71A/DrAHhML3DyKQdEkUOIaSmYCI7xZkD5bLZhPF0dOSs2YZA/Y4B8XNfWd3DHIqR5234RtHzw=='
//       }
//     );
//   });
//   res.send(`id는 ${id} pw는 ${pw} 입니다.`);
// });

module.exports = router;
