const express = require('express');
const router = express.Router();
const Gateway = require('../models/Gateway'); // Assuming you'll have a Gateway model


router.get('/', async (req, res) => {
    try {
        const gateways = await Gateway.find();
        res.json(gateways);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/', async (req, res) => {
    const gateway = new Gateway({
        name: req.body.name,
        status: req.body.status,
    });
    try {
        const newGateway = await gateway.save();
        res.status(201).json(newGateway);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
