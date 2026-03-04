// AuthSuccessScreen.js
// This screen shows after a successful login or signup
// It displays the user name, email, and the JWT token
// This is similar to the AuthSuccess component in the React web version
//
// In a real production app you would NOT show the JWT token to users
// We show it here for learning purposes so students can see how JWT works

import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
} from 'react-native';

const AuthSuccessScreen = ({ user, token, navigation }) => {
    return (
        <ScrollView style={styles.container}>
            {/* Success header with green background */}
            <View style={styles.header}>
                <Text style={styles.title}>Authorization Successful!</Text>
            </View>

            {/* User info card */}
            <View style={styles.card}>
                <Text style={styles.cardTitle}>Welcome, {user ? user.name : 'User'}!</Text>
                <Text style={styles.cardText}>Email: {user ? user.email : ''}</Text>
            </View>

            {/* Token display card */}
            <View style={styles.tokenCard}>
                <Text style={styles.tokenTitle}>Your JWT Token:</Text>
                <Text style={styles.tokenText}>{token || 'No token'}</Text>
                <Text style={styles.tokenNote}>
                    This token is saved on your phone. It is sent with every request
                    to the backend API in the Authorization header so the server knows
                    you are logged in.
                </Text>
            </View>

            {/* Navigation buttons */}
            <View style={styles.buttonGroup}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation('home')}
                >
                    <Text style={styles.buttonText}>Go to Home</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.button, styles.buttonInfo]}
                    onPress={() => navigation('bookExchange')}
                >
                    <Text style={styles.buttonText}>Go to Book Exchange</Text>
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
        backgroundColor: '#28a745',  // green for success
        padding: 30,
        alignItems: 'center',
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#ffffff',
    },
    card: {
        backgroundColor: '#d4edda',  // light green background
        margin: 20,
        marginBottom: 10,
        padding: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#c3e6cb',
    },
    cardTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#155724',           // dark green text
        marginBottom: 5,
    },
    cardText: {
        fontSize: 16,
        color: '#155724',
    },
    tokenCard: {
        backgroundColor: '#ffffff',
        margin: 20,
        marginTop: 10,
        padding: 15,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    tokenTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 5,
    },
    tokenText: {
        fontSize: 11,
        color: '#666',
        fontFamily: 'monospace',    // monospace font for the token
        marginBottom: 10,
    },
    tokenNote: {
        fontSize: 12,
        color: '#999',
        fontStyle: 'italic',
    },
    buttonGroup: {
        padding: 20,
    },
    button: {
        backgroundColor: '#28a745',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 12,
    },
    buttonInfo: {
        backgroundColor: '#0dcaf0',
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default AuthSuccessScreen;
