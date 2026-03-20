// HomeScreen.js
// This is the landing page of the mobile app
// It shows the app title, welcome message, and navigation buttons
// This is similar to the Home component in the React web version
//
// REACT NATIVE vs REACT WEB differences:
//   Web: <div> <p> <button onClick>  CSS classes
//   Native: <View> <Text> <TouchableOpacity onPress>  StyleSheet

// Import React and the hooks we need
// useState stores data that can change (like loading state)
// useEffect runs code when the component first appears on screen
import React, { useState, useEffect } from 'react';

// Import React Native components
// View = like a <div> in HTML, it is a container for other elements
// Text = like a <p> or <span> in HTML, used to display text
// StyleSheet = like CSS but written in JavaScript
// TouchableOpacity = like a <button> in HTML, it is a pressable element
//                    "Opacity" means it becomes slightly transparent when pressed
// ScrollView = like a <div> with overflow:scroll, lets content scroll if too long
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Image,
} from 'react-native';

// This is our HomeScreen component
// It receives 'navigation' as a prop from the App.js parent component
// 'navigation' is an object that lets us switch between screens
// We pass it from App.js so this screen can tell App.js to change the page
const HomeScreen = ({ navigation }) => {

    // This is the JSX that React Native will display on the phone screen
    // In React Native, ALL text must be inside <Text> tags
    // You cannot put raw text inside <View> like you can with <div> in web
    return (
        // ScrollView lets the user scroll down if content is longer than the screen
        <ScrollView style={styles.container}>

            {/* Header section with the app title */}
            <View style={styles.header}>
                <Text style={styles.title}>IFT- Middleware -2026</Text>
                <Text style={styles.subtitle}>Book Exchange Platform</Text>
            </View>

            {/* React Native image - react_native.png from assets folder */}
            {/* NOTE: Image loaded with require() which bundles it at build time */}
            <View style={styles.imageContainer}>
                <Image
                    source={require('../assets/react_native.png')}
                    style={styles.image}
                    resizeMode="contain"
                    onError={(e) => console.log('Image load error:', e.nativeEvent.error)}
                />
            </View>

            {/* Welcome message section */}
            <View style={styles.card}>
                <Text style={styles.cardTitle}>Welcome to Book Exchange!</Text>
                <Text style={styles.cardText}>
                    This is a mobile app built with React Native and Expo.
                    It connects to the same Express.js backend API as the web version.
                    You can register, login, and exchange books with other users.
                </Text>
            </View>

            {/* Navigation buttons section */}
            {/* In React Native, we use TouchableOpacity instead of <button> */}
            {/* onPress is like onClick in React web */}
            <View style={styles.buttonGroup}>

                {/* Login button */}
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation('login')}
                >
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>

                {/* Register button */}
                <TouchableOpacity
                    style={[styles.button, styles.buttonSecondary]}
                    onPress={() => navigation('register')}
                >
                    <Text style={styles.buttonText}>Register</Text>
                </TouchableOpacity>

                {/* Book Exchange button */}
                <TouchableOpacity
                    style={[styles.button, styles.buttonInfo]}
                    onPress={() => navigation('bookExchange')}
                >
                    <Text style={styles.buttonText}>Book Exchange</Text>
                </TouchableOpacity>
            </View>

            {/* Footer */}
            <View style={styles.footer}>
                <Text style={styles.footerText}>Book Exchange Platform 2026</Text>
            </View>

        </ScrollView>
    );
};

// ============================================================
// STYLES
// In React Native we dont use CSS files or class names
// Instead we create a StyleSheet object with JavaScript
// Each style is like a CSS class but written as a JS object
// CSS properties use camelCase instead of kebab-case:
//   CSS: background-color  ->  React Native: backgroundColor
//   CSS: font-size         ->  React Native: fontSize
//   CSS: margin-bottom     ->  React Native: marginBottom
// ============================================================
const styles = StyleSheet.create({
    container: {
        flex: 1,                    // flex: 1 means take up all available space
        backgroundColor: '#f0f8ff', // light blue background
    },
    header: {
        backgroundColor: '#0d6efd', // Bootstrap primary blue color
        padding: 30,                // space inside the header
        alignItems: 'center',       // center children horizontally
    },
    imageContainer: {
        alignItems: 'center',
        padding: 15,
        backgroundColor: '#ffffff',
    },
    image: {
        width: '90%',
        height: 220,
    },
    title: {
        fontSize: 24,               // big text for the title
        fontWeight: 'bold',         // make it bold
        color: '#ffffff',           // white text
    },
    subtitle: {
        fontSize: 16,
        color: '#cce5ff',           // lighter blue text
        marginTop: 5,               // small space above
    },
    card: {
        backgroundColor: '#ffffff', // white card background
        margin: 20,                 // space outside the card
        padding: 20,                // space inside the card
        borderRadius: 10,           // rounded corners
        elevation: 3,
    },
    cardTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
    },
    cardText: {
        fontSize: 15,
        color: '#666',
        lineHeight: 22,             // space between lines of text
    },
    buttonGroup: {
        padding: 20,                // space around the buttons
    },
    button: {
        backgroundColor: '#0d6efd', // Bootstrap primary blue
        padding: 15,
        borderRadius: 8,            // rounded corners
        alignItems: 'center',       // center the text inside
        marginBottom: 12,           // space between buttons
    },
    buttonSecondary: {
        backgroundColor: '#6c757d', // Bootstrap secondary gray
    },
    buttonInfo: {
        backgroundColor: '#0dcaf0', // Bootstrap info cyan
    },
    buttonText: {
        color: '#ffffff',           // white text
        fontSize: 16,
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

// Export the component so it can be imported in App.js
export default HomeScreen;
