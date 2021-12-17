const { createLogger, format, transports } = require("winston");
// require('winston-mongodb');
const { combine, timestamp, colorize, printf, json } = format;

const myFormat = printf(({ level, message, timestamp, url }) => {
  // [${url}]
  return `${timestamp} [${level}] ${url ? url : ""} => ${message}`;
});

const logger = createLogger({
  level: "info",
  format: combine(timestamp({ format: "YY-MM-dd HH:mm:ss" }), myFormat),
  transports: [
    new transports.File({ filename: "error.log", level: "error" }),
    //  new transports.File({ filename: 'combined.log' }),
    new transports.Console({ level: "info" }),

    //  new transports.MongoDB({
    //    db: process.env.MONGO_URI,
    //    options: {
    //      useUnifiedTopology: true,
    //    },
    //    collection: 'log',
    //    level: 'error',
    //    capped: true,
    //    cappedMax:200
    //  }),
  ],
});

logger.stream = {
  write: function (message, encoding) {
    logger.log({
      level: "info",
      message,
    });
  },
};

module.exports = logger;
