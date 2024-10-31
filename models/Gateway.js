const mongoose = require('mongoose');

const gatewaySchema = new mongoose.Schema({
    name: { type: String, required: true },
    status: { type: String, default: 'available' } // e.g., 'available', 'in use'
});

module.exports = mongoose.model('Gateway', gatewaySchema);
