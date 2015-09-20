// load the things we need
var mongoose = require('mongoose');
var schemaTypes = mongoose.Schema.Types;

// define the schema for our user model
var sheetSchema = mongoose.Schema({
  name: String,
  owner: { type: schemaTypes.ObjectId, ref: 'User' },
  collaborators: [
    { type: schemaTypes.ObjectId, ref: 'User' }
  ],
  published: Boolean,
  columns: [
    { type: schemaTypes.ObjectId, ref: 'Column' }
  ],
  rows: [
    { type: schemaTypes.ObjectId, ref: 'Row' }
  ],
});

// create the model for users and expose it to our app
module.exports = mongoose.model('Sheet', sheetSchema);
