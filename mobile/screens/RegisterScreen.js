// RegisterScreen.js
// This is the Registration (Signup) page of the mobile app
// It has input fields for: name, email, password, and confirm password
// When the user taps "Signup" it sends a POST request to the backend API
// If signup is successful, it saves the token and navigates to success page
//
// This is similar to the RegisterForm component in the React web version

import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Image,
} from 'react-native';

// Import the signup function from our API helper file
import { signupUser } from '../utils/api';

const RegisterScreen = ({ navigation, onLoginSuccess }) => {
    // State variables for each form field
    // Each field needs its own state variable to track what the user types
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    // Function that runs when user taps the Signup button
    const handleSignup = async () => {
        setError('');

        // Check that all fields are filled in
        if (!name || !email || !password || !passwordConfirmation) {
            setError('Please fill in all fields.');
            return;
        }

        // Check that the passwords match before sending to server
        // This saves a network request if passwords dont match
        if (password !== passwordConfirmation) {
            setError('Passwords do not match.');
            return;
        }

        setLoading(true);

        // Call the signupUser function from api.js
        const data = await signupUser(name, email, password, passwordConfirmation);

        setLoading(false);

        if (data.status === 'success') {
            // Tell App.js that signup was successful
            onLoginSuccess(data.data.user, data.token);
        } else {
            setError(data.errorMessage || 'Signup failed. Please try again.');
        }
    };

    return (
        <ScrollView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.title}>Register</Text>
                <Text style={styles.subtitle}>Create a new account</Text>
            </View>

            {/* Register image - register.png from assets folder */}
            <View style={styles.imageContainer}>
                <Image
                    source={require('../assets/register.png')}
                    style={styles.image}
                    resizeMode="contain"
                />
            </View>

            {/* Form section */}
            <View style={styles.form}>

                {/* Error message */}
                {error ? (
                    <View style={styles.errorBox}>
                        <Text style={styles.errorText}>{error}</Text>
                    </View>
                ) : null}

                {/* Name input */}
                <Text style={styles.label}>Name:</Text>
                <TextInput
                    style={styles.input}
                    value={name}
                    onChangeText={setName}
                    placeholder="Enter your full name"
                    placeholderTextColor="#999"
                />

                {/* Email input */}
                <Text style={styles.label}>Email:</Text>
                <TextInput
                    style={styles.input}
                    value={email}
                    onChangeText={setEmail}
                    placeholder="Enter your email"
                    placeholderTextColor="#999"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                />

                {/* Password input */}
                <Text style={styles.label}>Password:</Text>
                <TextInput
                    style={styles.input}
                    value={password}
                    onChangeText={setPassword}
                    placeholder="Enter your password"
                    placeholderTextColor="#999"
                    secureTextEntry={true}
                />

                {/* Confirm Password input */}
                {/* This field must match the "passwordConfirmation" field in the User model */}
                <Text style={styles.label}>Confirm Password:</Text>
                <TextInput
                    style={styles.input}
                    value={passwordConfirmation}
                    onChangeText={setPasswordConfirmation}
                    placeholder="Enter password again"
                    placeholderTextColor="#999"
                    secureTextEntry={true}
                />

                {/* Signup button */}
                <TouchableOpacity
                    style={[styles.button, loading && styles.buttonDisabled]}
                    onPress={handleSignup}
                    disabled={loading}
                >
                    <Text style={styles.buttonText}>
                        {loading ? 'Creating account...' : 'Signup'}
                    </Text>
                </TouchableOpacity>

                {/* Link to login page */}
                <View style={styles.linkRow}>
                    <Text style={styles.linkText}>Already have an account? </Text>
                    <TouchableOpacity onPress={() => navigation('login')}>
                        <Text style={styles.link}>Login</Text>
                    </TouchableOpacity>
                </View>

                {/* Back to home */}
                <TouchableOpacity onPress={() => navigation('home')}>
                    <Text style={[styles.link, { textAlign: 'center', marginTop: 10 }]}>
                        Back to Home
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
        backgroundColor: '#6c757d',  // gray header for register (different from login blue)
        padding: 30,
        alignItems: 'center',
    },
    imageContainer: {
        alignItems: 'center',
        padding: 15,
        backgroundColor: '#ffffff',
    },
    image: {
        width: '80%',
        height: 200,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#ffffff',
    },
    subtitle: {
        fontSize: 14,
        color: '#dee2e6',
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
    button: {
        backgroundColor: '#6c757d',  // gray button to match header
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 25,
    },
    buttonDisabled: {
        backgroundColor: '#adb5bd',
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
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
    linkRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
    },
    linkText: {
        color: '#666',
        fontSize: 14,
    },
    link: {
        color: '#0d6efd',
        fontSize: 14,
        fontWeight: 'bold',
    },
});

export default RegisterScreen;
