import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import authRoutes from './routes/authRoutes.js';
import trainRoutes from './routes/trainRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';
import { connectDB } from './config/database.js';

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(cors({ origin: '*', credentials: true })); // CORS config
app.use(morgan('dev'));

// Database Connection
const startServer = async () => {
  try {
    await connectDB();
    
    // Routes
    app.use('/api/auth', authRoutes);
    app.use('/api/trains', trainRoutes);
    app.use('/api/bookings', bookingRoutes);

    // Start Server
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  } catch (error) {
    console.error('❌ Failed to start server:', error.message);
    process.exit(1);
  }
};

startServer(); // Start the server properly
