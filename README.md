# Node.js REST API

## Description
This is a Node.js REST API that accepts latitude and longitude as input parameters and returns a sorted list of users within a 10-kilometer radius.

## Setup

1. Clone the repository:
   ```sh
   git clone https://github.com/lakkaramnaveen/tmg.git
   cd node-rest-api
   npm init

2. Install dependencies
   ```sh
   npm install
   git init

3. Create MongoDB Atlas
   How to Create and Connect MongoDB Atlas Database in Node JS MongoDB - MongoDB Atlas connects Node JS
   ```sh
   Go ahead to https://www.youtube.com/watch?v=tkAmFt64DCk and install it.

4. Update mongoDB URI
   Go to .env file, paste your mongodb atlas url here
   ```sh
   MONGODB_URI=

5. Run
   Please run below command
   ```sh
   node addSampleData.js
   npm start

6. Access or hit the below url for checking the users in particular location
   ```sh
   http://localhost:3000/api/users?latitude=40.7128&longitude=-74.0060