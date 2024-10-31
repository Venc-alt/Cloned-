const Reservation = require('../models/Reservation');
const Gateway = require('../models/Gateway');

// Function to create a new reservation
exports.createReservation = async (req, res) => {
    const { gatewayId, userId, timeSlot } = req.body;

    try {
        // Check if the gateway is already reserved at the given time slot
        const existingReservation = await Reservation.findOne({ gatewayId, timeSlot });
        if (existingReservation) {
            return res.status(400).json({ message: 'This gateway is already reserved for the selected time slot.' });
        }

        // Create a new reservation
        const newReservation = new Reservation({ gatewayId, userId, timeSlot });
        const savedReservation = await newReservation.save();

        res.status(201).json(savedReservation);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Function to get all reservations (or filter by user)
exports.getReservations = async (req, res) => {
    const { userId } = req.query; // Optional query parameter for filtering by user

    try {
        const query = userId ? { userId } : {};
        const reservations = await Reservation.find(query).populate('gatewayId', 'name'); // Populating with gateway name for convenience
        res.status(200).json(reservations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
