const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
    gatewayId: { type: mongoose.Schema.Types.ObjectId, ref: 'Gateway', required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    startTime: { type: String, required: true }, // Separate start time
    endTime: { type: String, required: true }    // Separate end time
});

module.exports = mongoose.model('Reservation', reservationSchema);
