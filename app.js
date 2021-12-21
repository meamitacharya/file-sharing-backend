const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

//.ENV Configuration
dotenv.config();

const connectDB = require("./server/database/dbConnection");
const fileRouter = require("./server/routes/fileRoutes");
const logger = require("./server/logger");

//Express App Init
const app = express();

//Databse Connection
connectDB();

//Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(require("morgan")("tiny", { stream: logger.stream }));

//API Routes

app.use("/api", fileRouter);

//Express app listening
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  logger.log({
    level: "info",
    message: `Server running on port ${PORT} successfully..`,
  });
});
