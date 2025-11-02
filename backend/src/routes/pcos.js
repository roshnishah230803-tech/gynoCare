/**
 * PCOS routes
 */
const express = require('express');
const router = express.Router();
const pcosController = require('../controllers/pcosController');
const { authenticateToken } = require('../middleware/auth');
const { validate, schemas } = require('../middleware/validate');

// All routes require authentication
router.use(authenticateToken);

router.post('/', validate(schemas.pcos), pcosController.predictPCOS);
router.get('/', pcosController.getHistory);

module.exports = router;