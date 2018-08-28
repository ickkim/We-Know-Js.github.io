const express = require('express');
const router = express.Router();
const ctrl = require('./posts.ctrl');
const checkPram = require('../../lib/validation/isInteger');
const { isLogin } = require('../../lib/middleware/isAuth');

const multer = require('multer');
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'src/uploads/images');
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

router
  .route('/')
  .get(ctrl.list)
  .post(isLogin, ctrl.create);

router.get('/new', isLogin, ctrl.createView);

router.post('/file', upload.array('photo'), ctrl.uploadImage); // todo 로그인 검사하기

router
  .route('/:id')
  .get(checkPram.paramIsINT, ctrl.show)
  .put(isLogin, checkPram.paramIsINT, ctrl.update)
  .delete(isLogin, checkPram.paramIsINT, ctrl.remove);

router.get('/:id/new', isLogin, checkPram.paramIsINT, ctrl.createSubView);

router.route('/:id/').post(isLogin, checkPram.paramIsINT, ctrl.createSubPost);

router.route('/:id/:subId').get(checkPram.paramIsINT, ctrl.showSubPost);

module.exports = router;
