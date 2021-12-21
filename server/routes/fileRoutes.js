const express = require("express");
const router = express.Router();
const multer = require("multer");

let storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename:(req,file,cb)=>{}
});

router.post("/files", (req, res) => {
  if (!req.file) {
    return res.status(404).json({
      sucess: false,
      message: "All Fields are required",
    });
  }
  res.status(200).json({
    sucess: true,
    message: "File uploaded sucessfully",
  });
});

module.exports = router;
