const express = require('express');
const router = express.Router();

const file = require('../controllers/fileControllers');

router.get('/:uuid', file.show);
router.get('/download/:uuid', file.download);

module.exports = router;
