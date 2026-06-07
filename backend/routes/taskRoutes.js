import { Router } from 'express';
import {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask
} from '../controllers/taskController.js';
import { validateTask } from '../middleware/validator.js';

const router = Router();

// Retrieve tasks (supports queries: ?search=xxx&status=active|completed)
router.get('/', getTasks);

// Retrieve single task
router.get('/:id', getTaskById);

// Create task (validated)
router.post('/', validateTask, createTask);

// Update task (validated)
router.put('/:id', validateTask, updateTask);

// Delete task
router.delete('/:id', deleteTask);

export default router;
