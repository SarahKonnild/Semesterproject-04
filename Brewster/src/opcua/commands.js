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

export async function changeToState(session, command) {
	//Setting up the payload to send to the machine
	const stateToWrite = [
		{
			nodeId: CONSTANTS.stateNodeID,
			attributeId: AttributeIds.Value,
			indexRange: null,
			value: {
				value: {
					dataType: DataType.Int32,
					value: command
				}
			}
		}
	];

	//writes the payload to the machine
	await session.write(stateToWrite);
}

export async function changeStateToTrue(session) {
	//Send request to change state
	let changeStateRequest = true;

	// Setting up the payload to send to the machine
	const changeStateRequestToWrite = [
		{
			nodeId: CONSTANTS.requestChangeCommandNodeID,
			attributeId: AttributeIds.Value,
			indexRange: null,
			value: {
				value: {
					dataType: DataType.Boolean,
					value: changeStateRequest
				}
			}
		}
	];

	// sending the write command to the machine together with the payload
	await session.write(changeStateRequestToWrite);
}

export async function getCurrentState(session) {
	//Reads the current state of the machine, by accessing the node adress and getting the value
	const nodeToRead = {
		nodeId: CONSTANTS.currentStateNodeID,
		attributeId: AttributeIds.Value
	};

	const stateStatus = await (await session.read(nodeToRead)).value.value;

	return stateStatus;
}
