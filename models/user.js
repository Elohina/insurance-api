var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = Schema(
  {
    id: {type: String, required: true, max: 16, index: true},
    name: {type: String, required: true, max: 100},
    email: {type: String, required: true},
    role: {type: String, required: true},
  }
);

UserSchema.index({id: 1});

module.exports = mongoose.model('User', UserSchema);
