const router = require('express').Router();

let Batches = require('../models/batchesModel');
const dbConnection = require('../db/Connection');
const verify = require('../middleware/verifyToken');

//Connection to access DB
let db = dbConnection.connection;
db.once('open', () => {
  console.log('Connection to Batches DB');
});

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
router.get(
  '/',
  /*verify,*/ (req, res) => {
    Batches.find()
      .then(batches => res.json(batches))
      .catch(err => res.status(404).json('Error: ' + err));
  }
);

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
router.get(
  '/:id',
  /*verify,*/ (req, res) => {
    Batches.findById(req.params.id)
      .then(batch => res.json(batch))
      .catch(err => res.status(400).json('Error: ' + err));
  }
);

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
router.post(
  '/add',
  /*verify,*/ (req, res) => {
    const newBatch = new Batches({
      //Basic Batch
      beerType: req.body.beerType,
      batchSize: req.body.batchSize,
      productionSpeed: req.body.productionSpeed,

      //Detailed Batch
      temperature: req.body.temperature,
      vibrations: req.body.vibrations,
      humidity: req.body.humidity,
      valid: req.body.valid,
      defects: req.body.defects,
    });

    newBatch
      .save()
      .then(() => res.json('Batch added'))
      .catch(err => res.status(400).json('Error: ' + err));
  }
);

module.exports = router;
