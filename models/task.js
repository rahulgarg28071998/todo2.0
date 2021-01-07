var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var taskModel = new Schema({
  title: String,
  asignee: String,
  asignedOn: Date,
  dueDate: Date,
  description: String,
  status: Number
});

// Compile model from schema
module.exports = mongoose.model('Tasks', taskModel);

