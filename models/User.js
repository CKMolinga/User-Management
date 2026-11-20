// Import Mongoose
const mongoose = require('mongoose')

/*
 * User Schema
 *
 * Defines the structure and validation rules
 * for user records in the database.
 */
const userSchema = new mongoose.Schema(
  {
    // User's last name
    lastName: {
      type: String,
      required: [true, 'Last name is required'],
      trim: true,
    },

    // User's first name
    firstName: {
      type: String,
      required: [true, 'First name is required'],
      trim: true,
    },

    // User's date of birth
    dateOfBirth: {
      type: Date,
      required: [true, 'Date of birth is required'],

      // Validate DOB: A DOB cannot be in the future
      validate: {
        validator: function (value) {
          return value <= new Date()
        },
        message: 'Date of birth cannot be in the future',
      },
    },

    // Primary residential address
    address1: {
      type: String,
      required: [true, 'Address is required'],
      trim: true,
    },

    // Secondary address (optional)
    address2: {
      type: String,
      trim: true,
      default: '',
    },

    // User's city
    city: {
      type: String,
      required: [true, 'City is required'],
      trim: true,
    },

    // Postal or ZIP code
    postalCode: {
      type: String,
      required: [true, 'Postal code is required'],
      trim: true,
    },

    // User's country
    country: {
      type: String,
      required: [true, 'Country is required'],
      trim: true,
    },

    // User's contact phone number
    phoneNumber: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
    },

    // User's email address
    email: {
      type: String,
      required: [true, 'Email address is required'],
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'],
    },

    // Additional information about the user (optional)
    userNotes: {
      type: String,
      trim: true,
      default: '',
    },
  },
  {
    // Automatically add createdAt and updatedAt fields
    timestamps: true,
  },
)

// Create and export the User model
const User = mongoose.model('User', userSchema)

module.exports = User
