const express = require('express');
const app = express();
const http = require('http').Server(app);

// internal
const routes = require('./routes/routes.js');
const PORT = 8080;

// Routes
app.use('/', routes);

// listen server
const server = http.listen(PORT, function() {
    console.log(`listening on *:${PORT}`);
});