// DNS FIX (MUST BE FIRST)
const dns = require('dns');

dns.setServers([
  '8.8.8.8',   // Google DNS
  '8.8.4.4',   // Backup
  '1.1.1.1'    // Cloudflare
]);

// server.js
// This is the entry point of the application
// It connects to MongoDB database and starts the Express server

// Required for Node to read .env file
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

// required for communicating and connecting to the database
// and perform CRUD operations
const mongoose = require('mongoose');

// required for the application to run
const app = require('./app');

// Connect to the database and replace the password placeholder
// with the actual password from the environment variable
const DB = process.env.DATABASE.replace(
  '<db_password>',
  process.env.DB_PASSWORD
);

// Connect to MongoDB using mongoose
console.log(DB); // check the database connection string
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
    //useCreateIndex: true,
    //useFindAndModify: false
  })
  .then(() => {
    console.log('DB connection successful!')
  })
  .catch(err => {
    console.log('DB connection failed!');
    console.log(err);
  });

// Start the server on the port from config.env or default 3000
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
  console.log(`To test the IFT 458 REST App Click Or Type: http://localhost:${port}...`);
});
