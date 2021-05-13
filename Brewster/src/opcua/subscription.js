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

/**
 * This class define a node by holding the adress and the readings.
 * It has a method to add new readings
 *
 **/
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
/**
 *
 * @returns Json object with 5 objects that each contains an object named readings that have the timestamp and values
 */
export function getSubscriptionValue() {
	return JSON.stringify(nodeClass);
}

/**
 * Helper function to make the process sleep for the define amount of time
 */
function sleep(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function startSubscription(session) {
	//Defineing the adresses of the nodes we want to read the value from
	let ids = [
		CONSTANTS.acceptableProductsNodeId,
		CONSTANTS.defectiveProductsNodeId,
		CONSTANTS.producedNodeID,
		CONSTANTS.getCurrentProductionSpeedNodeID,
		CONSTANTS.maintenanceStatusNodeID
	];
	//Creating some new node objects
	ids.forEach((id) => {
		nodeClass.push(new node(id));
	});

	let machineState = await command.getCurrentState(session);

	// Only run this code while the machine is running
	while (machineState == 6) {
		machineState = await command.getCurrentState(session);
		nodeClass.forEach((node) => {
			getValueFromNode(node, session);
		});

		// Run the code every 5 sec
		await sleep(5000);
	}
}

async function getValueFromNode(node, session) {
	//Define the node to be read
	const nodeToRead = [
		{
			nodeId: node.nodeAdress,
			attributeId: AttributeIds.Value
		}
	];
	//Read the node
	const value = await (await session.read(nodeToRead)).value.value;

	//Get current time in UNIX since epoch in milliseconds and then convert to seconds
	let timestamp = Math.round(+new Date() / 1000);

	//add timestamp and value to the node object
	node.addNewReading(timestamp, value);
}
