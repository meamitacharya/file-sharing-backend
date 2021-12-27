const mongoose = require('mongoose');
const fileSchema = new mongoose.Schema(
  {
    fileName: {
      type: String,
      required: [true, 'Filename is required.'],
    },
    path: {
      type: String,
      required: true,
    },
    size: {
      type: Number,
      required: true,
    },
    uuid: {
      type: String,
      required: true,
    },
    senderEmail: {
      type: String,
    },

    receiverEmail: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('File', fileSchema);
