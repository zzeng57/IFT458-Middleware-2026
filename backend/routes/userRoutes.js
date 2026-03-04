// userRoutes.js
// This file defines the API routes for user authentication
// It maps POST endpoints to the auth controller functions

const express = require('express');
const router = express.Router();
// const userController = require('./../controllers/userController');
const authController = require('./../controllers/authController');

// POST /signup - creates a new user account
router.post('/signup', authController.signup);

// POST /login - logs in an existing user
router.post('/login', authController.login);

// // router.post('/forgotPassword', authController.forgotPassword);
module.exports = router;
