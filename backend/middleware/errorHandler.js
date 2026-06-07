/**
 * Centralized error handling middleware for Express
 */
export const errorHandler = (err, req, res, next) => {
  console.error('[Error Handler Log]:', err.stack || err.message || err);

  const statusCode = err.statusCode || 500;
  const message = err.message || 'An unexpected server error occurred';

  res.status(statusCode).json({
    error: err.name || 'Internal Server Error',
    message: message,
    // Only include stack trace in development
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
};
