var mongoose = require('mongoose');
var mLab = "https://api.mlab.com/api/1/databases/foss-todo/collections/todo?apiKey=zdZwEsvwpYnj4S1SXkcwrrePZLgjcsjv"
var DB = 'mongodb://localhost:27017/TodoApp'
mongoose.Promise = global.Promise;
// mongoose.connect(process.env.MONGODB_URI);

mongoose.connect(mLab, {
  useMongoClient: true
});


module.exports = {mongoose};
