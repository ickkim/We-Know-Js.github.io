const express = require('express');
const router = express.Router();
const ctrl = require('./posts.ctrl');

router
  .route('/')
  .get(ctrl.list)
  .post(ctrl.create);

router.get('/new', ctrl.createView);

router
  .route('/:id')
  .get(ctrl.show)
  .put(ctrl.update)
  .delete(ctrl.remove);

module.exports = router;
