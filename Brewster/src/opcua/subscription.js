import * as CONSTANTS from "./constants.js";
import pkg from "node-opcua";
import * as connection from "./connection.js";
import * as command from "./command.js";

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

let nodeClass = [];

class node {
	nodeAdress;
	readings = {};
	constructor(nodeId) {
		this.nodeAdress = nodeId;
	}

	addNewReading(time, reading) {
		readings[time] = reading;
	}
	getReadings() {
		return readings;
	}
}

export function getSubscriptionValue() {
	return JSON.stringify(nodeClass);
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

	ids.forEach((id) => {
		nodeClass.push(new node(id));
	});

	let machineState = await command.getCurrentState(session);

	// Only run this code while the machine is running
	while (machineState == 6) {
		nodeClass.forEach((node) => {
			getValueFromNode(node, session);
		});

		// Run the code every 5 sec
		await sleep(5000);
	}
}

async function getValueFromNode(node, session) {
	const nodeToRead = [
		{
			nodeId: node.nodeAdress,
			attributeId: AttributeIds.Value
		}
	];

	const value = await (await session.read(nodeToRead)).value.value;
	let timestamp = Math.round(+new Date() / 1000);
	node.addNewReading(timestamp, value);
}
