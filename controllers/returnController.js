const Return = require('../models/Return');

// Function to get all returns
exports.getReturns = async (req, res) => {
    try {
        const returns = await Return.find();
        res.status(200).json(returns);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Function to create a new return
exports.createReturn = async (req, res) => {
    try {
        const newReturn = new Return(req.body); // Create a new instance using the request body data
        await newReturn.save(); // Save the new return to the database
        res.status(201).json(newReturn); // Respond with the newly created return
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Function to update a single return's status
exports.updateReturnStatus = async (req, res) => {
    const { returnId } = req.params;
    const { status } = req.body;

    try {
        const updatedReturn = await Return.findByIdAndUpdate(
            returnId,
            { status },
            { new: true }
        );

        if (!updatedReturn) {
            return res.status(404).json({ message: 'Return not found' });
        }

        res.status(200).json(updatedReturn);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Function to update status for multiple returns
exports.updateMultipleReturnStatuses = async (req, res) => {
    const { returnIds, status } = req.body; // Expect an array of IDs and a status

    try {
        const updatedReturns = await Return.updateMany(
            { _id: { $in: returnIds } }, // Filter for IDs in the array
            { $set: { status } }, // Update status for all matching documents
            { multi: true } // Ensure multiple documents can be updated
        );

        if (updatedReturns.modifiedCount === 0) {
            return res.status(404).json({ message: 'No matching returns found' });
        }

        res.status(200).json({ message: 'Returns updated successfully', updatedCount: updatedReturns.modifiedCount });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
