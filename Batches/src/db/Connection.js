const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
const uri = process.env.DB_CONNECTION_BATCHES;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

module.exports = mongoose;
