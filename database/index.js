const mongoose = require('mongoose');

mongoose.connect(process.env.CONNECTION_STRING)
    .then(() => console.log("Connected to DB"))
    .catch(() => console.log("Error: Unable to Connect To DB"));