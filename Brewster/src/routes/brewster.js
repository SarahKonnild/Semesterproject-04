const router = require("express").Router();
const opcua = require("../controllers/opcua.js");
const optimization = require("../controllers/optimizationController");

//OPC UA Controller
/**
 * @author Simon Quvang
 *
 * The POST method to start a production
 *
 * The route "/startProduction" defines the path for starting a production
 * See "controllers/opcuaController.js" under "startProduction" for a further description
 */
router.route("/startProduction").post(opcua.startProduction);

/**
 * @author Simon Quvang
 *
 * The GET method to stop a production
 *
 * The route "/stopProduction" defines the path for stopping a production
 * See "controllers/opcuaController.js" under "stopProduction" for a further description
 */
router.route("/stopProduction").get(opcua.stopProduction);

/**
 * @author Simon Quvang
 *
 * The GET method to reset the machine state to idle and ready for production
 *
 * The route "/resetProduction" defines the path for resetting the machine state
 * See "controllers/opcuaController.js" under "resetProduction" for a further description
 */
router.route("/resetProduction").get(opcua.resetProduction);

/**
 * @author Simon Quvang
 *
 * The GET method to access the current state of the Machine
 * See under "Public/dashboard.html" to see it in action
 *
 * The route "/machineStatus" defines the path for seeing the current state of the Machine
 * See "controllers/opcuaController.js" under "machineStatus" for a further description
 */
router.route("/machineStatus").get(opcua.getCurrentStatePublic);

/**
 * @author Simon Quvang
 *
 * The GET method to see the current Maintenance status in the machine
 * See under "Public/dashboard.html" to see it in action
 *
 * The route "/detectMaintenanceStatus" defines the path to view the current Maintenance status in the machine
 * See "controllers/opcuaController.js" under "detectMaintenanceStatus" for a further description
 */
router.route("/detectMaintenanceStatus").get(opcua.detectMaintenanceStatus);

/**
 * @author Simon Quvang
 *
 * The GET method to see if the production is finished or not
 * See under "Public/dashboard.html" to see it in action
 *
 * The route "/getProductionCount" defines the path to get the count of the produced products, if the production is done, and the machine hasnt been reset
 * See "controllers/opcuaController.js" under "getProductionCount" for a further description
 */
router.route("/getProductionCount").get(opcua.getProductionCount);

/**
 * @author Simon Quvang
 *
 * The GET method to access the machine status to get all the need values to be displayed when a production is started
 * See under "Public/dashboard.html" to see it in action
 *
 * The route "/getSubValues" defines the path for seeing the actual values for the production (same data as UaExpert)
 * See "controllers/opcuaController.js" under "getSubValues" for a further description
 */
router.route("/getSubValues").get(opcua.getSubValues);
