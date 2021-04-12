function createSubscription(session, nodeId) {
	const subscription = ClientSubscription.create(session, {
		requestedPublishingInterval: 2000,
		requestedMaxKeepAliveCount: 20,
		requestedLifetimeCount: 6000,
		maxNotificationsPerPublish: 1000,
		publishingEnabled: true,
		priority: 10
	});

	subscription
		.on("started", function () {
			console.log("subscription started for 2 seconds - subscriptionId=", subscription.subscriptionId);
		})
		.on("keepalive", function () {
			console.log("keepalive");
		})
		.on("terminated", function () {
			console.log("terminated");
		});

	// install monitored item

	const itemToMonitor = {
		nodeId: nodeId,
		attributeId: AttributeIds.Value
	};
	const parameters = {
		samplingInterval: 100,
		discardOldest: true,
		queueSize: 10
	};

	const monitoredItem = ClientMonitoredItem.create(subscription, itemToMonitor, parameters, TimestampsToReturn.Both);

	monitoredItem.on("changed", (dataValue) => {
		console.log(" value has changed : ", dataValue.value.toString());

    	async function timeout(time) {
		return new Promise((resolve) => setTimeout(resolve, time));
	}
	let running = true;
	while (!running) {
		await timeout(10000);

		console.log("now terminating subscription");
		await subscription.terminate();
		await stopSession(session);
	}
	});
}
