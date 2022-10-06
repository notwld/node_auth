require('dotenv').config()
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const auth = require('./routes/auth');
const index = require('./routes/index');
const fs = require('fs');
const https = require('https');
const http = require('http');
const path = require('path');
const createError = require('http-errors');
const bodyParser = require("body-parser")

mongoose.connect(process.env.URI, { useNewUrlParser: true }, () => {
    console.log('connected to db')
})


//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.all('*', (req, res, next) => {
    if(req.secure){
        return next();
    }
    else{
        return res.redirect(307,`https://${req.hostname}:${process.env.SECURE_PORT}${req.url}`)
    }
})

//routes
app.use('/api/user', auth);
app.use('/', index);

const options = {
    key: fs.readFileSync(path.join(__dirname, 'bin', 'private.key')),
    cert: fs.readFileSync(path.join(__dirname, 'bin', 'certificate.pem'))
}


http.createServer(app).listen(process.env.PORT)

https.createServer(
    options
, app)
    .listen(process.env.SECURE_PORT, () => {
        console.log(`Server running on port https://localhost:${process.env.SECURE_PORT}`)
    })



