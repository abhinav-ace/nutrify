const router = require('express').Router();
const dashboardModel = require('../model/dashboard.js');
router.post('/getToday', dashboardModel.getToday);
module.exports = router;