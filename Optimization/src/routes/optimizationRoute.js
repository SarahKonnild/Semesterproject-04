const router = require('express').Router();
const optimization = require('../controllers/optimizationController');
const verify = require('../middleware/verifyToken');

/**
 * @author Sarah Manon Pradel
 *
 * The POST method to calculate the error speed
 * See under "Public/production.html" to see it in action
 *
 * The route "/calculateErrorSpeed" defines the path
 * See "controllers/optimizationController.js" under "calculateErrorSpeed" for a further description
 */
router.post(
  '/calculateErrorSpeed',
  /*verify,*/ optimization.calculateErrorSpeed
);

/**
 * @author Sarah Manon Pradel
 *
 * The POST method to calculate the error margin
 * See under "Public/production.html" to see it in action
 *
 * The route "/calculateErrorMargin" defines the path
 * See "controllers/optimizationController.js" under "calculateErrorMargin" for a further description
 */
router.post(
  '/calculateErrorMargin',
  /*verify,*/ optimization.calculateErrorMargin
);

/**
 * @author Sarah Manon Pradel
 *
 * The POST method to calculate the valid margin
 * See under "Public/production.html" to see it in action
 *
 * The route "/calculateValidMargin" defines the path
 * See "controllers/optimizationController.js" under "calculateValidMargin" for a further description
 */
router.post(
  '/calculateValidMargin',
  /*verify,*/ optimization.calculateValidMargin
);

/**
 * @author Sarah Manon Pradel
 *
 * The POST method to calculate the valid speed
 * See under "Public/production.html" to see it in action
 *
 * The route "/calculateValidSpeed" defines the path
 * See "controllers/optimizationController.js" under "calculateValidSpeed" for a further description
 */
router.post(
  '/calculateValidSpeed',
  /*verify,*/ optimization.calculateValidSpeed
);

/**
 * @author Sarah Manon Pradel
 *
 * The POST method to calculate the error percentage of total batch size
 * See under "Public/production.html" to see it in action
 *
 * The route "/calculatePercentageBeers" defines the path
 * See "controllers/optimizationController.js" under "calculatePercentageBeers" for a further description
 */
router.post(
  '/calculatePercentageBeers',
  //   verify,
  optimization.calculatePercentageBeers
);

/**
 * @author Sarah Manon Pradel
 *
 * The POST method to calculate the amount of errors based on percentage of batch size
 * See under "Public/production.html" to see it in action
 *
 * The route "/calculateAmountOfBeers" defines the path
 * See "controllers/optimizationController.js" under "calculateAmountOfBeers" for a further description
 */
router.post(
  '/calculateAmountOfBeers',
  //   verify,
  optimization.calculateAmountOfBeers
);

/**
 * @author Sarah Manon Pradel
 *
 * The POST method to calculate the estimated production time
 * See under "Public/production.html" to see it in action
 *
 * The route "/calculateEstimatedProductionTime" defines the path
 * See "controllers/optimizationController.js" under "calculateEstimatedProductionTime" for a further description
 */
router.post(
  '/calculateEstimatedProductionTime',
  //   verify,
  optimization.calculateEstimatedProductionTime
);

/**
 * @author Sarah Manon Pradel
 *
 * The POST method to calculate the optimal speed using errors
 * See under "Public/production.html" to see it in action
 *
 * The route "/calculateOptimalSpeedUsingErrors" defines the path
 * See "controllers/optimizationController.js" under "calculateOptimalSpeedUsingErrors" for a further description
 */
router.post(
  '/calculateOptimalSpeedUsingErrors',
  //   verify,
  optimization.calculateOptimalSpeedUsingErrors
);

/**
 * @author Sarah Manon Pradel
 *
 * The POST method to calculate the optimal speed using valids
 * See under "Public/production.html" to see it in action
 *
 * The route "/calculateOptimalSpeedUsingValids" defines the path
 * See "controllers/optimizationController.js" under "calculateOptimalSpeedUsingValids" for a further description
 */
router.post(
  '/calculateOptimalSpeedUsingValids',
  //   verify,
  optimization.calculateOptimalSpeedUsingValids
);

module.exports = router;
