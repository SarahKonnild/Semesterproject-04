import * as CONSTANTS from "./constants.js";
//Importing dependencies for Node OPC UA
import pkg from "node-opcua";
import * as command from "./commands.js";
import * as connection from "./connection.js";
import * as subscription from "./subscription.js";
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

function sleep(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

function jsonBuilder(statusCode, message) {
	return { statusCode: statusCode, message: message };
}

class MachineNotReadyError extends Error {
	constructor(){
		super("Machine not ready for production, please reset the machine to state 4");
		this.name - "MachineNotReadyError"
	}

}

export async function startProduction(beers, productionSpeed, batchnumber, beerType) {
	//Saving the adresses of the nodes to be used in this function.
	let session = null;

	try {
		//Trying to start up a connection to the machine
		session = await connection.startSession();

		//Checking to make sure there is an active connection, otherwise throw an error.
		if (session == null) {
			throw new Error("No session");
		}

		let state = await command.getCurrentState(session);

		if (state != 4) throw new MachineNotReadyError;

		// setting the amount of beers to produce
		const beerAmountToWrite = [
			{
				nodeId: CONSTANTS.batchSizeNodeID,
				attributeId: AttributeIds.Value,
				indexRange: null,
				value: {
					value: {
						dataType: DataType.Float,
						value: beers
					}
				}
			}
		];

		await session.write(beerAmountToWrite);

		// Seting the production speed
		const productionSpeedToWrite = [
			{
				nodeId: CONSTANTS.productionSpeedNodeID,
				attributeId: AttributeIds.Value,
				indexRange: null,
				value: {
					value: {
						dataType: DataType.Float,
						value: productionSpeed
					}
				}
			}
		];

		await session.write(productionSpeedToWrite);

		// Setting the batchnumber

		const batchnumberToWrite = [
			{
				nodeId: CONSTANTS.batchNumberNodeID,
				attributeId: AttributeIds.Value,
				indexRange: null,
				value: {
					value: {
						dataType: DataType.Float,
						value: batchnumber
					}
				}
			}
		];

		await session.write(batchnumberToWrite);

		// Setting the type of beer to produce
		const beerTypeToWrite = [
			{
				nodeId: CONSTANTS.beerTypeNodeID,
				attributeId: AttributeIds.Value,
				indexRange: null,
				value: {
					value: {
						dataType: DataType.Float,
						value: beerType
					}
				}
			}
		];

		await session.write(beerTypeToWrite);

		//Send the command to put the machine in the start production state
		await command.changeToState(session, CONSTANTS.startProductionCommand);

		//Send command to change the state
		await command.changeStateToTrue(session);

		// Setting subscriptions

		subscription.startSubscription(session);

		// The return value in JSON gets passed to the API controller that sends it back to the frontend
		return jsonBuilder(201, "Starting production");
	} catch (err) {
		
		return { statusCode: 400, message: "Starting production failed", error: err };
	} finally {
		// Make sure to close down the session so its possible to connect to it again through another function
		if (session != null) {
			await connection.stopSession(session);
		}
	}
}
export async function stopProduction() {
	let session = null;
	try {
		// Trying to make a connection to the machine
		session = await connection.startSession();

		//Checking to make sure there is an active connection, otherwise throw an error.
		if (session == null) {
			throw new Error("No session");
		}

		// check if a production is going on then kill it
		let machineState = await command.getCurrentState(session);

		// if the machine is currently in the state of production then execute this, otherwise return bad request
		if (machineState == 6) {
			//Change state on machine
			await command.changeToState(session, CONSTANTS.stopProductionCommand);

			//Send request to change state
			await command.changeStateToTrue(session);

			return { statusCode: 200, message: "Production stopped" };
		} else {
			return { statusCode: 400, message: "No production to be stopped" };
		}
	} catch (err) {
		console.log("Error happened", err);
		return { statusCode: 400, message: "Failed to stop the production", error: err };
	} finally {
		// Make sure to close down the session so its possible to connect to it again through another function
		if (session != null) {
			await connection.stopSession(session);
		}
	}
}
export async function resetProduction() {
	let session = null;
	try {
		//Trying to start up a connection to the machine
		session = await connection.startSession();

		//Checking to make sure there is an active connection, otherwise throw an error.
		if (session == null) {
			throw new Error("No session");
		}
		// Getting the state of the machine
		let machineState = await command.getCurrentState(session);
		let newMachineState = null;

		// If the machine is either in aborted state(2) or is finished with a production(17).
		if (machineState == 2 || machineState == 17) {
			//Change state on machine
			await command.changeToState(session, CONSTANTS.resetProductionCommand);

			//Send request to change state
			await command.changeStateToTrue(session);
			await sleep(1000);
			newMachineState = await command.getCurrentState(session);

			//Return a json object if it managed to reset
			return { statusCode: 200, message: "Beer Machine reset", oldState: machineState, newState: newMachineState };
		} else {
			//Return a json object if it isnt in state 2 or 17
			return {
				statusCode: 400,
				message: "Beer Machine is not in a state it can reset from",
				oldState: machineState,
				newState: newMachineState
			};
		}
	} catch (err) {
		// Return a JSON object if it failed at some point.
		return { statusCode: 400, message: "Failed to reset the beer machine", error: err };
	} finally {
		// Make sure to close down the session so its possible to connect to it again through another function
		if (session != null) {
			await connection.stopSession(session);
		}
	}
}

/**
 * The function takes no parameters, but will connect to the machine, check if the machine is in state 17.
 * If the machine is in state 17 that means that a production is done and it can then get the amounts of defective and valid products.
 * It gets those numbers by connection to the nodes on the machine that holds those values.
 *
 * Finally the function will return a JSON object with the information.
 */
export async function getProducedAmount() {
	let defectiveCount = null;
	let acceptableCount = null;

	let session = null;
	try {
		//Starts the connection to the machine
		session = await connection.startSession();

		//Checking to make sure there is an active connection, otherwise throw an error.
		if (session == null) {
			throw new Error("No session");
		}

		// Read the state status of the machine
		let machineState = await command.getCurrentState(session);

		//Checking to see if the machine is done with the production
		if (machineState == 17) {
			//Reads the 2 values we need to return
			const defectiveNodeRead = {
				nodeId: CONSTANTS.defectiveProductsNodeId,
				attributeId: AttributeIds.Value
			};
			const acceptableNodeRead = {
				nodeId: CONSTANTS.acceptableProductsNodeId,
				attributeId: AttributeIds.Value
			};

			defectiveCount = await session.read(defectiveNodeRead);
			acceptableCount = await session.read(acceptableNodeRead);

			//Setting up the json return object
			let returnResult = {
				statusCode: 200,
				message: "Got the values",
				defective: defectiveCount.value.value,
				acceptable: acceptableCount.value.value
			};
			return returnResult;
		} else {
			// Returns the statuscode that means bad request and a message
			return { statusCode: 400, message: "Production has not finished" };
		}
	} catch (err) {
		console.log("Ohh no something went wrong when opening connection ", err);
		return { statusCode: 400, message: "Failed to get the produced amounts", error: err };
	} finally {
		// Make sure to close down the session so its possible to connect to it again through another function
		if (session != null) {
			await connection.stopSession(session);
		}
	}
}
