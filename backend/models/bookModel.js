// bookModel.js
// This file defines the BookExchange schema and model for MongoDB
// It stores the book data for the exchange platform

const mongoose = require('mongoose');

// Define the book exchange schema with all the fields
const bookExchangeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true // book must have a title
    },
    author: {
        type: String,
        required: true // book must have an author
    },
    description: {
        type: String,
        required: true // book must have a description
    },
    exchangeType: {
        type: String,
        enum: ['borrow', 'trade'], // only borrow or trade is allowed
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // references the User model
        required: true
    },
    status: {
        type: String,
        enum: ['available', 'unavailable'], // book is either available or not
        default: 'available'
    }
}, { timestamps: true }); // timestamps adds createdAt and updatedAt fields automatically

// Create the BookExchange model from the schema
const BookExchange = mongoose.model('BookExchange', bookExchangeSchema);

module.exports = BookExchange;
