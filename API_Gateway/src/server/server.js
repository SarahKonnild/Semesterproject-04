//Importing dependencies
const express = require('express');
const cors = require('cors');
require('typescript-require');
require('dotenv').config();

const middlewares = require('../middleware/notFoundRoute');

//Connection to Express for API and Setting Port for 5000
const app = express();
const port = process.env.PORT || 5000;

//Middleware
app.use(cors());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

//API Connection
<<<<<<< HEAD
// const authenticationRouter = require('../../../Services/Authentication/src/routes/auth');
const batchesRouter = require('../../../Batches/src/routes/batchRoute');
// const brewsterRouter = require('../../../Services/Brewster/src/routes/brewsterRoute');
const optimizationRouter = require('../../../Optimization/src/routes/optimizationRoute');

// app.use('/auth', authenticationRouter);
app.use('/batches', batchesRouter);
=======
const authenticationRouter = require('../../../Authentication/src/routes/authRoute');
// const batchesRouter = require('../../../Services/Batches/src/routes/batchesRoute');
// const brewsterRouter = require('../../../Services/Brewster/src/routes/brewsterRoute');
// const optimizationRouter = require('../../../Services/Optimization/src/routes/optimizationRoute');

app.use('/auth', authenticationRouter);
// app.use('/batches', batchesRouter);
>>>>>>> Authentication-Service
// app.use('/brewster', brewsterRouter);
app.use('/optimization', optimizationRouter);

app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Group 2 Semesterproject',
  });
});

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

//Setting server to listen to Port 5000
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
