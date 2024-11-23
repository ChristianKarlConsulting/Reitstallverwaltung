import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { router as authRouter } from './routes/auth.js';
import { router as userRouter } from './routes/users.js';
import { router as horseRouter } from './routes/horses.js';
import { router as bookingRouter } from './routes/bookings.js';
import { router as facilityRouter } from './routes/facilities.js';
import { router as healthRouter } from './routes/health.js';
import { router as documentRouter } from './routes/documents.js';
import { router as serviceRouter } from './routes/services.js';
import { router as paymentRouter } from './routes/payments.js';
import { errorHandler } from './middleware/errorHandler.js';
import { authenticateToken } from './middleware/auth.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Public routes
app.use('/api/auth', authRouter);

// Protected routes
app.use('/api/users', authenticateToken, userRouter);
app.use('/api/horses', authenticateToken, horseRouter);
app.use('/api/bookings', authenticateToken, bookingRouter);
app.use('/api/facilities', authenticateToken, facilityRouter);
app.use('/api/health', authenticateToken, healthRouter);
app.use('/api/documents', authenticateToken, documentRouter);
app.use('/api/services', authenticateToken, serviceRouter);
app.use('/api/payments', authenticateToken, paymentRouter);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});