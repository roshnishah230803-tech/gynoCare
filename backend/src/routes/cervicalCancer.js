/**
 * Cervical Cancer routes
 */
const express = require('express');
const router = express.Router();
const cervicalCancerController = require('../controllers/cervicalCancerController');
const { authenticateToken } = require('../middleware/auth');
const { validate, schemas } = require('../middleware/validate');

// All routes require authentication
router.use(authenticateToken);

router.post('/', validate(schemas.cervicalCancer), cervicalCancerController.predictCervicalCancer);
router.get('/', cervicalCancerController.getHistory);

module.exports = router;