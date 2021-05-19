/**
 * @author Simon Quvang
 *
 * The entire TypeScript is implementation enabling the transmission between the brewing machine and the MES system
 */

import * as CONSTANTS from "./constants.js";
import * as commands from "./commands.js";
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
import * as subscription from "./subscription.js";

export async function startProductionController(batchId, beerType, batchSize, productionSpeed) {
	return await production.startProduction(batchId, beerType, batchSize, productionSpeed);
}
export async function stopProductionController() {
	try {
		return await production.stopProduction();
	} catch (error) {
		console.log(error.message);
	}
}
export async function resetProductionController() {
	return await production.resetProduction();
}
export async function getProductionResultsController() {
	return await production.getProductionResults();
}
export function getSubscriptionValueController() {
	return subscription.getSubscriptionValue();
}
export function getMachineStatusController() {
	return commands.getMachineStatus();
}
