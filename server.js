const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes'); // Import user routes
const gatewayRoutes = require('./routes/gatewayRoutes');
const reservationRoutes = require('./routes/reservationRoutes');

const app = express(); // Initialize Express

// Enable CORS for all routes
app.use(cors());

// Middleware to parse JSON request bodies
app.use(express.json());

// Routes
app.use('/api/users', userRoutes); // Maps user routes to /api/users
app.use('/api/gateways', gatewayRoutes);
app.use('/api/reservations', reservationRoutes);

// Connect to MongoDB
connectDB();

// Start the server
app.listen(process.env.PORT || 5000, () => {
  console.log(`Server is running on port ${process.env.PORT || 5000}`);
});
