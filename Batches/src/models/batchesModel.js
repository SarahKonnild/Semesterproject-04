const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const batchesSchema = new Schema(
  {
    //Basic Batch
    batchId: { type: Number, required: true },
    beerType: { type: Number, required: true },
    batchSize: { type: Number, required: true },
    productionSpeed: { type: Number, required: true },
    dateProduced: { type: Date, default: Date.now },

    //Detailed Batch
    temperature: { type: Number },
    vibrations: { type: Number },
    humidity: { type: Number },
    valid: { type: Number },
    defects: { type: Number },
  },
  { versionKey: false }
);

const Batches = mongoose.model('Batches', batchesSchema);

module.exports = Batches;
