// I changed this comment
// Manages screen navigation and user authentication state
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar, Platform } from 'react-native';

// Import all screen components
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import AuthSuccessScreen from './screens/AuthSuccessScreen';
import BookExchangeScreen from './screens/BookExchangeScreen';
import AddBookScreen from './screens/AddBookScreen';
import LogoutScreen from './screens/LogoutScreen';

// Import API helper
import { getSavedUser } from './utils/api';



const loggermiddleware = require('./loggerMiddleware'); //Bryce Pratt

// Fix the web viewport so the app uses the full browser width
// Expo web by default constrains the app to a narrow mobile width
if (Platform.OS === 'web') {
    const style = document.createElement('style');
    style.textContent = `
        html, body, #root {
            height: 100%;
            width: 100%;
            margin: 0;
            padding: 0;
        }
        #root > div:first-child {
            display: flex !important;
            min-height: 100vh !important;
            width: 100% !important;
            max-width: 100% !important;
        }
    `;
    document.head.appendChild(style);
}

export default function App() {
    // State: which screen to show
    const [currentScreen, setCurrentScreen] = useState('home');
    // State: logged in user (null if not logged in)
    const [user, setUser] = useState(null);
    // State: JWT token
    const [token, setToken] = useState(null);

    // Check for saved session on startup
    useEffect(() => {
        const checkSavedUser = async () => {
            try {
                const savedData = await getSavedUser();
                if (savedData) {
                    setUser(savedData.user);
                    setToken(savedData.token);
                }
            } catch (error) {
                console.log('Could not load saved session:', error);
            }
        };
        checkSavedUser();
    }, []);

    // Navigation function - passed to all screens
    const handleNavigation = (screen) => {
        setCurrentScreen(screen);
    };

    // Login/Signup success handler
    const handleLoginSuccess = (userData, tokenData) => {
        setUser(userData);
        setToken(tokenData);
        setCurrentScreen('authSuccess');
    };

    // Logout handler
    const handleLogout = () => {
        setUser(null);
        setToken(null);
        setCurrentScreen('home');
    };

    // Render the correct screen based on currentScreen state
    const renderScreen = () => {
        switch (currentScreen) {
            case 'login':
                return <LoginScreen navigation={handleNavigation} onLoginSuccess={handleLoginSuccess} />;
            case 'register':
                return <RegisterScreen navigation={handleNavigation} onLoginSuccess={handleLoginSuccess} />;
            case 'authSuccess':
                return <AuthSuccessScreen user={user} token={token} navigation={handleNavigation} />;
            case 'bookExchange':
                return <BookExchangeScreen user={user} navigation={handleNavigation} />;
            case 'addBook':
                return <AddBookScreen navigation={handleNavigation} />;
            case 'logout':
                return <LogoutScreen navigation={handleNavigation} onLogout={handleLogout} />;
            case 'home':
            default:
                return <HomeScreen navigation={handleNavigation} />;
        }
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#0d6efd" />

            {/* Screen content */}
            <View style={styles.screenContainer}>
                {renderScreen()}
            </View>

            {/* Bottom Navigation Bar */}
            <View style={styles.bottomNav}>
                <TouchableOpacity style={styles.navButton} onPress={() => handleNavigation('home')}>
                    <Text style={[styles.navText, currentScreen === 'home' && styles.navTextActive]}>Home</Text>
                </TouchableOpacity>

                {user ? (
                    <>
                        <TouchableOpacity style={styles.navButton} onPress={() => handleNavigation('bookExchange')}>
                            <Text style={[styles.navText, currentScreen === 'bookExchange' && styles.navTextActive]}>Books</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.navButton} onPress={() => handleNavigation('logout')}>
                            <Text style={[styles.navText, currentScreen === 'logout' && styles.navTextActive]}>Logout</Text>
                        </TouchableOpacity>
                    </>
                ) : (
                    <>
                        <TouchableOpacity style={styles.navButton} onPress={() => handleNavigation('login')}>
                            <Text style={[styles.navText, currentScreen === 'login' && styles.navTextActive]}>Login</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.navButton} onPress={() => handleNavigation('register')}>
                            <Text style={[styles.navText, currentScreen === 'register' && styles.navTextActive]}>Register</Text>
                        </TouchableOpacity>
                    </>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        width: '100%',
        backgroundColor: '#f0f8ff',
    },
    screenContainer: {
        flex: 1,
        width: '100%',
    },
    bottomNav: {
        flexDirection: 'row',
        backgroundColor: '#343a40',
        paddingVertical: 12,
        borderTopWidth: 1,
        borderTopColor: '#495057',
        width: '100%',
    },
    navButton: {
        flex: 1,
        alignItems: 'center',
    },
    navText: {
        color: '#adb5bd',
        fontSize: 16,
        fontWeight: 'bold',
    },
    navTextActive: {
        color: '#ffffff',
    },
});