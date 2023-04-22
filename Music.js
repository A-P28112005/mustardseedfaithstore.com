const express = require('express');
const app = express();
const songs = require('./songs'); // Import songs data from a songs.js file or database

// Define API endpoints for fetching songs
app.get('/api/songs', (req, res) => {
    // Retrieve songs data from database or other source
    // and send it as a JSON response
    res.json(songs);
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});