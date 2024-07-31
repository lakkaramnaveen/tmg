// Import required modules
const express = require('express'); // Express framework for building web applications
const connectDB = require('./config'); // Database connection module
const userRoutes = require('./routes/userRoutes'); // User routes module
const dotenv = require('dotenv'); // Module to load environment variables from a .env file

// Load environment variables from .env file
dotenv.config();

// Create an instance of an Express application
const app = express();

// Connect to the MongoDB database
connectDB();

// Middleware to parse incoming JSON requests
app.use(express.json());

// Define a route for user-related API endpoints
app.use('/api', userRoutes);

// Set the port for the server to listen on, either from an environment variable or default to 3000
const PORT = process.env.PORT || 3000;

// Start the server and listen for incoming requests on the defined port
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
