// Import node_modules
const express = require('express')

// Import mongodb connect
const connectDB = require('./config/db')

// Import routes
const auth = require('./routes/auth')
const contacts = require('./routes/contacts')
const users = require('./routes/users')

// Initialize express
const app = express()

// Connect Database
connectDB()

// Init Middleware
app.use(express.json({ extended: false }))

// Define PORT number
const PORT = process.env.PORT || 5000

// Define routes
app.use('/api/auth', auth)
app.use('/api/contacts', contacts)
app.use('/api/users', users)

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
    
})