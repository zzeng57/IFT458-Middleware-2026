// BookExchangeScreen.js
// This screen shows the list of available books for exchange
// It fetches books from the backend API using a GET request
// The user must be logged in to see this page (JWT token required)
//
// This is similar to the BookExchange component in the React web version

import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    ActivityIndicator,  // ActivityIndicator = spinning loading circle
    Image,
} from 'react-native';

// Import the getBooks function from our API helper
import { getBooks } from '../utils/api';

const BookExchangeScreen = ({ user, navigation }) => {
    // State for the list of books from the API
    const [books, setBooks] = useState([]);
    // State to show loading spinner while fetching
    const [loading, setLoading] = useState(true);
    // State for error messages
    const [error, setError] = useState('');

    // ============================================================
    // useEffect runs when the component first appears on screen
    // We use it here to fetch the books from the backend
    // The empty array [] means "only run this once when screen loads"
    // If we didnt use [], it would run every time the screen re-renders
    // ============================================================
    useEffect(() => {
        const fetchBooks = async () => {
            // Call the getBooks function from api.js
            const data = await getBooks();

            // Check if we got an array of books or an error
            if (Array.isArray(data)) {
                // If data is an array, its the list of books
                setBooks(data);
            } else if (data.errorMessage) {
                // If there is an error message, show it
                setError(data.errorMessage);
            } else if (data.status === 'error') {
                setError(data.errorMessage || 'Could not fetch books. Please login first.');
            }

            // Turn off the loading spinner
            setLoading(false);
        };

        fetchBooks();
    }, []);

    // Show loading spinner while fetching books
    if (loading) {
        return (
            <View style={styles.center}>
                {/* ActivityIndicator is a spinning circle */}
                <ActivityIndicator size="large" color="#0d6efd" />
                <Text style={styles.loadingText}>Loading books...</Text>
            </View>
        );
    }

    return (
        <ScrollView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.title}>Book Exchange</Text>
                <Text style={styles.subtitle}>Available Books</Text>
            </View>

            {/* Protected resources image at the top */}
            <View style={styles.imageContainer}>
                <Image
                    source={require('../assets/protected.png')}
                    style={styles.image}
                    resizeMode="contain"
                />
            </View>

            <View style={styles.content}>
                {/* Show error if there is one */}
                {error ? (
                    <View style={styles.errorBox}>
                        <Text style={styles.errorText}>{error}</Text>
                        <TouchableOpacity
                            style={styles.loginButton}
                            onPress={() => navigation('login')}
                        >
                            <Text style={styles.loginButtonText}>Go to Login</Text>
                        </TouchableOpacity>
                    </View>
                ) : null}

                {/* Show the list of books */}
                {books.length > 0 ? (
                    // map() loops through each book and creates a card for it
                    // This is the same as a for loop but used inside JSX
                    // key={} is required by React to track each item in the list
                    books.map((book, index) => (
                        <View style={styles.bookCard} key={book._id || index}>
                            <Text style={styles.bookTitle}>{book.title}</Text>
                            <Text style={styles.bookDetail}>Author: {book.author}</Text>
                            <Text style={styles.bookDetail}>Description: {book.description}</Text>
                            <Text style={styles.bookDetail}>Exchange Type: {book.exchangeType}</Text>
                            <Text style={styles.bookDetail}>Status: {book.status || 'available'}</Text>

                            {/* Show exchange button if user is logged in and not the book owner */}
                            {user && user._id !== book.owner && (
                                <TouchableOpacity style={styles.exchangeButton}>
                                    <Text style={styles.exchangeButtonText}>Request Exchange</Text>
                                </TouchableOpacity>
                            )}
                        </View>
                    ))
                ) : (
                    // If no books exist yet, show a message and add book button
                    <View style={styles.emptyCard}>
                        <Text style={styles.emptyText}>No books available for exchange yet.</Text>
                        {user && (
                            <TouchableOpacity
                                style={styles.addButton}
                                onPress={() => navigation('addBook')}
                            >
                                <Text style={styles.addButtonText}>Add a Book</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                )}

                {/* Add book button (always visible if user is logged in) */}
                {user && books.length > 0 && (
                    <TouchableOpacity
                        style={styles.addButton}
                        onPress={() => navigation('addBook')}
                    >
                        <Text style={styles.addButtonText}>Add a New Book</Text>
                    </TouchableOpacity>
                )}

                {/* Back to home */}
                <TouchableOpacity onPress={() => navigation('home')}>
                    <Text style={[styles.link, { textAlign: 'center', marginTop: 15 }]}>
                        Back to Home
                    </Text>
                </TouchableOpacity>
            </View>

            {/* Footer */}
            <View style={styles.footer}>
                <Text style={styles.footerText}>Book Exchange Platform 2026</Text>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f8ff',
    },
    center: {
        flex: 1,
        justifyContent: 'center',  // center vertically
        alignItems: 'center',      // center horizontally
    },
    loadingText: {
        marginTop: 10,
        color: '#666',
        fontSize: 16,
    },
    header: {
        backgroundColor: '#0dcaf0',  // info cyan color
        padding: 30,
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#ffffff',
    },
    subtitle: {
        fontSize: 14,
        color: '#e0f7fa',
        marginTop: 5,
    },
    imageContainer: {
        alignItems: 'center',
        padding: 15,
        backgroundColor: '#ffffff',
    },
    image: {
        width: '90%',
        height: 200,
    },
    content: {
        padding: 20,
    },
    bookCard: {
        backgroundColor: '#ffffff',
        padding: 15,
        borderRadius: 10,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#ddd',
        elevation: 2,
    },
    bookTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 5,
    },
    bookDetail: {
        fontSize: 14,
        color: '#666',
        marginBottom: 3,
    },
    exchangeButton: {
        backgroundColor: '#0d6efd',
        padding: 10,
        borderRadius: 6,
        alignItems: 'center',
        marginTop: 10,
    },
    exchangeButtonText: {
        color: '#ffffff',
        fontSize: 14,
        fontWeight: 'bold',
    },
    emptyCard: {
        backgroundColor: '#fff3cd',  // light yellow background
        padding: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ffc107',
        alignItems: 'center',
    },
    emptyText: {
        fontSize: 16,
        color: '#856404',
        textAlign: 'center',
    },
    addButton: {
        backgroundColor: '#28a745',  // green for add
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 15,
    },
    addButtonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    errorBox: {
        backgroundColor: '#f8d7da',
        borderWidth: 1,
        borderColor: '#f5c6cb',
        borderRadius: 8,
        padding: 15,
        marginBottom: 15,
        alignItems: 'center',
    },
    errorText: {
        color: '#721c24',
        fontSize: 14,
        marginBottom: 10,
    },
    loginButton: {
        backgroundColor: '#0d6efd',
        padding: 10,
        borderRadius: 6,
    },
    loginButtonText: {
        color: '#ffffff',
        fontSize: 14,
        fontWeight: 'bold',
    },
    link: {
        color: '#0d6efd',
        fontSize: 14,
        fontWeight: 'bold',
    },
    footer: {
        padding: 20,
        alignItems: 'center',
    },
    footerText: {
        color: '#999',
        fontSize: 12,
    },
});

export default BookExchangeScreen;
