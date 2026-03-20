// authController.js
// This controller handles user authentication (signup and login)
// It creates JWT tokens for authorization
// NOTE: All responses now return JSON instead of rendering EJS views
// because React handles the UI in the browser

const crypto = require('crypto');
const User = require('./../models/userModel');
const jwt = require('jsonwebtoken');

// Signup controller - creates a new user 
// React sends a POST request with JSON body {name, email, password, passwordConfirmation}
exports.signup = async (req, res, next) => {
  try {
    const { name, email, password, passwordConfirmation } = req.body;
    const newUser = await User.create({
      name,
      email,
      password,
      passwordConfirmation
    });
    // Send the JWT token back as JSON so React can use it
    createSendToken(newUser, 201, res);
  } catch (err) {
    // If signup fails (like duplicate email), send error as JSON
    return res.status(400).json({
      status: 'error',
      errorCode: 400,
      errorMessage: err.message
    });
  }
};

// Helper function to create a JWT token and send it as a cookie + JSON response
// This is used by both signup and login
const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  // Set cookie options with expiration time
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true // cookie cannot be accessed by JavaScript in the browser
  };
  // Only use secure cookies in production (HTTPS only)
  if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

  // Set the jwt cookie on the response
  res.cookie('jwt', token, cookieOptions);

  // Remove password from the output so it is not sent to the client
  user.password = undefined;

  // NOTE: Changed from res.render('authorizationSuccess') to res.json()
  // React will receive this JSON and display the success page
  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user
    }
  });
};

// Helper function to sign a JWT token with the user id
const signToken = id => {
  const jwtToken = jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
  console.log('JWT Token created:', jwtToken);
  return jwtToken;
};

// Login controller - checks email and password then sends token as JSON
// React sends a POST request with JSON body {email, password}
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    // 1) Check if email and password exist
    if (!email || !password) {
      // NOTE: Changed from res.render('appError') to res.json()
      return res.status(401).json({
        status: 'error',
        errorCode: 401,
        errorMessage: 'Please provide email and password!'
      });
    }
    // 2) Check if user exists && password is correct
    const user = await User.findOne({ email }).select('+password');

    if (!user || !(await user.isPasswordMatch(password, user.password))) {
      // NOTE: Changed from res.render('appError') to res.json()
      return res.status(401).json({
        status: 'error',
        errorCode: 401,
        errorMessage: 'Incorrect email and password!'
      });
    }

    // 3) If everything ok, send token to client as JSON
    createSendToken(user, 200, res);
  } catch (err) {
    return res.status(500).json({
      status: 'error',
      errorCode: 500,
      errorMessage: err.message
    });
  }
};

// Protect middleware - checks if user has a valid JWT token
exports.protect = async (req, res, next) => {
  // 1) Getting token and check of it's there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    // NOTE: Changed from res.render('appError') to res.json()
    return res.status(401).json({
      status: 'error',
      errorCode: 401,
      errorMessage: 'You are not logged in! Please log in to get access'
    });
  }

  // 2) Verification token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // 3) Check if user still exists
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return res.status(401).json({
      status: 'error',
      errorCode: 401,
      errorMessage: 'The user belonging to this token does no longer exist'
    });
  }

  // GRANT ACCESS TO PROTECTED ROUTE
  req.user = currentUser;
  next();
};
