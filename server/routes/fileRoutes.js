const express = require('express');
const router = express.Router();

const file = require('../controllers/fileControllers');
router.post('/files', file.upload);
router.post('/files/send', file.send);

module.exports = router;
