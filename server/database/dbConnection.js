const mongoose = require("mongoose");
const logger = require('../logger');
const connectDB = async () => {
  try {
    //MongoDB connection string
    const con = await mongoose.connect(process.env.MONGO_URI);

    logger.log({
      level: "info",
      message: `MongoDB connected: ${con.connection.host}`,
    });
  } catch (err) {
    logger.log({
      level: "error",
      message: err.message,
    });
    process.exit(1);
  }
};

module.exports = connectDB;
