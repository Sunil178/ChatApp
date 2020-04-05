var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var historySchema = new Schema({
  from: String,
  to: String,
  message: String,
  type: Number,
  time : {
  	type : Date,
  	default: Date.now
  }
});

var History = mongoose.model('History', historySchema);

module.exports = History;