
const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
    gatewayId: { type: mongoose.Schema.Types.ObjectId, ref: 'Gateway', required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    date: { type: String, required: true },        // Field for the date
    startTime: { type: String, required: true },   // Separate start time
    endTime: { type: String, required: true },     // Separate end time
    returnIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Return' }] // Array for associated "Returns"
});

module.exports = mongoose.model('Reservation', reservationSchema);