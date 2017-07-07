var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var todoSchema = new Schema({
  todo: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  completed: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model("Todo", todoSchema);
