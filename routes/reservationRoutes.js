const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservationController');

// Route to create a new reservation
router.post('/', reservationController.createReservation);

// Route to get all reservations (optionally filter by userId via query parameter)
router.get('/', reservationController.getReservations);

module.exports = router;
