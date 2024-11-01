// Function to create a new reservation
exports.createReservation = async (req, res) => {
    const { gatewayId, userId, startTime, endTime } = req.body;
  
    try {
      // Check if the gateway is already reserved for the requested time slot
      const existingReservation = await Reservation.findOne({
        gatewayId,
        $or: [
          { startTime: { $lt: endTime, $gte: startTime } }, // Conflict with existing reservations
          { endTime: { $gt: startTime, $lte: endTime } }
        ]
      });
  
      if (existingReservation) {
        return res.status(400).json({ message: 'This gateway is already reserved for the selected time slot' });
      }
  
      // Create a new reservation
      const reservation = new Reservation({ gatewayId, userId, startTime, endTime });
      await reservation.save();
  
      // Update the gateway status to "in use"
      await Gateway.findByIdAndUpdate(gatewayId, { status: 'in use' });
  
      res.status(201).json({ message: 'Reservation created successfully', reservation });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  