// load the things we need
var mongoose = require('mongoose');
var schemaTypes = mongoose.Schema.Types;

// define the schema for our user model
var columnSchema = mongoose.Schema({
  name: String,
  key: String,
  type: String,
  required: Boolean,
  unique: Boolean,
  multiple: Boolean,
  customValidation: schemaTypes.mixed
});

// create the model for users and expose it to our app
module.exports = mongoose.model('Column', columnSchema);
