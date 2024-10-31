// gatewayController.js

const Gateway = require('../models/Gateway');

// Function to get all gateways
exports.getGateways = async (req, res) => {
    try {
        const gateways = await Gateway.find();
        res.status(200).json(gateways);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Function to add a new gateway
exports.addGateway = async (req, res) => {
    const newGateway = new Gateway(req.body);
    try {
        const savedGateway = await newGateway.save();
        res.status(201).json(savedGateway);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Add more functions for update and delete if necessary
