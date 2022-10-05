require('dotenv').config()
const express = require('express');
const http = require('http');
const app = express();
const mongoose = require('mongoose');
const auth = require('./routes/auth');


mongoose.connect(process.env.URI, { useNewUrlParser: true }, () => {
    console.log('connected to db')
})


//middlewares
app.use(express.json());
app.use('/api/user', auth);

// http.createServer(app).listen(3000, () => {
//     console.log('Server started on port 3000');
// }
// );
app.listen(3000,()=>{
    console.log('sever running')
})