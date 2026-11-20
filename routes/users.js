// Import Express
const express = require('express')

// Import the User model
const User = require('../models/User')

// Create an Express router
const router = express.Router()

// GET /users
// Retrieve all users and display them in a table
router.get('/', async (req, res) => {
  try {
    // Retrieve all user records from MongoDB
    const users = await User.find().sort({ lastName: 1, firstName: 1 })

    // Render the users page and pass the retrieved records
    res.render('index', {
      title: 'User Management System',
      users: users,
      message: req.query.message || '',
      error: req.query.error || '',
    })
  } catch (error) {
    // Log any database errors
    console.error('Error retrieving users:', error)

    // Display an error message
    res.status(500).send('Unable to retrieve users.')
  }
})

// GET /users/add
// Display the form for adding a new user
router.get('/add', (req, res) => {
  res.render('add-user', {
    title: 'Add New User',
    error: req.query.error || '',
  })
})

// POST /users/add
// Save a new user record in MongoDB
router.post('/add', async (req, res) => {
  try {
    // Create a new User document using the submitted form data
    const newUser = new User({
      lastName: req.body.lastName,
      firstName: req.body.firstName,
      dateOfBirth: req.body.dateOfBirth,
      address1: req.body.address1,
      address2: req.body.address2,
      city: req.body.city,
      postalCode: req.body.postalCode,
      country: req.body.country,
      phoneNumber: req.body.phoneNumber,
      email: req.body.email,
      userNotes: req.body.userNotes,
    })

    // Save the new user to MongoDB
    await newUser.save()

    // Redirect to the users table after successful creation
    res.redirect('/users?message=User added successfully')
  } catch (error) {
    // Display the error in the terminal
    console.error('Error adding user:', error)

    // Redirect back to the add-user page with an error message
    res.redirect('/users/add?error=Unable to add user. Check your information')
  }
})

// GET /users/:id/edit
// Retrieve a specific user and display the edit form
router.get('/:id/edit', async (req, res) => {
  try {
    // Find the user using their MongoDB ID
    const user = await User.findById(req.params.id)

    // Check whether the user exists
    if (!user) {
      return res.redirect('/users?error=User not found')
    }

    // Render the edit page and pass the user's information
    res.render('edit-user', {
      title: 'Update User',
      user: user,
      error: req.query.error || '',
    })
  } catch (error) {
    console.error('Error retrieving user:', error)

    res.status(500).send('Unable to retrieve user.')
  }
})

// POST /users/:id/edit
// Update an existing user record
router.post('/:id/edit', async (req, res) => {
  try {
    // Find the existing user in MongoDB
    const user = await User.findById(req.params.id)

    // Check whether the user exists
    if (!user) {
      return res.redirect('/users?error=User not found')
    }

    // Update the user's information with submitted form values
    user.lastName = req.body.lastName
    user.firstName = req.body.firstName
    user.dateOfBirth = req.body.dateOfBirth
    user.address1 = req.body.address1
    user.address2 = req.body.address2
    user.city = req.body.city
    user.postalCode = req.body.postalCode
    user.country = req.body.country
    user.phoneNumber = req.body.phoneNumber
    user.email = req.body.email
    user.userNotes = req.body.userNotes

    // Save the updated document
    await user.save()

    // Redirect to the users table
    res.redirect('/users?message=User updated successfully')
  } catch (error) {
    console.error('Error updating user:', error)

    // Return to the edit page if validation or saving fails
    res.redirect(
      `/users/${encodeURIComponent(req.params.id)}/edit?error=Unable to update user. Check your information`,
    )
  }
})

// POST /users/:id/delete
// Delete a user record from MongoDB
router.post('/:id/delete', async (req, res) => {
  try {
    // Find the user and delete the document
    const deletedUser = await User.findByIdAndDelete(req.params.id)

    // Check whether a user was actually deleted
    if (!deletedUser) {
      return res.redirect('/users?error=User not found')
    }

    // Redirect to the users table after deletion
    res.redirect('/users?message=User deleted successfully')
  } catch (error) {
    console.error('Error deleting user:', error)

    res.status(500).send('Unable to delete user.')
  }
})

// Export the router
module.exports = router
