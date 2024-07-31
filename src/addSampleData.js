const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');

dotenv.config();

const sampleUsers = [
  { name: 'John Doe', latitude: 40.7128, longitude: -74.0060 },
  { name: 'Jane Smith', latitude: 34.0522, longitude: -118.2437 },
  // Add more sample users as needed
];

const addSampleData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    await User.insertMany(sampleUsers);
    console.log('Sample users added successfully');
    mongoose.connection.close();
  } catch (err) {
    console.error('Error adding sample users:', err);
    mongoose.connection.close();
  }
};

addSampleData();
