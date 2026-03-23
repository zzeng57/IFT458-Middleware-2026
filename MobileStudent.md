Mobile App Notes - Tej Pal Naidu Maddipattla

Date: 3/22/2026

What i learned
What is React Native? React Native is a framework created by Meta that allows developers to build mobile applications using JavaScript and React. Instead of writing separate code for iOS and Android, React Native lets you write one codebase that runs on both platforms. With Expo, this process becomes even easier by abstracting away complex native configurations. The biggest thing I learned is that React Native does not use HTML elements like a normal website. Instead it uses its own components: Web (HTML)React Native Equivalent



Setting Up the Mobile Environment To launch the mobile app, I navigated into the mobile folder in VS Code and ran: bashnpx expo start


This started the **Expo development server** and displayed a QR code in the terminal. Pressing `w` opened the app in the web browser, which was useful for quick testing without a physical device.

---

## 3. Fixing Package Version Mismatches

When I first ran `npx expo start`, I encountered version mismatch warnings like:
react@18.2.0 - expected version: 19.2.0 react-native@0.73.6 - expected version: 0.83.2 I learned that using npx expo install instead of npm install is the correct way to install packages in an Expo project because it automatically picks versions compatible with the installed Expo SDK: bashnpx expo install @expo/metro-runtime @react-native-async-storage/async-storage expo-status-bar react react-dom react-native react-native-web @expo/metro-config


**Key takeaway:** Always use `npx expo install` for Expo projects to avoid dependency conflicts.

---

## 4. Testing on a Mobile Emulator in Browser

Since I didn't have a physical device, I used **Chrome Developer Tools** to simulate a mobile experience:

1. Right-clicked the page → **Inspect** (or pressed `F12`)
2. Clicked the **Device Toolbar** icon (phone/tablet icon)
3. Selected a mobile profile like **iPhone 14** or **Pixel 7**
4. Interacted with the app to verify it connected to the backend

This taught me how developers test mobile UIs without needing a real phone during development.

---

## 5. How the Mobile App Talks to the Backend

The mobile app (Expo) communicates with the Node.js backend running at `http://localhost:4000` through **API calls**. This is the foundation of how modern apps work:
Mobile App (Expo) → HTTP Request → Backend (Node.js) → Database Mobile App (Expo) ← JSON Response ← Backend (Node.js) ← Database


I learned that the backend and frontend are completely **separate projects** that communicate over HTTP — which is why we needed two VS Code instances running simultaneously.

---

## 6. Understanding the Project File Structure
mobile/ ├── App.js # Entry point of the app ├── package.json # Dependencies and scripts ├── node_modules/ # Installed packages (never push this to GitHub) ├── assets/ # Images, fonts, icons └── components/ # Reusable UI components Key takeaway: node_modules/ should always be in .gitignore because it's large and can be regenerated with npm install or npx expo install.

Git Workflow for Mobile Changes Every time I made changes or added screenshots, I followed this cycle: bash# Check what changed git status
Stage all changes
git add .

Save a snapshot with a message
git commit -m "Add mobile screenshots and MobileStudent.MD"

Upload to GitHub
git push I repeated this for every deliverable which made me realize that committing often with clear messages is a professional best practice — it creates a history of your work.

Overall Reflection This module gave me hands-on experience with the full mobile development workflow. The most valuable things I took away were:
React Native lets you build cross-platform mobile apps with JavaScript Expo simplifies setup, bundling, and testing significantly Package management in Expo requires using npx expo install for compatibility Full-stack architecture means the mobile frontend and backend are independent but connected via APIs Git version control is not optional — it's the backbone of professional software development

Working through the errors (like credential issues and package mismatches) was actually the most educational part, because debugging is a core real-world developer skill.