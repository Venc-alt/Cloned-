
// const Reservation = require('../models/Reservation');
// const Gateway = require('../models/Gateway');

// // Function to get all reservations
// exports.getReservations = async (_req, res) => {
//     try {
//         const reservations = await Reservation.find()
//             .populate('gatewayId', 'name status')
//             .populate('userId', 'name email');
//         res.status(200).json(reservations);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

// // Function to create a new reservation
// exports.createReservation = async (req, res) => {
//     const { gatewayId, userId, date, startTime, endTime } = req.body;

//     try {
//         // Check if the gateway is already reserved for the requested date and time slot
//         const existingReservation = await Reservation.findOne({
//             gatewayId,
//             date, // Only check for conflicts on the same date
//             $or: [
//                 { startTime: { $lt: endTime, $gte: startTime } }, // Conflict if it overlaps with an existing reservation
//                 { endTime: { $gt: startTime, $lte: endTime } }
//             ]
//         });

//         if (existingReservation) {
//             return res.status(400).json({ message: 'This gateway is already reserved for the selected date and time slot' });
//         }

//         // Create a new reservation with date, startTime, and endTime fields
//         const reservation = new Reservation({ gatewayId, userId, date, startTime, endTime });
//         await reservation.save();

//         // Update the gateway status to "in use"
//         await Gateway.findByIdAndUpdate(gatewayId, { status: 'in use' });

//         res.status(201).json({ message: 'Reservation created successfully', reservation });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

// // Function to cancel a reservation
// exports.cancelReservation = async (req, res) => {
//     try {
//         const reservation = await Reservation.findByIdAndDelete(req.params.id);
//         if (!reservation) {
//             return res.status(404).json({ message: 'Reservation not found' });
//         }
//         await Gateway.findByIdAndUpdate(reservation.gatewayId, { status: 'available' });
//         res.status(200).json({ message: 'Reservation cancelled and gateway status updated' });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };



const Reservation = require('../models/Reservation');
const Gateway = require('../models/Gateway');
const Return = require('../models/Return'); // Add this import for handling Returns

// Function to get all reservations
exports.getReservations = async (_req, res) => {
    try {
        const reservations = await Reservation.find()
            .populate('gatewayId', 'name status')
            .populate('userId', 'name email')
            .populate('returnIds', 'name status'); // Populate return details
        res.status(200).json(reservations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Function to create a new reservation
exports.createReservation = async (req, res) => {
    const { gatewayId, userId, date, startTime, endTime, returnIds } = req.body;

    try {
        // Check if the gateway is already reserved for the requested date and time slot
        const existingReservation = await Reservation.findOne({
            gatewayId,
            date,
            $or: [
                { startTime: { $lt: endTime, $gte: startTime } },
                { endTime: { $gt: startTime, $lte: endTime } }
            ]
        });

        if (existingReservation) {
            return res.status(400).json({ message: 'This gateway is already reserved for the selected date and time slot' });
        }

        // Create a new reservation including returnIds
        const reservation = new Reservation({ gatewayId, userId, date, startTime, endTime, returnIds });
        await reservation.save();

        // Update the gateway status to "in use"
        await Gateway.findByIdAndUpdate(gatewayId, { status: 'in use' });

        // Update the status of the selected Returns to "in use"
        if (returnIds && returnIds.length > 0) {
            await Return.updateMany({ _id: { $in: returnIds } }, { status: 'in use' });
        }

        res.status(201).json({ message: 'Reservation created successfully', reservation });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Function to cancel a reservation
exports.cancelReservation = async (req, res) => {
    try {
        const reservation = await Reservation.findByIdAndDelete(req.params.id);
        if (!reservation) {
            return res.status(404).json({ message: 'Reservation not found' });
        }

        // Update the gateway status to "available"
        await Gateway.findByIdAndUpdate(reservation.gatewayId, { status: 'available' });

        // Update the status of associated Returns to "available"
        if (reservation.returnIds && reservation.returnIds.length > 0) {
            await Return.updateMany({ _id: { $in: reservation.returnIds } }, { status: 'available' });
        }

        res.status(200).json({ message: 'Reservation cancelled and statuses updated' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
