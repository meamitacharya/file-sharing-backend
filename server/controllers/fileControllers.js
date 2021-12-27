const upload = require('../utils/upload');
const File = require('../models/FileModel');
const { v4: uuidV4 } = require('uuid');

exports.upload = (req, res) => {
  //store file
  upload(req, res, async (err) => {
    console.log(req.file);
    try {
      //   validate request
      if (!req.file) {
        return res.status(404).json({
          sucess: false,
          message: 'All Fields are required',
        });
      }

      if (err) {
        return res.status(500).json({
          sucess: false,
          message: err.message || 'Error uploading files',
        });
      }
      //Store into Database
      const file = new File({
        fileName: req.file.filename,
        uuid: uuidV4(),
        path: req.file.path,
        size: req.file.size,
      });

      const response = await file.save();
      return res.status(200).json({
        sucess: true,
        file: `${process.env.APP_BASE_URL}/files/${response.uuid}`,
      });
    } catch (err) {
      return res.status(500).json({
        sucess: false,
        message: err.message,
      });
    }
  });
};

exports.show = async (req, res) => {
  const { uuid } = req.params;

  const file = await File.findOne({ uuid });
  if (!file) {
    return res.render('download', { error: 'Link has been expired' });
  }
  console.log(file);
  return res.render('download', {
    uuid: file.uuid,
    fileName: file.fileName,
    fileSize: file.size,
    downloadLink: `${process.env.APP_BASE_URL}/files/download/${file.uuid}`,
  });
};

exports.download = async (req, res) => {
  const { uuid } = req.params;

  const file = await File.findOne({ uuid });

  if (!file) {
    return res.render('download', { error: 'Link has been expired' });
  }
  console.log(file.path);

  const filePath = `${__dirname}/../../${file.path}`;
  console.log(filePath);
  res.download(filePath);
};

exports.send = async (req, res) => {
  const { uuid, sendTo } = req.body;

  if (!uuid || !sendTo) {
    return res.status(422).json({
      sucess: false,
      message: `All fileds are required.`,
    });
  }
};
