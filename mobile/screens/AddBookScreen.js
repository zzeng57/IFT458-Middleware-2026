// AddBookScreen.js
// This screen lets the user add a new book for exchange
// It has input fields for: title, author, description, and exchange type
// When the user taps "Add Book" it sends a POST request to the backend API
//
// This is similar to the BookExchangeForm component in the React web version

import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
} from 'react-native';

// Import the createBook function from our API helper
import { createBook } from '../utils/api';

const AddBookScreen = ({ navigation }) => {
    // State for form fields
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [description, setDescription] = useState('');
    const [exchangeType, setExchangeType] = useState('borrow');
    // State for messages
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    // Function that runs when user taps "Add Book"
    const handleAddBook = async () => {
        setError('');
        setSuccess('');

        // Check that required fields are filled in
        if (!title || !author || !description) {
            setError('Please fill in all fields.');
            return;
        }

        setLoading(true);

        // Call the createBook function from api.js
        const data = await createBook(title, author, description, exchangeType);

        setLoading(false);

        if (data._id || data.title) {
            // If book was created successfully (it returns the book object with _id)
            setSuccess('Book added successfully!');
            // Clear the form fields
            setTitle('');
            setAuthor('');
            setDescription('');
            setExchangeType('borrow');
        } else {
            setError(data.errorMessage || data.message || 'Failed to add book.');
        }
    };

    return (
        <ScrollView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.title}>Add a New Book</Text>
                <Text style={styles.subtitle}>Share a book for exchange</Text>
            </View>

            {/* Form */}
            <View style={styles.form}>
                {/* Success message */}
                {success ? (
                    <View style={styles.successBox}>
                        <Text style={styles.successText}>{success}</Text>
                    </View>
                ) : null}

                {/* Error message */}
                {error ? (
                    <View style={styles.errorBox}>
                        <Text style={styles.errorText}>{error}</Text>
                    </View>
                ) : null}

                {/* Title input */}
                <Text style={styles.label}>Title:</Text>
                <TextInput
                    style={styles.input}
                    value={title}
                    onChangeText={setTitle}
                    placeholder="Enter book title"
                    placeholderTextColor="#999"
                />

                {/* Author input */}
                <Text style={styles.label}>Author:</Text>
                <TextInput
                    style={styles.input}
                    value={author}
                    onChangeText={setAuthor}
                    placeholder="Enter author name"
                    placeholderTextColor="#999"
                />

                {/* Exchange Type selection */}
                {/* React Native does not have a <select> dropdown like HTML */}
                {/* We use buttons instead to let the user pick the type */}
                <Text style={styles.label}>Exchange Type:</Text>
                <View style={styles.typeSelector}>
                    {/* Borrow button */}
                    <TouchableOpacity
                        style={[
                            styles.typeButton,
                            // If "borrow" is selected, highlight this button
                            exchangeType === 'borrow' && styles.typeButtonActive
                        ]}
                        onPress={() => setExchangeType('borrow')}
                    >
                        <Text style={[
                            styles.typeButtonText,
                            exchangeType === 'borrow' && styles.typeButtonTextActive
                        ]}>
                            Borrow
                        </Text>
                    </TouchableOpacity>

                    {/* Trade button */}
                    <TouchableOpacity
                        style={[
                            styles.typeButton,
                            exchangeType === 'trade' && styles.typeButtonActive
                        ]}
                        onPress={() => setExchangeType('trade')}
                    >
                        <Text style={[
                            styles.typeButtonText,
                            exchangeType === 'trade' && styles.typeButtonTextActive
                        ]}>
                            Trade
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* Description input */}
                {/* multiline={true} makes it behave like a <textarea> in HTML */}
                <Text style={styles.label}>Description:</Text>
                <TextInput
                    style={[styles.input, styles.textArea]}
                    value={description}
                    onChangeText={setDescription}
                    placeholder="Enter a description of the book"
                    placeholderTextColor="#999"
                    multiline={true}
                    numberOfLines={5}
                    textAlignVertical="top"  // start typing from the top of the box
                />

                {/* Add Book button */}
                <TouchableOpacity
                    style={[styles.button, loading && styles.buttonDisabled]}
                    onPress={handleAddBook}
                    disabled={loading}
                >
                    <Text style={styles.buttonText}>
                        {loading ? 'Adding book...' : 'Add Book'}
                    </Text>
                </TouchableOpacity>

                {/* Back to book exchange */}
                <TouchableOpacity onPress={() => navigation('bookExchange')}>
                    <Text style={[styles.link, { textAlign: 'center', marginTop: 15 }]}>
                        Back to Book Exchange
                    </Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f8ff',
    },
    header: {
        backgroundColor: '#28a745',
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
        color: '#c3e6cb',
        marginTop: 5,
    },
    form: {
        padding: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 5,
        marginTop: 15,
    },
    input: {
        backgroundColor: '#ffffff',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        color: '#333',
    },
    textArea: {
        height: 120,                // taller for description
    },
    typeSelector: {
        flexDirection: 'row',       // put buttons side by side
        gap: 10,
    },
    typeButton: {
        flex: 1,                    // each button takes equal space
        backgroundColor: '#ffffff',
        borderWidth: 2,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 12,
        alignItems: 'center',
    },
    typeButtonActive: {
        borderColor: '#0d6efd',     // blue border when selected
        backgroundColor: '#e7f1ff',  // light blue background when selected
    },
    typeButtonText: {
        fontSize: 16,
        color: '#666',
    },
    typeButtonTextActive: {
        color: '#0d6efd',           // blue text when selected
        fontWeight: 'bold',
    },
    button: {
        backgroundColor: '#28a745',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 25,
    },
    buttonDisabled: {
        backgroundColor: '#82c991',
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    successBox: {
        backgroundColor: '#d4edda',
        borderWidth: 1,
        borderColor: '#c3e6cb',
        borderRadius: 8,
        padding: 12,
        marginBottom: 10,
    },
    successText: {
        color: '#155724',
        fontSize: 14,
    },
    errorBox: {
        backgroundColor: '#f8d7da',
        borderWidth: 1,
        borderColor: '#f5c6cb',
        borderRadius: 8,
        padding: 12,
        marginBottom: 10,
    },
    errorText: {
        color: '#721c24',
        fontSize: 14,
    },
    link: {
        color: '#0d6efd',
        fontSize: 14,
        fontWeight: 'bold',
    },
});

export default AddBookScreen;
