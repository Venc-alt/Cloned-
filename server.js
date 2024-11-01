const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const gatewayRoutes = require('./routes/gatewayRoutes');
const reservationRoutes = require('./routes/reservationRoutes');

const app = express();

// Enable CORS with specific frontend origin
app.use(cors({
    origin: 'https://available-gateways-frontend-51573bdecab0.herokuapp.com',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/gateways', gatewayRoutes);
app.use('/api/reservations', reservationRoutes);

connectDB();

app.listen(process.env.PORT || 5000, () => {
    console.log(`Server is running on port ${process.env.PORT || 5000}`);
});
