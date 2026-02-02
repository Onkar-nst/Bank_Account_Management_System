import express, { Application, Request, Response } from 'express';
import dotenv from 'dotenv';
import accountRoutes from './routes/accountRoutes';

// Load environment variables
dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/accounts', accountRoutes);

// Health check route
app.get('/', (_req: Request, res: Response) => {
    res.json({
        message: 'Bank Account Management System API',
        version: '1.0.0',
        endpoints: {
            accounts: '/api/accounts'
        }
    });
});

// 404 handler
app.use((_req: Request, res: Response) => {
    res.status(404).json({
        success: false,
        message: 'Route not found'
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
    console.log(`📊 API Documentation: http://localhost:${PORT}/`);
});

export default app;
