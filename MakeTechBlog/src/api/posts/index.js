const express = require('express');
const router = express.Router();
const ctrl = require('./posts.ctrl');

router.route('/').get(ctrl.createView);

module.exports = router;
