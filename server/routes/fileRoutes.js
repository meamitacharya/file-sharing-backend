const express = require('express');
const router = express.Router();

const file = require('../controllers/fileControllers');
router.post('/files', file.upload);
router.post('/send', file.send);

module.exports = router;
