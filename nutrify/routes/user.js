const router = require('express').Router();
const userModel = require('../model/user.js');
router.get('/:id', userModel.getUser);
module.exports = router;