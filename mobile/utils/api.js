// api.js
// This file contains all the API helper functions
// It connects the React Native mobile app to the Express backend server
//
// IMPORTANT: You must change the PHONE_API_BASE variable below to use YOUR
// computer's local IP address. Do NOT use "localhost" because localhost
// on a phone means the phone itself, not your computer.
//
// How to find your IP address:
//   Mac:     open Terminal and type: ipconfig getifaddr en0
//   Windows: open Command Prompt and type: ipconfig (look for IPv4 Address)
//   Linux:   open Terminal and type: hostname -I
//
// Example: If your IP is 192.168.1.45, change the line below to:
//   const PHONE_API_BASE = 'http://192.168.1.45:4000/api/v1';

import { Platform } from 'react-native';

// ============================================================
// CHANGE THIS TO YOUR COMPUTER'S IP ADDRESS (for phone testing)
// ============================================================
const PHONE_API_BASE = 'http://192.168.1.31:4000/api/v1';

// If running in web browser, use localhost automatically
// If running on phone, use the IP address above
const API_BASE = 'http://192.168.1.31:4000/api/v1';
// ============================================================

// Import our cross-platform storage helper
// Works on both web (localStorage) and mobile (AsyncStorage)
import storage from './storage';

// ============================================================
// LOGIN function - sends email and password to the backend
// Returns the user data and JWT token if login is successful
// ============================================================
export const loginUser = async (email, password) => {
    try {
        const response = await fetch(`${API_BASE}/users/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (data.status === 'success') {
            await storage.setItem('jwt', data.token);
            await storage.setItem('user', JSON.stringify(data.data.user));
        }

        return data;
    } catch (error) {
        console.error('Login error:', error);
        return {
            status: 'error',
            errorMessage: 'Network error. Check that the backend server is running and your IP address is correct in api.js'
        };
    }
};

// ============================================================
// SIGNUP function - creates a new user account
// ============================================================
export const signupUser = async (name, email, password, passwordConfirmation) => {
    try {
        const response = await fetch(`${API_BASE}/users/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password, passwordConfirmation }),
        });

        const data = await response.json();

        if (data.status === 'success') {
            await storage.setItem('jwt', data.token);
            await storage.setItem('user', JSON.stringify(data.data.user));
        }

        return data;
    } catch (error) {
        console.error('Signup error:', error);
        return {
            status: 'error',
            errorMessage: 'Network error. Check that the backend server is running and your IP address is correct in api.js'
        };
    }
};

// ============================================================
// GET BOOKS function - fetches all books from the backend
// Protected route - needs JWT token in Authorization header
// ============================================================
export const getBooks = async () => {
    try {
        const token = await storage.getItem('jwt');

        const response = await fetch(`${API_BASE}/books`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Get books error:', error);
        return {
            status: 'error',
            errorMessage: 'Network error fetching books.'
        };
    }
};

// ============================================================
// CREATE BOOK function - adds a new book to the database
// Protected route - needs JWT token
// ============================================================
export const createBook = async (title, author, description, exchangeType) => {
    try {
        const token = await storage.getItem('jwt');

        const response = await fetch(`${API_BASE}/books`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ title, author, description, exchangeType }),
        });

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Create book error:', error);
        return {
            status: 'error',
            errorMessage: 'Network error creating book.'
        };
    }
};

// ============================================================
// LOGOUT function - clears saved token and user data
// ============================================================
export const logoutUser = async () => {
    try {
        await storage.removeItem('jwt');
        await storage.removeItem('user');
    } catch (error) {
        console.error('Logout error:', error);
    }
};

// ============================================================
// GET SAVED USER - checks if user is already logged in
// ============================================================
export const getSavedUser = async () => {
    try {
        const userString = await storage.getItem('user');
        const token = await storage.getItem('jwt');
        if (userString && token) {
            return { user: JSON.parse(userString), token };
        }
        return null;
    } catch (error) {
        console.error('Get saved user error:', error);
        return null;
    }
};
