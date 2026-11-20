// Name: Kombe Molinga Prince-charles
// Student Number: C0964367

// Import required packages
const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const dns = require('dns')

// Configure DNS servers for MongoDB Atlas SRV lookup: This line of code was provided by AI (ChatGPT) while debugging connection issues
dns.setServers(['8.8.8.8', '8.8.4.4'])

// Load environment variables
dotenv.config()

// Create Express application
const app = express()

// Get port number from environment variables
const PORT = process.env.PORT || 3000

// Configure PUG as the template engine
app.set('view engine', 'pug')

// Specify the folder containing PUG templates
app.set('views', './views')

// Middleware to process submitted form data
app.use(express.urlencoded({ extended: true }))

// Middleware to serve static files
app.use(express.static('public'))

// // Temporary homepage for testing
// app.get('/', (req, res) => {
//   res.send(
//     '<h1>User Management System</h1>' +
//       '<p>Application is running successfully!</p>',
//   )
// })

// Import user routes
const userRoutes = require('./routes/users')

// Connect user routes to the Express application
app.use('/users', userRoutes)

// Redirect the homepage to the users list
app.get('/', (req, res) => {
  res.redirect('/users')
})

// Function to connect to MongoDB and start the server
async function startServer() {
  try {
    // Connect to MongoDB Atlas
    await mongoose.connect(process.env.MONGODB_URI)

    console.log('MongoDB Atlas connected successfully!')

    // Start the Express server after database connection
    app.listen(PORT, () => {
      console.log(`Server is running at http://localhost:${PORT}`)
    })
  } catch (error) {
    // Display database connection errors
    console.error('Database connection failed:', error.message)

    // Stop the application if the database connection fails
    process.exit(1)
  }
}

// Execute the function
startServer()
