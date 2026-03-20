// LogoutScreen.js
// This screen asks the user to confirm if they want to logout
// When they confirm, it clears the saved token and user data from the phone
// Then it navigates back to the home screen
//
// This is similar to the LogoutForm component in the React web version

import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';

// Import the logout function from our API helper
import { logoutUser } from '../utils/api';

const LogoutScreen = ({ navigation, onLogout }) => {

    // Function that runs when user confirms logout
    const handleLogout = async () => {
        // Call the logoutUser function from api.js
        // This removes the JWT token and user data from phone storage
        await logoutUser();
        // Tell App.js that user logged out
        // App.js will clear the user state and show the home screen
        onLogout();
    };

    return (
        <View style={styles.container}>
            {/* Centered card with logout confirmation */}
            <View style={styles.card}>
                <Text style={styles.title}>Are you sure you want to logout?</Text>
                <Text style={styles.subtitle}>
                    This will remove your saved session from this phone.
                </Text>

                {/* Logout button (red for danger/warning) */}
                <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                    <Text style={styles.logoutButtonText}>Yes, Logout</Text>
                </TouchableOpacity>

                {/* Stay button (go back to home) */}
                <TouchableOpacity
                    style={styles.stayButton}
                    onPress={() => navigation('home')}
                >
                    <Text style={styles.stayButtonText}>No, Stay Logged In</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f8ff',
        justifyContent: 'center',      // center the card vertically on screen
        alignItems: 'center',          // center the card horizontally
        padding: 20,
    },
    card: {
        backgroundColor: '#ffffff',
        padding: 30,
        borderRadius: 15,
        alignItems: 'center',
        width: '100%',
        elevation: 3,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
        marginBottom: 25,
    },
    logoutButton: {
        backgroundColor: '#dc3545',     // Bootstrap danger red
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        width: '100%',
        marginBottom: 12,
    },
    logoutButtonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    stayButton: {
        backgroundColor: '#6c757d',     // gray for cancel
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        width: '100%',
    },
    stayButtonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default LogoutScreen;
