import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { v4 as uuidv4 } from 'uuid';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_FILE_PATH = path.resolve(__dirname, '../data/tasks.json');

/**
 * Helper to read tasks from tasks.json
 */
const readTasksFromFile = async () => {
  try {
    const data = await fs.readFile(DATA_FILE_PATH, 'utf8');
    if (!data.trim()) return [];
    return JSON.parse(data);
  } catch (error) {
    // If file doesn't exist, create it with empty array
    if (error.code === 'ENOENT') {
      await fs.writeFile(DATA_FILE_PATH, JSON.stringify([]));
      return [];
    }
    throw error;
  }
};

/**
 * Helper to write tasks to tasks.json
 */
const writeTasksToFile = async (tasks) => {
  await fs.writeFile(DATA_FILE_PATH, JSON.stringify(tasks, null, 2), 'utf8');
};

/**
 * GET /api/tasks
 * Retrieve tasks sorted by newest first with optional search and status filtering
 */
export const getTasks = async (req, res, next) => {
  try {
    const { search, status } = req.query;
    let tasks = await readTasksFromFile();

    // 1. Sort by newest first (createdAt descending)
    tasks.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    // 2. Filter by search query (title substring match, case-insensitive)
    if (search) {
      const searchLower = search.toLowerCase();
      tasks = tasks.filter(task => task.title.toLowerCase().includes(searchLower));
    }

    // 3. Filter by completion status
    if (status === 'completed') {
      tasks = tasks.filter(task => task.completed === true);
    } else if (status === 'active') {
      tasks = tasks.filter(task => task.completed === false);
    }

    res.json(tasks);
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/tasks/:id
 * Retrieve a single task by ID
 */
export const getTaskById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const tasks = await readTasksFromFile();
    const task = tasks.find(t => t.id === id);

    if (!task) {
      return res.status(404).json({
        error: 'Not Found',
        message: `Task with ID ${id} not found.`
      });
    }

    res.json(task);
  } catch (error) {
    next(error);
  }
};

/**
 * POST /api/tasks
 * Create a new task
 */
export const createTask = async (req, res, next) => {
  try {
    const { title, description, dueDate } = req.body;
    const tasks = await readTasksFromFile();

    const newTask = {
      id: uuidv4(),
      title: title.trim(),
      description: description ? description.trim() : '',
      dueDate: dueDate || null,
      completed: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    tasks.push(newTask);
    await writeTasksToFile(tasks);

    res.status(201).json(newTask);
  } catch (error) {
    next(error);
  }
};

/**
 * PUT /api/tasks/:id
 * Update an existing task (allows partial edits or toggles)
 */
export const updateTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, description, dueDate, completed } = req.body;
    const tasks = await readTasksFromFile();
    
    const taskIndex = tasks.findIndex(t => t.id === id);
    if (taskIndex === -1) {
      return res.status(404).json({
        error: 'Not Found',
        message: `Task with ID ${id} not found.`
      });
    }

    const task = tasks[taskIndex];

    // Build the updated task object
    const updatedTask = {
      ...task,
      title: title !== undefined ? title.trim() : task.title,
      description: description !== undefined ? description.trim() : task.description,
      dueDate: dueDate !== undefined ? (dueDate || null) : task.dueDate,
      completed: completed !== undefined ? completed : task.completed,
      updatedAt: new Date().toISOString()
    };

    tasks[taskIndex] = updatedTask;
    await writeTasksToFile(tasks);

    res.json(updatedTask);
  } catch (error) {
    next(error);
  }
};

/**
 * DELETE /api/tasks/:id
 * Delete a task
 */
export const deleteTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const tasks = await readTasksFromFile();

    const taskIndex = tasks.findIndex(t => t.id === id);
    if (taskIndex === -1) {
      return res.status(404).json({
        error: 'Not Found',
        message: `Task with ID ${id} not found.`
      });
    }

    // Remove task
    const [deletedTask] = tasks.splice(taskIndex, 1);
    await writeTasksToFile(tasks);

    res.json({
      message: `Task with ID ${id} deleted successfully.`,
      task: deletedTask
    });
  } catch (error) {
    next(error);
  }
};
