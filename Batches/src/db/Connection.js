import mongoose from 'mongoose';

import dotenv from 'dotenv';

dotenv.config();

mongoose.Promise = global.Promise;
const uri = process.env.DB_CONNECTION_BATCHES;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

export default mongoose;
