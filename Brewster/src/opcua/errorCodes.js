export class CustomError extends Error {
	constructor(message) {
		super(message);
		this.name = this.constructor.name;
		this.statusCode = 400;
	}

	toJson() {
		return { statusCode: this.statusCode, message: this.message, name: this.name };
	}
}

export class MachineNotReadyError extends CustomError {
	constructor(state) {
		let message = "Machine is in state" + state + " and not ready for production, please reset the machine to state 4 ";
		super(message);
	}
}

export class NoSessionToMachineError extends CustomError {
	constructor() {
		let message = "Failed to connect to the machine, make sure server is running";
		super(message);
	}
}

export class MachineNotAbleToResetError extends CustomError {
	constructor() {
		let message = "Beer Machine is not in a state it can reset from";
		super(message);
	}
}

export class MachineNotFinishedProductionError extends CustomError {
	constructor() {
		let message = "Beer Machine is still producing beers, please stop production first";
		super(message);
	}
}

export class NoProductionOngoingToStopError extends CustomError {
	constructor() {
		let message = "Beer Machine is not producing anything at this time and cannot be stopped";
		super(message);
	}
}

export class NoVariablesFromProduction extends CustomError {
	constructor() {
		let message = "Beer Machine has not produced anything";
		super(message);
	}
}
