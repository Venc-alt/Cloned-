const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const gatewayRoutes = require('./routes/gatewayRoutes');
const reservationRoutes = require('./routes/reservationRoutes');

const app = express();

// Enable CORS for the frontend URL
const allowedOrigins = ['https://available-gateways-frontend-51573bdecab0.herokuapp.com'];
app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
}));

app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/gateways', gatewayRoutes);
app.use('/api/reservations', reservationRoutes);

connectDB();

app.listen(process.env.PORT || 5000, () => {
    console.log(`Server is running on port ${process.env.PORT || 5000}`);
});
