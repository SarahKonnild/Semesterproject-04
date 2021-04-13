import * as nodeOPCUA from '../opcua/controller';

/**
 * @author Simon Quvang
 *
 *
 * @param req this parameter must include a JSON formatted object: {"beers":int, "speed":int, "batchnumber":int, "beertype":int}
 * @param res this parameter will send back a JSON formatted object: {"statusCode":int, "measage":string}
 */
exports.startProduction = async function (req, res) {
  //beers, productionSpeed, batchnumber, beerType
  let someValue = await nodeOPCUA.startProductionController(
    req.body.beers,
    req.body.speed,
    req.body.batchNumber,
    req.body.beerType
  );
  res.send(someValue);
  res.end;
};
/**
 * @author Simon Quvang
 *
 *
 * @param req Dosent take any additional parameters
 * @param res this parameter will send back a JSON formatted object: {"statusCode":int, "measage":string}
 */
exports.stopProduction = async function (req, res) {
  returnValue = await nodeOPCUA.stopProductionController();
  res.send(returnValue);
  res.end;
};
/**
 * @author Simon Quvang
 *
 *
 * @param req Dosent take any additional parameters
 * @param res this parameter will send back a JSON formatted object: {"statusCode":int, "measage":string}
 */
exports.resetProduction = async function (req, res) {
  returnValue = await nodeOPCUA.resetProductionController();
  res.send(returnValue);
  res.end;
};

/**
 * @author Simon Quvang
 *
 *
 * @param req additional
 * @param res this parameter will send back a JSON formatted object: {"statusCode":int, "measage":string}
 */
exports.getProductionCount = async function (req, res) {
  returnValue = await nodeOPCUA.getProductionResultsController();
  res.send(returnValue);
  res.end;
};
