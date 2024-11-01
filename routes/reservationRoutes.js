const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservationController');

// Route to create a new reservation
router.post('/', reservationController.createReservation);

// Route to get all reservations
router.get('/', reservationController.getReservations);  // Ensure getReservations exists

// Route to cancel a reservation
router.delete('/:id', reservationController.cancelReservation);

module.exports = router;
