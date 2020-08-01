const express = require("express");
const app = express();
const path = require("path");
var cookieParser = require('cookie-parser');
const methodOverride = require('method-override')
require('module-alias/register')

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser())
app.use(methodOverride())

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));



 module.exports = app;