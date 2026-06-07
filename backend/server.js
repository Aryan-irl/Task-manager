import express from 'express';
import cors from 'cors';
import taskRoutes from './routes/taskRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for all domains (or configure specific clients if needed)
app.use(cors());

// Parse incoming JSON requests
app.use(express.json());

// Logger middleware for requests (optional, but good for debugging)
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// API Routes
app.use('/api/tasks', taskRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Task Manager API is running smoothly' });
});

// Catch-all route for unhandled endpoints
app.use((req, res, next) => {
  res.status(404).json({
    error: 'Not Found',
    message: `Endpoint ${req.method} ${req.url} does not exist.`
  });
});

// Centralized error handling
app.use(errorHandler);

// Start the server
app.listen(PORT, () => {
  console.log(`[Server]: Personal Task Manager Backend listening on port ${PORT}`);
  console.log(`[Server]: Environment is ${process.env.NODE_ENV || 'development'}`);
});
