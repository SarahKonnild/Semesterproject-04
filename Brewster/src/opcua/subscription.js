<<<<<<< HEAD
import * as CONSTANTS from './constants.js';
import pkg from 'node-opcua';
import * as command from './commands.js';
import * as error from './errorCodes.js';
import * as connection from './connection.js';
import BobTheBuilder from './helperFunctions.js';
=======
import * as CONSTANTS from "./constants.js";
import pkg from "node-opcua";
import * as command from "./commands.js";
import * as error from "./errorCodes.js";
import * as connection from "./connection.js";
import BobTheBuilder from "./helperFunctions.js";
import NoVariablesFromProduction from "./errorCodes.js";
>>>>>>> Production-Pages

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
    DataType,
    DataValue,
} = pkg;

let nodeClass = [];

/**
 * This class define a node by holding the adress and the readings.
 * It has a method to add new readings
 *
 **/
class node {
    nodeAdress;
    readings;
    name;
    constructor(nodeId, name) {
        this.nodeAdress = nodeId;
        this.readings = {};
        this.name = name;
    }

    addNewReading(time, reading) {
        this.readings[time] = reading;
    }
    getReadings() {
        return this.readings;
    }
}

function getReadingValueFromNodes(time, tempObj) {
    nodeClass.forEach(node => {
        //Looping through all the nodes names and adding their value for the given time
        tempObj[node.name] = node.readings[time];
    });

    return tempObj;
}

function SarahTheBuilder() {
<<<<<<< HEAD
    let jointReadings = { readings: [] };
    let tempObj = {};

    let node1Readings = nodeClass[0].getReadings();
    let entries = Object.keys(node1Readings);
=======
	let jointReadings = { readings: [] };
	let tempObj = {};
	if (!nodeClass) {
		throw NoVariablesFromProduction;
	}
	let node1Readings = nodeClass[0].getReadings();
	let entries = Object.keys(node1Readings);
>>>>>>> Production-Pages

    entries.forEach(element => {
        //Getting the time element and adding that
        tempObj['time'] = parseInt(element);

        //add the timestamp and its values to the array of readings
        jointReadings.readings.push(getReadingValueFromNodes(element, tempObj));
    });

    return jointReadings;
}
/**
 *
 * @returns Json object with 5 objects that each contains an object named readings that have the timestamp and values
 */
export function getSubscriptionValue() {
<<<<<<< HEAD
    return SarahTheBuilder();
=======
	try {
		return SarahTheBuilder();
	} catch (error) {
		return err instanceof error.CustomError ? err.toJson() : BobTheBuilder(400, "Unknown error");
	}
>>>>>>> Production-Pages
}

/**
 * Helper function to make the process sleep for the define amount of time
 */
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export async function startSubscription() {
    nodeClass.length = 0;
    //Creating some new node objects
    nodeClass.push(new node(CONSTANTS.getHumidityNodeID, 'humidity'));
    nodeClass.push(new node(CONSTANTS.getVibrationNodeID, 'vibration'));
    nodeClass.push(new node(CONSTANTS.getTemperaturNodeID, 'temperatur'));

    let session = null;
    await sleep(1000); // needs to wait a bit for the machine to be ready for connection
    try {
        //Trying to start up a connection to the machine
        session = await connection.startSession();

        //Checking to make sure there is an active connection, otherwise throw an error.
        if (session == null) {
            throw new error.NoSessionToMachineError();
        }

        let machineState = await command.getCurrentState(session);
        // Only run this code while the machine is running
        let startTime = Math.round(+new Date() / 1000);
        while (machineState == 6) {
            machineState = await command.getCurrentState(session);
            nodeClass.forEach(node => {
                getValueFromNode(node, session, startTime);
            });

            // Run the code every 5 sec
            await sleep(1000);
        }
    } catch (err) {
        return err instanceof error.CustomError
            ? err.toJson()
            : BobTheBuilder(400, 'Unknown error');
    } finally {
        SarahTheBuilder();
        await connection.stopSession(session);
    }
}

async function getValueFromNode(node, session, startTime) {
    //Define the node to be read
    const nodeToRead = [
        {
            nodeId: node.nodeAdress,
            attributeId: AttributeIds.Value,
        },
    ];
    //Read the node
    const value = await (await session.read(nodeToRead))[0].value.value;

    //Get current time in UNIX since epoch in milliseconds and then convert to seconds
    let timeSinceStart = Math.round(+new Date() / 1000) - startTime;

    //add timestamp and value to the node object
    node.addNewReading(timeSinceStart, value);
}
