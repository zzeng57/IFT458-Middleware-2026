// storage.js
// This is a helper that works on BOTH mobile (React Native) and web browser
// On mobile: it uses AsyncStorage (saves data on the phone)
// On web: it uses localStorage (saves data in the browser)
// This way the app works when you press "w" to test in the browser
// AND when you scan the QR code to test on your phone

import { Platform } from 'react-native';

// Storage object with the same methods as AsyncStorage
// but works on both web and mobile
const storage = {
    // Save a value
    setItem: async (key, value) => {
        try {
            if (Platform.OS === 'web') {
                // On web browser, use localStorage
                localStorage.setItem(key, value);
            } else {
                // On mobile (iOS/Android), use AsyncStorage
                const AsyncStorage = require('@react-native-async-storage/async-storage').default;
                await AsyncStorage.setItem(key, value);
            }
        } catch (error) {
            console.log('Storage setItem error:', error);
        }
    },

    // Get a saved value
    getItem: async (key) => {
        try {
            if (Platform.OS === 'web') {
                return localStorage.getItem(key);
            } else {
                const AsyncStorage = require('@react-native-async-storage/async-storage').default;
                return await AsyncStorage.getItem(key);
            }
        } catch (error) {
            console.log('Storage getItem error:', error);
            return null;
        }
    },

    // Remove a saved value
    removeItem: async (key) => {
        try {
            if (Platform.OS === 'web') {
                localStorage.removeItem(key);
            } else {
                const AsyncStorage = require('@react-native-async-storage/async-storage').default;
                await AsyncStorage.removeItem(key);
            }
        } catch (error) {
            console.log('Storage removeItem error:', error);
        }
    },
};

export default storage;
