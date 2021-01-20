const router = require('express').Router();
const authModel = require('../model/auth.js');
router.post('/signup', authModel.createUser);
router.post('/signin', authModel.verifyUser);
module.exports = router;