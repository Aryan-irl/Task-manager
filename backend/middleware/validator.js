/**
 * Middleware to validate task creation and updates
 */
export const validateTask = (req, res, next) => {
  const { title, description, dueDate, completed } = req.body;

  // Title validation (Required, must be non-empty string)
  if (req.method === 'POST' || (req.method === 'PUT' && title !== undefined)) {
    if (!title || typeof title !== 'string' || title.trim() === '') {
      return res.status(400).json({
        error: 'Validation Error',
        message: 'Task title is required and cannot be empty.'
      });
    }
  }

  // Due Date validation (Optional, but must be a valid date if provided)
  if (dueDate !== undefined && dueDate !== null && dueDate !== '') {
    const timestamp = Date.parse(dueDate);
    if (isNaN(timestamp)) {
      return res.status(400).json({
        error: 'Validation Error',
        message: 'Due date must be a valid date string (e.g., YYYY-MM-DD).'
      });
    }
  }

  // Completed validation (Optional, must be boolean if provided)
  if (completed !== undefined) {
    if (typeof completed !== 'boolean') {
      return res.status(400).json({
        error: 'Validation Error',
        message: 'Completed status must be a boolean value.'
      });
    }
  }

  next();
};
