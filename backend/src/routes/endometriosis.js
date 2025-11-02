/**
 * Endometriosis routes
 */
const express = require('express');
const router = express.Router();
const endometriosisController = require('../controllers/endometriosisController');
const { authenticateToken } = require('../middleware/auth');
const { validate, schemas } = require('../middleware/validate');

// All routes require authentication
router.use(authenticateToken);

router.post('/', validate(schemas.endometriosis), endometriosisController.submitSymptoms);
router.get('/', endometriosisController.getHistory);

module.exports = router;