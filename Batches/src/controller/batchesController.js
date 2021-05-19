import Batches from '../model/batchesModel.js';
import dbConnection from '../db/Connection.js';

//Connection to access DB
let db = dbConnection.connection;
db.once('open', () => {
  console.log('Connection to Batches DB');
});

export function getAllBatches(req, res) {
  Batches.find()
    .then(batches => res.json(batches))
    .catch(err => res.status(404).json('Error: ' + err));
}

export function getBatchById(req, res) {
  Batches.findById(req.params.id)
    .then(batch => res.json(batch))
    .catch(err => res.status(400).json('Error: ' + err));
}

export async function addBatch(req, res) {
  const batchIdExists = await Batches.findOne({
    batchId: req.body.batchId,
  });
  if (batchIdExists) {
    return res.status(400).send('batchId already exists');
  }

  const newBatch = new Batches({
    //Basic Batch
    batchId: req.body.batchId,
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

  try {
    const savedBatch = await newBatch.save();
    res.send('The batch was added');
  } catch (error) {
    res.status(404).send(error);
  }
}
