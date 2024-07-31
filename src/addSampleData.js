const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');

// Load environment variables from .env file
dotenv.config();

// Array of sample user data
const sampleUsers = [
  { name: 'John Doe', latitude: 40.7128, longitude: -74.0060 },
  { name: 'Jane Smith', latitude: 34.0522, longitude: -118.2437 },
  // Add more sample users as needed
];

// Function to add sample data to the database
const addSampleData = async () => {
  try {
    // Connect to MongoDB using connection string from environment variables
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    // Insert sample users into the User collection
    await User.insertMany(sampleUsers);
    console.log('Sample users added successfully');
    // Close the MongoDB connection
    mongoose.connection.close();
  } catch (err) {
    // Log error if insertion fails and close the MongoDB connection
    console.error('Error adding sample users:', err);
    mongoose.connection.close();
  }
};

// Call the function to add sample data
addSampleData();
