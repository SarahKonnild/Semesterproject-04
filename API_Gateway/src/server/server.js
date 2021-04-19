//Importing dependencies
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

import { notFound, errorHandler } from '../middleware/notFoundRoute.js';

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
import * as authenticationRouter from '../../../Authentication/src/routes/authRoute.js';
import * as batchesRouter from '../../../Batches/src/routes/batchRoute.js';
import * as brewsterRouter from '../../../Brewster/src/routes/brewster.js';
import * as optimizationRouter from '../../../Optimization/src/routes/optimizationRoute.js';

app.use('/auth', authenticationRouter.router);
app.use('/batches', batchesRouter.router);
app.use('/brewster', brewsterRouter.router);
app.use('/optimization', optimizationRouter.router);

app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Group 2 Semesterproject',
  });
});

app.use(notFound);
app.use(errorHandler);

//Setting server to listen to Port 5000
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
