const express = require('express');
const router = express.Router();

const ctrl = require('../controllers/monitor.controller');

router.get('/', ctrl.monitor);

module.exports = router;
