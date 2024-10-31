const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
    gatewayId: { type: mongoose.Schema.Types.ObjectId, ref: 'Gateway', required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    timeSlot: { type: String, required: true } // Format as needed, e.g., '10:00 AM - 11:00 AM'
});

module.exports = mongoose.model('Reservation', reservationSchema);
