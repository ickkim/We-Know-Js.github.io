const express = require('express');
const router = express.Router();
const ctrl = require('./posts.ctrl');
const checkPram = require('../../lib/validation/isInteger');
const { isLogin } = require('../../lib/middleware/isAuth');
const { Checkcors } = require('../../lib/middleware/cors');

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
  .post(Checkcors, isLogin, ctrl.create);

router.get('/new', isLogin, ctrl.createView);

router.post('/file', upload.array('photo'), ctrl.uploadImage); // todo 로그인 검사하기

router
  .route('/:id')
  .get(checkPram.paramIsINT, ctrl.show)
  .put(Checkcors, checkPram.paramIsINT, ctrl.update)
  .delete(Checkcors, isLogin, checkPram.paramIsINT, ctrl.remove);

router.get('/:id/new', isLogin, checkPram.paramIsINT, ctrl.createSubView);
router
  .route('/:id/')
  .post(Checkcors, isLogin, checkPram.paramIsINT, ctrl.createSubPost);
router
  .route('/:id/:subId')
  .get(checkPram.isEdit, checkPram.paramIsINT, ctrl.showSubPost);
router.get('/:id/edit', checkPram.paramIsINT, ctrl.updateView);

module.exports = router;
