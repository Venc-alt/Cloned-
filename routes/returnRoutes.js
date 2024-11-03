const express = require('express');
const router = express.Router();
const returnController = require('../controllers/returnController');

// Route to get all returns
router.get('/', returnController.getReturns);

// Route to create a new return
router.post('/', returnController.createReturn); // Add this line for creating a return

// Route to update a single return's status
router.put('/:returnId/status', returnController.updateReturnStatus);

// Route to update multiple returns' statuses
router.put('/bulk/update-status', returnController.updateMultipleReturnStatuses);

module.exports = router;
