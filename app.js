// Imports
const express = require('express'); // Middleware that simplify writing routes
const process = require('process'); // Middleware to have access to environment variable, UNIX user, port or any UNIX variable defined
const cors = require('cors');
const passwordsRoutes = require('./routes/password'); // Our routes

// Server
const server = express();
server.use(cors());
server.use(express.json());
server.use('/password', passwordsRoutes);

// Error 404 handler
server.use((req, res) => {
  console.error('Page not found: ' + req.url);
  res.status(404).send('Not found');
});

// Error 500 handler
server.use((err, req, res) => {
  console.error('Internal server error');
  console.error(err);
  res.status(500).send('Internal server error');
});

// Set the server port for inbound connection to either a pre-defined port in the environment variable or port 5000
const port = process.env.PORT || 5000;
server.listen(port);
console.log(`Password API (dev server) listening on port ${port}`);