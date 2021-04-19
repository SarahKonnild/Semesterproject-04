//Importing dependencies
import express from "express"; 
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config()

//import { notFound, errorHandler } from '../middleware/notFoundRoute';

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
/* 
import * as authenticationRouter from '../../../Authentication/src/routes/authRoute';
import * as batchesRouter from '../../../Batches/src/routes/batchRoute';
import * as optimizationRouter from '../../../Optimization/src/routes/optimizationRoute';


app.use('/auth', authenticationRouter);
app.use('/batches', batchesRouter);
app.use('/optimization', optimizationRouter);
*/

import * as brewsterRouter from "../../../Brewster/src/routes/brewster.js";
app.use("/brewster", brewsterRouter.default);

app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Group 2 Semesterproject',
  });
});

//app.use(notFound);
//app.use(errorHandler);

//Setting server to listen to Port 5000
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
