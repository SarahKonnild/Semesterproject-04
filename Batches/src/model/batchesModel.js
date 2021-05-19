import mongoose from 'mongoose';

const reqNumber = {
    type: Number,
    required: true,
};

const noReqNumber = {
    type: Number,
    required: false,
};

const dateProperties = {
    type: Date,
    default: Date.now,
};

const readingSchema = mongoose.Schema({
    time: noReqNumber,
    temperature: noReqNumber,
    vibrations: noReqNumber,
    humidity: noReqNumber,
});

const readingsProperties = {
    type: [readingSchema],
    required: false,
};

const batchesSchema = mongoose.Schema(
    {
        //Basic Batch
        batchId: reqNumber,
        beerType: reqNumber,
        batchSize: reqNumber,
        productionSpeed: reqNumber,
        dateProduced: dateProperties,

        //Detailed Batch
        readings: readingsProperties,
        valid: noReqNumber,
        defects: noReqNumber,
    },
    { versionKey: false }
);

const Batches = mongoose.model('Batches', batchesSchema);

export default Batches;
