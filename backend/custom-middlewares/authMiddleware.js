// authMiddleware.js
// This middleware handles authentication and authorization
// It checks if the user has a valid JWT token (authentication)
// and if the user has the right role to access the resource (authorization)
// NOTE: Changed from res.redirect() to res.json() because React handles routing
// The old code redirected to EJS login page, now we send JSON error
// and React decides what to show

const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

// Authentication middleware - verifies the JWT token
// NOTE: React Native does not use browser cookies like React web does
// So we check BOTH the cookie AND the Authorization header
// The mobile app sends the token in the header like: Authorization: Bearer <token>
const authenticate = async (req, res, next) => {
    try {
        // Try to get the JWT token from cookies first (for web React app)
        // If no cookie, try to get it from the Authorization header (for React Native app)
        let token = req.cookies.jwt;
        if (!token && req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            // Split "Bearer eyJhbGciOi..." and take the second part (the actual token)
            token = req.headers.authorization.split(' ')[1];
        }
        // Verify the token using the secret key
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        // Get the user id from the decoded token
        const userId = decodedToken.id  || decodedToken._id;
        // Find the user in the database by their id
        const authenticatedUser = await User.findById(userId);

        if (!authenticatedUser) {
            // NOTE: Changed from res.redirect() to res.json()
            // React will check for this error and show the login page
            return res.status(401).json({
                status: 'error',
                errorCode: 401,
                errorMessage: 'User not found. Please login again.'
            });
        } else {
            // If user found, attach user to the request object and continue
            req.user = authenticatedUser;
            next();
        }
    } catch {
        // NOTE: Changed from res.redirect() to res.json()
        // If token is invalid or missing, send error as JSON
        // React will catch this and redirect to login page
        return res.status(401).json({
            status: 'error',
            errorCode: 401,
            errorMessage: 'Not authenticated. Please login.'
        });
    }
};

// Authorization middleware - checks if user has a role assigned
const authorize = async (req, res, next) =>{
    const currentUser = req.user;
    const userRole = currentUser.role;
    // If user has a role, they are authorized to continue
    if(userRole){
        next();
    } else {
        // If no role, send forbidden error as JSON
        res.status(403).json({ message: 'Forbidden' });
    }
};

// Helper function to fetch a user by their ID (used for debugging)
async function fetchUserById(userId) {
    try {
        const user = await User.findById(userId);
        if (user) {
            console.log('Found user:', user);
        } else {
            console.log('No user found with the provided ID.');
        }
    } catch (error) {
        console.error('Error fetching user:', error);
    }
}

// Export the middleware functions so they can be used in routes
module.exports = { authenticate, authorize };
