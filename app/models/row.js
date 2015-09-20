// load the things we need
var mongoose = require('mongoose');
var schemaTypes = mongoose.Schema.Types;

// define the schema for our user model
var rowSchema = mongoose.Schema({
  cells: schemaTypes.mixed
});

// create the model for users and expose it to our app
module.exports = mongoose.model('Row', rowSchema);
