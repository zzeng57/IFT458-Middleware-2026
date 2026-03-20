// booksController.js
// This controller handles all the CRUD operations for books
// It uses the BookExchange model to interact with MongoDB
// NOTE: All responses now return JSON instead of rendering EJS views
// because React handles the UI in the browser

const Book = require('../models/bookModel');

// GET all books - returns all books from the database as JSON
exports.getBooks = async (req, res) => {
    try {
        const books = await Book.find();
        // NOTE: Changed from rendering bookExchageForm.ejs to returning JSON
        // React will receive this array and display it
        // If no books found, we return empty array instead of rendering a form
        res.status(200).json(books);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// GET a single book by ID - finds one book using the id from the URL
exports.getBookById = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.status(200).json(book);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// CREATE a new book - saves a new book to the database
exports.createBook = async (req, res) => {
    const book = new Book({
        title: req.body.title,
        author: req.body.author,
        description: req.body.description,
        exchangeType: req.body.exchangeType,
        owner: req.user._id,
    });

    try {
        const newBook = await book.save();
        res.status(201).json(newBook);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// UPDATE a book by ID - finds and updates a book with new data
exports.updateBook = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        // Update only the fields that are sent in the request body
        book.title = req.body.title || book.title;
        book.author = req.body.author || book.author;
        book.description = req.body.description || book.description;
        book.exchangeType = req.body.exchangeType || book.exchangeType;
        book.status = req.body.status || book.status;

        const updatedBook = await book.save();
        res.status(200).json(updatedBook);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// DELETE a book by ID - removes a book from the database
exports.deleteBook = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        await Book.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Book deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
