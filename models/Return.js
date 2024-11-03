const mongoose = require('mongoose');

const returnSchema = new mongoose.Schema({
    name: { type: String, required: true },
    status: { type: String, enum: ['available', 'in use'], default: 'available' }
});

module.exports = mongoose.model('Return', returnSchema);