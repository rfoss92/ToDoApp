var mongoose = require('mongoose');
var mLab = "mongodb://user1:TheFinal78@ds151508.mlab.com:51508/foss-todo"
var DB = "mongodb://localhost:27017/TodoApp"
mongoose.Promise = global.Promise;
// mongoose.connect(process.env.MONGODB_URI);

mongoose.connect(mLab, {
  useMongoClient: true
});


module.exports = {mongoose};
