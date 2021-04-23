import { simulationEndpointURL, physicalEndpointURL } from "./constants.js";
import { createSubscription } from "./subscription.js";
import pkg from "node-opcua";
const { OPCUAClient, MessageSecurityMode, SecurityPolicy } = pkg;

//Setting up the connection strategy
const connectionStrategy = {
	initialDelay: 1000,
	maxRetry: 1
};

const clientOPCUA = OPCUAClient.create({
	applicationName: "MyClient",
	connectionStrategy: connectionStrategy,
	securityMode: MessageSecurityMode.None,
	securityPolicy: SecurityPolicy.None,
	endpoint_must_exist: false
});

export async function startSession() {
	let session = null;
	/*First we try to connect to the simulation and if that fails, 
    it should get caugt by the try catch and the it should try to connect to the physcial machine instead. It will return null if it couldnt connect to either of them. **/
	try {
		await clientOPCUA.connect(simulationEndpointURL);
	} catch (err) {
		try {
			await clientOPCUA.connect(physicalEndpointURL);
		} catch (error) {
			session = null;
		}
	} finally {
		session = await clientOPCUA.createSession();
		return session;
	}
}

export async function stopSession(session) {
	try {
		//Close the sesssion sheesh
		await session.close();

		// Do not forget to also close down the connection
		await clientOPCUA.disconnect();

		return "done";
	} catch (err) {
		return null;
	}
}

createSubscription(startSession())