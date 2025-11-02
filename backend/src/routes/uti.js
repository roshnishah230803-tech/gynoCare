/**
 * UTI routes
 */
const express = require('express');
const router = express.Router();
const utiController = require('../controllers/utiController');
const { authenticateToken } = require('../middleware/auth');
const { validate, schemas } = require('../middleware/validate');

// All routes require authentication
router.use(authenticateToken);

router.post('/', validate(schemas.uti), utiController.submitSymptoms);
router.get('/', utiController.getHistory);

module.exports = router;