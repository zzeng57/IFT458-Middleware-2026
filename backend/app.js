// app.js
const loggerMiddleware = require('./loggerMiddleware');
app.use(loggerMiddleware);
// This is the main Express application file
// It configures all the middleware and API routes
// NOTE: This backend is API-only (no views)
// React Native mobile app connects to these API endpoints

const path = require('path');
const express = require('express');
const morgan = require('morgan'); // HTTP request logger for development
const bodyParser = require('body-parser'); // parses incoming request bodies
const cookieParser = require('cookie-parser'); // parses cookies from requests
const cors = require('cors'); // allows React Native to connect to this server

// start express app
const app = express();

// 1) GLOBAL MIDDLEWARES

// Enable CORS so React Native app can make requests to this server
// Without CORS the mobile app would get blocked by the browser security
app.use(cors());

// Log the request to the console in development mode
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Serving static files (images, css, etc)
app.use(express.static(path.join(__dirname, 'public')));

// Body parser - reads data from body into req.body
// parse application/x-www-form-urlencoded (form data)
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json (API data from React Native fetch calls)
app.use(bodyParser.json());

// parse cookies so we can read JWT tokens from cookies
app.use(cookieParser());

// 2) ROUTES API for Users
// User routes handle signup and login API endpoints
const userRouter = require('./routes/userRoutes');
app.use(`${process.env.API_VERSION}/users`, userRouter);

// 3) ROUTES API for Books
// Book routes handle CRUD operations for books
const booksRoutes = require('./routes/bookRoutes.js');
app.use(`${process.env.API_VERSION}/books`, booksRoutes);

// 4) Landing page - shows setup instructions when you visit the server in a browser
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

module.exports = app;
