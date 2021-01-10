const express = require('express');
var mongoose = require('mongoose');
const app = express();
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv/config')

app.use(cors);
app.use(bodyParser.json());
//Routes

app.get('/',  (req, res) => {
    console.log(__dirname)
    res.sendFile(path.join(__dirname, '/public/index.html'));
})

const postRoute = require('./routes/post')
app.use('/post',postRoute);



//add db
mongoose.connect(
    process.env.DB_CONNECTION,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log("connected to db"));

var port = process.env.PORT || 3000;
app.listen(port, "0.0.0.0", function() {
console.log("Listening on Port 3000");
});
app.use(express.static(__dirname + '/public'));