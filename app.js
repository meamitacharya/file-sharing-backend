const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');

//.ENV Configuration
dotenv.config();

const connectDB = require('./server/database/dbConnection');
const fileRouter = require('./server/routes/fileRoutes');
const logger = require('./server/logger');

//Express App Init
const app = express();

//Databse Connection
connectDB();

//Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(require('morgan')('tiny', { stream: logger.stream }));

//set view engine
app.set('view engine', 'ejs');

//load static files
app.use('/css', express.static(path.resolve(__dirname, 'public/css/')));
app.use('/img', express.static(path.resolve(__dirname, 'public/img/')));

//API Routes
app.use('/api', fileRouter);
app.use('/files', require('./server/routes/render'));

//Express app listening
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  logger.log({
    level: 'info',
    message: `Server running on port ${PORT} successfully..`,
  });
});
