const express = require('express');
const router = express.Router();
const Reservation = require('../models/Reservation'); // Assuming a Reservation model


router.post('/', async (req, res) => {
    const reservation = new Reservation({
        gatewayId: req.body.gatewayId,
        userId: req.body.userId,
        timeSlot: req.body.timeSlot,
    });
    try {
        const newReservation = await reservation.save();
        res.status(201).json(newReservation);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const reservations = await Reservation.find();
        res.json(reservations);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
