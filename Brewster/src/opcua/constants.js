export const stateNodeID = "ns=6;s=::Program:Cube.Command.CntrlCmd";
export const producedNodeID = "ns=6;s=::Program:Cube.Status.StateCurrent";
export const producedProcessedNodeID = "ns=6;s=::Program:Cube.Admin.ProdProcessedCount";
export const maintenanceStatusNodeID = "ns=6;s=::Program:Maintenance.Counter";
export const currentStateNodeID = "ns=6;s=::Program:Cube.Status.StateCurrent";
export const requestChangeCommandNodeID = "ns=6;s=::Program:Cube.Command.CmdChangeRequest";
export const beerTypeNodeID = "ns=6;s=::Program:Cube.Command.Parameter[1].Value";
export const productionSpeedNodeID = "ns=6;s=::Program:Cube.Command.MachSpeed";
export const batchSizeNodeID = "ns=6;s=::Program:Cube.Command.Parameter[2].Value";
export const batchNumberNodeID = "ns=6;s=::Program:Cube.Command.Parameter[0].Value";
export const defectiveProductsNodeId = "ns=6;s=::Program:Maintenance.State";
export const acceptableProductsNodeId = "ns=6;s=::Program:Maintenance.State";
export const getBatchNumberNodeID = "ns=6;s=::Program:Cube.Status.Parameter[0].Value";
export const getCurrentProductionSpeedNodeID = "ns=6;s=::Program:Cube.Status.MachSpeed";
export const getBeerTypeNodeID = "ns=6;s=::Program:Cube.Admin.Parameter[0].Value";
export const getBatchSizeNodeID = "ns=6;s=::Program:Cube.Status.Parameter[1].Value";
export const stopProductionCommand = 3;
export const resetProductionCommand = 1;
export const startProductionCommand = 2;
//The URL for the simulation machine
export const simulationEndpointURL = "opc.tcp://127.0.0.1:4840"
//The URL for the Physical Machine
export const physicalEndpointURL = "opc.tcp://192.168.0.122:4840"