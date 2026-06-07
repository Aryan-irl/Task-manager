import { useState, useEffect, useCallback, useMemo } from 'react';
import { taskService } from '../services/api';

export const useTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all'); // 'all', 'active', 'completed'

  // Fetch all tasks from backend
  const fetchTasks = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await taskService.getTasks();
      setTasks(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch tasks.');
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch tasks on initial mount
  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  // Create a new task
  const addTask = async (taskData) => {
    setError(null);
    try {
      const newTask = await taskService.createTask(taskData);
      setTasks((prevTasks) => [newTask, ...prevTasks]); // Prepend since newest first
      return { success: true };
    } catch (err) {
      setError(err.message || 'Failed to create task.');
      return { success: false, error: err };
    }
  };

  // Update a task (edit title, description, due date)
  const updateTask = async (id, updatedFields) => {
    setError(null);
    try {
      const updatedTask = await taskService.updateTask(id, updatedFields);
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task.id === id ? updatedTask : task))
      );
      return { success: true };
    } catch (err) {
      setError(err.message || 'Failed to update task.');
      return { success: false, error: err };
    }
  };

  // Toggle completion status of a task
  const toggleTaskCompletion = async (id) => {
    setError(null);
    const taskToToggle = tasks.find((t) => t.id === id);
    if (!taskToToggle) return;

    try {
      // Optimistically update local state for fast UI response
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === id ? { ...task, completed: !task.completed } : task
        )
      );

      const updatedTask = await taskService.updateTask(id, {
        completed: !taskToToggle.completed,
      });

      // Synchronize state with backend response
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task.id === id ? updatedTask : task))
      );
    } catch (err) {
      // Revert optimistic update on failure
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task.id === id ? taskToToggle : task))
      );
      setError(err.message || 'Failed to toggle task completion.');
    }
  };

  // Delete a task
  const deleteTask = async (id) => {
    setError(null);
    try {
      await taskService.deleteTask(id);
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
      return { success: true };
    } catch (err) {
      setError(err.message || 'Failed to delete task.');
      return { success: false, error: err };
    }
  };

  // Calculate statistics based on the full list of tasks (before filters)
  const stats = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter((t) => t.completed).length;
    const active = total - completed;
    return { total, active, completed };
  }, [tasks]);

  // Compute filtered & searched tasks list locally
  const filteredTasks = useMemo(() => {
    let result = [...tasks];

    // Apply Search filter (title substring match, case-insensitive)
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase().trim();
      result = result.filter((task) =>
        task.title.toLowerCase().includes(query)
      );
    }

    // Apply Status filter
    if (statusFilter === 'completed') {
      result = result.filter((task) => task.completed);
    } else if (statusFilter === 'active') {
      result = result.filter((task) => !task.completed);
    }

    // Sort by newest first (should already be sorted from API, but enforces in case)
    result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    return result;
  }, [tasks, searchQuery, statusFilter]);

  // Clear error helper
  const clearError = () => setError(null);

  return {
    tasks: filteredTasks,
    allTasksCount: tasks.length,
    loading,
    error,
    clearError,
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    stats,
    addTask,
    updateTask,
    toggleTaskCompletion,
    deleteTask,
    refreshTasks: fetchTasks,
  };
};
