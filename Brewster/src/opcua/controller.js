/**
 * @author Simon Quvang
 *
 * The entire TypeScript is implementation enabling the transmission between the brewing machine and the MES system
 */

import * as CONSTANTS from "./constants.js";
//Importing dependencies for Node OPC UA
import pkg from "node-opcua";
const {
	OPCUAClient,
	MessageSecurityMode,
	SecurityPolicy,
	AttributeIds,
	makeBrowsePath,
	ClientSubscription,
	TimestampsToReturn,
	MonitoringParametersOptions,
	ReadValueIdLike,
	ClientMonitoredItem,
	DataType
} = pkg;
import * as production from "./production.js";

export function startProductionController(beers, speed, batchNumber, beerType) {
	return production.startProduction(beers, speed, batchNumber, beerType);
}
export function stopProductionController() {
	return production.stopProduction();
}
export function resetProductionController() {
	return production.resetProduction();
}
export function getProductionResultsController() {
	return production.getProductionResults();
}
