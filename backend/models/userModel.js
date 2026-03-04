// userModel.js
// This file defines the User schema and model for MongoDB
// It handles user data structure, password hashing and password comparison

const mongoose = require('mongoose');
// import bcryptjs for password hashing
const bcrypt = require('bcryptjs');

// Define the user schema with all the fields
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please tell us your name!']
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    unique: true,
    lowercase: true // automatically convert email to lowercase
  },
  photo: String,
  role: {
    type: String,
    enum: ['client', 'staff', 'student', 'admin'], // only these roles are allowed
    default: 'client'
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 8,
    select: false // password will not be included in query results by default
  },
  // validate password confirmation matches the password
  passwordConfirmation: {
    type: String,
    required: [true, 'Please confirm your password'],
    // validate will only work on save or creating the user
    validate:{
        validator: function(pwd){
          return pwd === this.password;
        },
        message: " the password confirmation did not match"
    }
  },
  passwordChangedAt: Date,
  passwordResetExpires: Date,
  active: {
    type: Boolean,
    default: true,
    select: false // active field will not show in query results
  },
  roles:{
    type: String,
    default:'client'// authorization
  }
});

// Middleware that runs before saving to hash the password
userSchema.pre('save', async function(next){
  // Only hash the password if it was modified or is new
  if(!this.isModified('password')){
    // FIX: old code had "return next;" without the () parentheses
    // next is a function so you need to call it with next()
    // Without the () the middleware would just return the function reference
    // and not actually call the next middleware
    return next();
  }
  // if new and modified
  // npm install bcryptjs
  // Hash the password with cost of 12 (how intensive the CPU will be)
  this.password = await bcrypt.hash(this.password, 12);
  // We do not want to store the confirmation password in the database
  this.passwordConfirmation = undefined;
  next();
});

// Model instance method - will be available to all instances of User
// Compares the user supplied password with the hashed password in database
userSchema.methods.isPasswordMatch = async (userSuppliedPassword, currentHashedPasswordInDB)=>{
  return await bcrypt.compare(userSuppliedPassword, currentHashedPasswordInDB)
}

// Create the User model from the schema
const User = mongoose.model('User', userSchema);

module.exports = User;
