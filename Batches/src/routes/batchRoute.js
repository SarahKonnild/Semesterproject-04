import express from 'express';

import * as batches from '../controller/batchesController.js';
import { verifyToken } from '../middleware/verifyToken.js';

const router = express.Router();

/**
 * @author Kasper Svane
 *
 * The GET method for all batches
 *
 * The route "/" defines the path for accessing all the batches available in the database
 *
 * If the batches are found then they will be displayed in JSON format
 * If can error occurred then a statuscode of 404 "Not Found" in JSON format with the error message will be prompted to the user
 *
 */
router.get('/', /* verifyToken , */ batches.getAllBatches);

/**
 * @author Kasper Svane
 *
 * The GET method for a specific batch
 *
 * The route "/:id" defines the path for accessing a specific batch available in the database
 *
 * If the batch are found by its id then it will be displayed in JSON format
 * If can error occurred then a statuscode of 400 "Bad Request" in JSON format with the error message will be prompted to the user
 *
 */
router.get('/:id', /* verifyToken , */ batches.getBatchById);

/**
 * @author Kasper Svane
 *
 * The POST method to add a batch to the database
 *
 * The route "/add" defines the path for posting a specific batch available in the database
 *
 * @req Defined from the batches.model.js batchNumber, beerType, batchSize and productionSpeed are required where acceptable and defects can be empty
 *
 * When the variables in newBatch are entered to be stored then newBatch.save() is called to save the data to the database
 *
 * If the batch are added then the user will be prompted with 'Batch added' displayed in JSON format
 * If can error occurred then a statuscode of 400 "Bad Request" in JSON format with the error message will be prompted to the user
 *
 */
router.post('/add', /* verifyToken , */ batches.addBatch);

export { router };
