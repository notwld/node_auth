require('dotenv').config()
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const auth = require('./routes/auth');
const fs = require('fs');
const https = require('https');
const path = require('path');

mongoose.connect(process.env.URI, { useNewUrlParser: true }, () => {
    console.log('connected to db')
})


//middlewares
app.use(express.json());
app.use('/api/user', auth);


const port = 3000;
https.createServer({
    key: fs.readFileSync(path.join(__dirname,'bin', 'private.key')),
    cert: fs.readFileSync(path.join(__dirname,'bin', 'certificate.pem'))
}, app)
    .listen(port, () => {
        console.log(`Server running on port https://localhost:${port}`);
    })