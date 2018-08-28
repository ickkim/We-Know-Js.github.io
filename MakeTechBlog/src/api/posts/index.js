const express = require('express');
const router = express.Router();
const ctrl = require('./posts.ctrl');

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
  .post(ctrl.create);

router.get('/new', ctrl.createView);

router.post('/file', upload.array('photo'), ctrl.uploadImage);

router
  .route('/:id')
  .get(ctrl.show)
  .put(ctrl.update)
  .delete(ctrl.remove);

router.get('/:id/new', ctrl.createSubView);

router.route('/:id/').post(ctrl.createSubPost);

router.route('/:id/:subId').get(ctrl.showSubPost);

module.exports = router;
