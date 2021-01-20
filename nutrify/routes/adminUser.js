const router = require('express').Router();
const adminUserModel = require('../model/adminUser.js');
router.post('/deleteUser', adminUserModel.deleteUser);
router.get('/getUser', adminUserModel.getUser);
router.post('/editUser', adminUserModel.editUser);
module.exports = router;