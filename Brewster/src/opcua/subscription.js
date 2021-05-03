import * as CONSTANTS from "./constants.js";
import pkg from "node-opcua";
import * as connection from "./connection.js";
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

let keyValues = {};

export function getSubscriptionValue() {
	return keyValues;
}

function sleep(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function startSubscription(session) {
	let ids = [
		CONSTANTS.acceptableProductsNodeId,
		CONSTANTS.defectiveProductsNodeId,
		CONSTANTS.producedNodeID,
		CONSTANTS.getCurrentProductionSpeedNodeID,
		CONSTANTS.maintenanceStatusNodeID
	];

	ids.forEach(function (nodeId) {
		getValueFromNode(nodeId, session);
	});

	await sleep(5000)
}

async function getValueFromNode(nodeId, session) {
	const nodeToRead = [
		{
			nodeId: nodeId,
			attributeId: AttributeIds.Value
		}
	];

	const value = await (await session.read(nodeToRead)).value.value;

	keyValues[nodeId] = value;
}
