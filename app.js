require('express-async-errors');
require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

//middlewares
const pageNotFound = require('./utils/page-not-found');
const errorHandler = require('./utils/error-handler');
//CONNECT DB
const connectDb = require('./database/database');

//my routes
const authRoutes = require('./routes/auth');
const jobsRoutes = require('./routes/jobs');

// app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set('view engine', 'views');

//routes goes here
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/jobs', jobsRoutes)

//page not found middleware
app.use(pageNotFound);
//error handler middleware
app.use(errorHandler);


const start = async() => {
    //db connection code
    await connectDb(process.env.MONGO_URI);
    //listening on server
    app.listen(PORT, () => console.log(`CONNECTED ON PORT ${PORT}`))
}
start();