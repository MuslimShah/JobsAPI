/*
 * Project Name: JobsAPI
 * Description: This API allows users to register, create, update, and delete jobs.
 * Author: Muslim Shah
 * Date: May 25, 2023
 *
 * Routes:
 * - /api/v1/auth
 *   - POST /register
 *   - POST /login
 *
 * - /api/v1/jobs [Authenticate User]
 *   - GET /        [Get all jobs created by the user]
 *   - POST /       [Create a new job]
 *   - GET /:id     [Get a single job by ID]
 *   - PATCH /:id   [Update a job by ID]
 *   - DELETE /:id  [Delete a job by ID]
 *
 * Responses:
 * - Register Response:
 *   - Status: 201
 *   - Body: { user: { name: user.name }, token }
 *
 * - Login Response:
 *   - Status: 200
 *   - Body: { user: { name: user.name }, token }
 *
 * - Get All Jobs Response:
 *   - Status: 200
 *   - Body: { jobs: allJobs, count: allJobs.length }
 *
 * - Get Single Job Response:
 *   - Status: 200
 *   - Body: singleJob
 *
 * - Create Job Response:
 *   - Status: 201
 *   - Body: { job, msg: "Job created successfully" }
 *
 * - Update Job Response:
 *   - Status: 200
 *   - Body: { job, msg: "Job updated successfully" }
 *
 * - Delete Job Response:
 *   - Status: 200
 *   - Body: { msg: "Job deleted successfully" }
 *
 * Security Packages:
 * - helmet: Provides various security-related HTTP headers.
 * - cors: Enables Cross-Origin Resource Sharing (CORS) for handling requests from different domains.
 * - xss-clean: Prevents Cross-Site Scripting (XSS) attacks by sanitizing user input.
 * - express-limiter: Implements rate limiting to protect against brute force and denial-of-service attacks.
 *
 * Error Handling:
 * - express-async-errors: Handles asynchronous errors in Express middleware and routes.
 *
 * Environment Variables:
 * - dotenv: Loads environment variables from a .env file into process.env.
 *
 * Database:
 * - MongoDB: A NoSQL database for storing user and job data.
 * - Mongoose: An Object Data Modeling (ODM) library for MongoDB to provide a more intuitive interface for interacting with the database.
 */


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
//setting up trust proxy
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