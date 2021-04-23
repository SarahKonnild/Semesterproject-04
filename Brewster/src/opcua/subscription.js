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

function make_callback(_nodeId) {

    var nodeId = _nodeId;
    return  function(dataValue) {
        console.log(nodeId.toString() , "\t value : ",dataValue.value.value.toString());
   };
}


export function createSubscription(session) {
	const subscription = ClientSubscription.create(session, {
		requestedPublishingInterval: 2000,
		requestedMaxKeepAliveCount: 20,
		requestedLifetimeCount: 6000,
		maxNotificationsPerPublish: 1000,
		publishingEnabled: true,
		priority: 10
	});

	
	subscription
		.on("started",  () => {
			console.log("subscription started for 2 seconds - subscriptionId=", subscription.subscriptionId);
		})
		.on("keepalive",  () => {
			console.log("keepalive");
		})
		.on("terminated",  () => {
			console.log("terminated");
		});

	let ids = [
		CONSTANTS.acceptableProductsNodeId,
		CONSTANTS.defectiveProductsNodeId,
		CONSTANTS.producedNodeID,
		CONSTANTS.getCurrentProductionSpeedNodeID,
		CONSTANTS.maintenanceStatusNodeID
];

	ids.forEach(function(nodeId){
    let monitoredItem = subscription.monitor(
        {nodeId: nodeId, attributeId: AttributeIds.Value},
        {samplingInterval: 10, discardOldest: true, queueSize: 1});
    monitoredItem.on("changed",make_callback(nodeId));
});

	setTimeout(function () {
	subscription.terminate();
	}, 5000);
}
