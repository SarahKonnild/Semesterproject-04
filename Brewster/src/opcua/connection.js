import { simulationEndpointURL, physicalEndpointURL } from "./constants.js";
import pkg from "node-opcua";
const { OPCUAClient, MessageSecurityMode, SecurityPolicy } = pkg;
import BobTheBuilder from "./helperFunctions.js";
import * as error from "./errorCodes.js";
import * as command from "./commands.js";
import * as sub from "./subscription.js";

//Setting up the connection strategy
const connectionStrategy = {
    initialDelay: 1000,
    maxRetry: 1,
};

const clientOPCUA = OPCUAClient.create({
    applicationName: "MyClient",
    connectionStrategy: connectionStrategy,
    securityMode: MessageSecurityMode.None,
    securityPolicy: SecurityPolicy.None,
    endpoint_must_exist: false,
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

export async function getMachineStatus() {
    if (sub.getSubscriped()) {
        return BobTheBuilder(200, sub.getMachineStatus());
    } else {
        let session = null;
        try {
            //Starts the connection to the machine
            session = await startSession();

            //Checking to make sure there is an active connection, otherwise throw an error.
            if (session == null) {
                throw new error.NoSessionToMachineError();
            }

            // Read the state status of the machine
            let machineState = await command.getCurrentState(session);

            return BobTheBuilder(200, machineState);
        } catch (err) {
            return err instanceof error.CustomError
                ? err.toJson()
                : BobTheBuilder(400, "Unknown error");
        } finally {
            // Make sure to close down the session so its possible to connect to it again through another function
            if (session) await stopSession(session);
        }
    }
}
