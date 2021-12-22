const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

let storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()} - ${Math.round(Math.random() * 1e9)}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  },
});

let upload = multer({
  dest: storage,
  limits: { fileSize: 1000000 * 100 },
}).single('myFile');

router.post('/files', (req, res) => {
  //validate request
  if (!req.file) {
    return res.status(404).json({
      sucess: false,
      message: 'All Fields are required',
    });
  }

  //store file

  upload(req, res, (err) => {
    if (err) {
      return res.status(500).json({
        sucess: false,
        message: err.message || 'Error uploading files',
      });
    }
  });
});

module.exports = router;
