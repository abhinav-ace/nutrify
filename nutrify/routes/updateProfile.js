const router = require('express').Router();
const updateProfileModel = require('../model/updateProfile.js');
router.post('/updateProfile', updateProfileModel.updateProfile);
module.exports = router;