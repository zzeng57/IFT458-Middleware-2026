# IFT458 Middleware 2026 - Book Exchange Platform

A React Native + Express.js mobile application for the IFT-458 Middleware Programming course. Students can register, login, and exchange books through a mobile app that connect to a RESTful API backend.

## Project Structure

- **backend/** - Express.js API server with MongoDB, JWT authentication, and book CRUD operations
- **mobile/** - React Native Expo app with screens for login, register, book exchange, and more

## Quick Start

### Backend
```bash
cd backend
npm install
npm start
```
Server run at http://localhost:4000

### Mobile App
```bash
cd mobile
npm install
npx expo start
```
Press `w` for web browser, scan QR code for phone (Expo Go), or press `a`/`i` for emulator.

## Tech Stack

- **Backend:** Node.js, Express.js, MongoDB, Mongoose, JWT, bcryptjs, CORS
- **Mobile:** React Native, Expo SDK 50, AsyncStorage
- **Auth:** JSON Web Tokens (Bearer header for mobile, cookies for web)

## API Endpoints

| Method | Route | Description |
|--------|-------|-------------|
| POST | /api/v1/users/signup | Register new user |
| POST | /api/v1/users/login | Login user |
| GET | /api/v1/books | Get all books (auth) |
| POST | /api/v1/books | Create book (auth) |
| PUT | /api/v1/books/:id | Update book (auth) |
| DELETE | /api/v1/books/:id | Delete book (auth) |

## Setup Guide

Start the backend server and visit http://localhost:4000 for the full interactive setup guide with step-by-step instructions.
