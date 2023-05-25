require('express-async-errors');
require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
//SECURITY PACKAGES
const helmet = require('helmet');
const cors = require('cors');
const xss = require('xss-clean');
const rateLimiter = require('express-rate-limit');

//middlewares
const pageNotFound = require('./utils/page-not-found');
const errorHandler = require('./utils/error-handler');
const authenticateUser = require('./utils/auth');
//CONNECT DB
const connectDb = require('./database/database');

//my routes
const authRoutes = require('./routes/auth');
const jobsRoutes = require('./routes/jobs');

// app.use(express.urlencoded({ extended: true }));
app.set('trust proxy', 1) //for heruku
app.use(rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
}));
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(xss());


//routes goes here
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/jobs', authenticateUser, jobsRoutes)

//page not found middleware
app.use(pageNotFound);
//error handler middleware
app.use(errorHandler);


const start = async() => {
    //db connection code
    console.log('initializing connection...');
    await connectDb(process.env.MONGO_URI);
    //listening on server
    app.listen(PORT, () => console.log(`CONNECTED ON PORT ${PORT}`))
}
start();