const Reservation = require('../models/Reservation');
const Gateway = require('../models/Gateway');

// Function to create a new reservation
exports.createReservation = async (req, res) => {
  // existing code for creating a reservation
};

// Function to get all reservations
exports.getReservations = async (req, res) => {
  // existing code for fetching reservations
};

// Function to cancel a reservation
exports.cancelReservation = async (req, res) => {
  try {
    // Find and delete the reservation
    const reservation = await Reservation.findByIdAndDelete(req.params.id);
    if (!reservation) {
      return res.status(404).json({ message: 'Reservation not found' });
    }

    // Update the gateway status to "available"
    await Gateway.findByIdAndUpdate(reservation.gatewayId, { status: 'available' });

    res.status(200).json({ message: 'Reservation cancelled and gateway status updated' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
