const express = require("express");
const app = express();
const path = require("path");
var cookieParser = require('cookie-parser');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const errorHandler = require('./middleware/errorHandler')
const cors = require('cors')
require('module-alias/register')

const db = require('./config/keys').mongoURI;
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser())
app.use(methodOverride())

mongoose
    .connect(db, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

// Define routes
app.use(cors())

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
    next();
  });
app.use('/api/v1/users', require('@routes/api/v1/users'))
app.use('/api/v1/auth', require('@routes/api/v1/auth'))
// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}


app.use(errorHandler)
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

 module.exports = app;