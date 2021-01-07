const express = require('express');
var mongoose = require('mongoose');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv/config')

// app.use(cors);
app.use(bodyParser.json());
//Routes

const postRoute = require('./routes/post')
app.use('/post',postRoute);

//add db
mongoose.connect(
    process.env.DB_CONNECTION,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log("connected to db"));

app.listen(3000);