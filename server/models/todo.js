var mongoose = require('mongoose');


var Todo = mongoose.model('Todo', {
  title: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  items: {
    type: Array,
    default: null
  },
  completed: {
    type: Boolean,
    default: false
  },
  completedAt: {
    type: Number,
    default: null
  }
});

module.exports = {Todo};
