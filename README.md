# IFT458 Middleware 2026 - Book Exchange Platform

React Native + Express.js mobile application for the IFT-458 Middleware Programming course. Students can register, login, and exchange books through a mobile app that connect to a RESTful API backend.

## How to Run the Project

You need to open two separate VS Code windows. One for the backend server and one for the mobile app. They run at the same time in different terminals.

### Step 1: Open Backend in VS Code

Open VS Code and go to File > Open Folder. Navigate to the `backend` folder and open it. This is your first VS Code window for the server.

Open a Terminal inside VS Code by going to Terminal > New Terminal (or press Ctrl + ` on your keyboard).

## IMPORTANT ##
Since Git will not push the .env or any file name that starts with "." for security. Such as your applications keys. You will need to copy over your last "config.env" file to the back end project. Make sure the PORT configuration is set to 4000, this is a hard requirement for this assignment.

Then Install the dependencies first:

```
npm install
```

Then start the backend server by typing:

```
node server.js
```

You should see "App running on port 4000..." and "DB connection successful!" in the terminal. Keep this terminal open and running.

## Load the root path by typing in a browser 
```
http://localhost:4000
```

### Step 2: Open Mobile App in a Second VS Code Window

Open a brand new VS Code window by going to File > New Window. Then go to File > Open Folder and navigate to the `mobile` folder and open it. This is your second VS Code window for the mobile app.

Open a Terminal inside this VS Code window the same way (Terminal > New Terminal).

Install the mobile dependencies:

```
npm install
```

Then start the Expo development server:

```
npx expo start
```

You should see a QR code in the terminal. Press **W** on your keyboard to open the app in your web browser.

## ON ERROR ##
Most likely you have an aolder version of expo
Update the "expo" package by installing 

```
npx expo install expo@latest
npx expo start
```


### Step 3: Test the App

Once both the backend and mobile are running, you can register a new user, login, and use the book exchange features. Visit http://localhost:4000 in your browser for the full interactive setup guide with more details.

## Project Structure

- **backend/** - Express.js API server with MongoDB, JWT authentication, and book CRUD operations
- **mobile/** - React Native Expo app with screens for login, register, book exchange, and more

## Tech Stack

- Backend: Node.js, Express.js, MongoDB, Mongoose, JWT, bcryptjs, CORS
- Mobile: React Native, Expo SDK 50, AsyncStorage
- Auth: JSON Web Tokens (Bearer header for mobile, cookies for web)

## API Endpoints

| Method | Route | Description |
|--------|-------|-------------|
| POST | /api/v1/users/signup | Register new user |
| POST | /api/v1/users/login | Login user |
| GET | /api/v1/books | Get all books (auth) |
| POST | /api/v1/books | Create book (auth) |
| PUT | /api/v1/books/:id | Update book (auth) |
| DELETE | /api/v1/books/:id | Delete book (auth) |

## Full Setup Guide

Start the backend server and visit http://localhost:4000 for the full interactive setup guide with step-by-step instructions, device options, testing guide, API reference, troubleshooting, and Git workflow.

# Update: Edited by Jared Esquibel for Git assignment

## Assignment Test Edit
This line was added to demonstrate editing a file in VS Code.
This is another test edit.

<!-- Test edit for Step 3 -->
