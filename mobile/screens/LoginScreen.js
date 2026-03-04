// LoginScreen.js
// This is the Login page of the mobile app
// It has two input fields: email and password
// When the user taps "Login" it sends a POST request to the backend API
// If login is successful, it saves the token and navigates to the success page
//
// This is similar to the LoginForm component in the React web version
// but uses React Native components instead of HTML elements

import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,         // TextInput = like <input> in HTML
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Alert,             // Alert = shows a popup message on the phone
    Image,             // Image = like <img> in HTML, used to display pictures
} from 'react-native';

// Import the login function from our API helper file
import { loginUser } from '../utils/api';

// The LoginScreen component
// navigation = function to switch screens (passed from App.js)
// onLoginSuccess = function to call when login works (passed from App.js)
const LoginScreen = ({ navigation, onLoginSuccess }) => {
    // ============================================================
    // STATE VARIABLES
    // useState is a React hook that creates a variable that can change
    // When the variable changes, React Native re-renders the screen
    // useState('') means the initial value is an empty string
    // [email, setEmail] means:
    //   email = the current value
    //   setEmail = function to update the value
    // ============================================================
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    // ============================================================
    // HANDLE LOGIN
    // This function runs when the user taps the "Login" button
    // It calls the loginUser function from api.js
    // ============================================================
    const handleLogin = async () => {
        // Clear any old error message
        setError('');

        // Check that the user filled in both fields
        if (!email || !password) {
            setError('Please fill in both email and password.');
            return; // stop here, dont send the request
        }

        // Show loading state so user knows something is happening
        setLoading(true);

        // Call the loginUser function from api.js
        // await means "wait for the server to respond before continuing"
        const data = await loginUser(email, password);

        // Turn off loading state
        setLoading(false);

        // Check if login was successful
        if (data.status === 'success') {
            // Tell the parent component (App.js) that login was successful
            // Pass the user data and token back to App.js
            onLoginSuccess(data.data.user, data.token);
        } else {
            // If login failed, show the error message
            setError(data.errorMessage || 'Login failed. Please try again.');
        }
    };

    return (
        <ScrollView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.title}>Login</Text>
                <Text style={styles.subtitle}>Sign in to your account</Text>
            </View>

            {/* Login image - signin.png from assets folder */}
            {/* In React Native, we use require() to load local images */}
            {/* This is different from web where you use <img src="path"> */}
            <View style={styles.imageContainer}>
                <Image
                    source={require('../assets/signin.png')}
                    style={styles.image}
                    resizeMode="contain"
                />
            </View>

            {/* Form section */}
            <View style={styles.form}>

                {/* Show error message if there is one */}
                {/* In React Native, to show something conditionally we use: */}
                {/* {condition && <Component />} which means "if condition is true, show this" */}
                {error ? (
                    <View style={styles.errorBox}>
                        <Text style={styles.errorText}>{error}</Text>
                    </View>
                ) : null}

                {/* Email input field */}
                {/* TextInput is the React Native version of <input> */}
                <Text style={styles.label}>Email:</Text>
                <TextInput
                    style={styles.input}
                    value={email}
                    onChangeText={setEmail}      // onChangeText is like onChange for React web
                    placeholder="Enter your email"
                    placeholderTextColor="#999"
                    keyboardType="email-address"  // shows email keyboard with @ symbol
                    autoCapitalize="none"          // dont auto-capitalize email
                    autoCorrect={false}            // dont auto-correct email
                />

                {/* Password input field */}
                <Text style={styles.label}>Password:</Text>
                <TextInput
                    style={styles.input}
                    value={password}
                    onChangeText={setPassword}
                    placeholder="Enter your password"
                    placeholderTextColor="#999"
                    secureTextEntry={true}         // secureTextEntry hides the password with dots
                />

                {/* Login button */}
                <TouchableOpacity
                    style={[styles.button, loading && styles.buttonDisabled]}
                    onPress={handleLogin}
                    disabled={loading}             // disable button while loading
                >
                    <Text style={styles.buttonText}>
                        {loading ? 'Logging in...' : 'Login'}
                    </Text>
                </TouchableOpacity>

                {/* Link to register page */}
                <View style={styles.linkRow}>
                    <Text style={styles.linkText}>Dont have an account? </Text>
                    <TouchableOpacity onPress={() => navigation('register')}>
                        <Text style={styles.link}>Sign-up</Text>
                    </TouchableOpacity>
                </View>

                {/* Back to home button */}
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
        backgroundColor: '#0d6efd',
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
        color: '#cce5ff',
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
        borderWidth: 1,           // borderWidth = like border: 1px in CSS
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        color: '#333',
    },
    button: {
        backgroundColor: '#0d6efd',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 25,
    },
    buttonDisabled: {
        backgroundColor: '#6c9bd2', // lighter blue when disabled
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    errorBox: {
        backgroundColor: '#f8d7da', // light red background
        borderWidth: 1,
        borderColor: '#f5c6cb',
        borderRadius: 8,
        padding: 12,
        marginBottom: 10,
    },
    errorText: {
        color: '#721c24',           // dark red text
        fontSize: 14,
    },
    linkRow: {
        flexDirection: 'row',       // flexDirection: 'row' puts children side by side
        justifyContent: 'center',   // center them horizontally
        marginTop: 20,
    },
    linkText: {
        color: '#666',
        fontSize: 14,
    },
    link: {
        color: '#0d6efd',           // blue link color
        fontSize: 14,
        fontWeight: 'bold',
    },
});

export default LoginScreen;
