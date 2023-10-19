const routes = require('./routes');
const express = require('express');
const db = require('./config/connection');

const PORT = process.env.PORT || 3001;
const app = express();

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(routes);

// Start server
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
});