import * as nodeOPCUA from '../opcua/controller.js';

/**
 * @author Simon Quvang
 *
 *
 * @param req this parameter must include a JSON formatted object: {"beers":int, "speed":int, "batchnumber":int, "beertype":int}
 * @param res this parameter will send back a JSON formatted object: {"statusCode":int, "measage":string}
 */
export async function  startProduction(req, res) {
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
export async function stopProduction(req, res) {
	let returnValue = await nodeOPCUA.stopProductionController();
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
export async function resetProduction (req, res) {
  let returnValue = await nodeOPCUA.resetProductionController();
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
export async function getProductionCount(req, res) {
  let returnValue = await nodeOPCUA.getProductionResultsController();
  res.send(returnValue);
  res.end;
};

export function getSubscriptionValues(req, res) {
  let returnValue = await nodeOPCUA.getSubscriptionValueController();
  res.send(returnValue);
  res.end;
}
