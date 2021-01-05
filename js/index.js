var express = require('express');
var mongo = require('mongodb');
var app = express();

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});


// mongo db connection
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://testUser123:testUser123@cluster0.xzhtn.mongodb.net/tododb?retryWrites=true&w=majority";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  console.log("Database created!");
  db.close();
});