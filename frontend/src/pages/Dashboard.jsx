import React, { useState } from 'react';
import { useTasks } from '../hooks/useTasks';
import TaskStats from '../components/TaskStats';
import SearchBar from '../components/SearchBar';
import TaskFilters from '../components/TaskFilters';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';
import ConfirmationModal from '../components/ConfirmationModal';
import { Plus, CheckSquare, RefreshCw, XCircle } from 'lucide-react';

export const Dashboard = () => {
  const {
    tasks,
    allTasksCount,
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
    refreshTasks,
  } = useTasks();

  // Modals state
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [activeEditTask, setActiveEditTask] = useState(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [activeDeleteId, setActiveDeleteId] = useState(null);

  // Form triggers
  const handleOpenAddForm = () => {
    setActiveEditTask(null);
    setIsFormOpen(true);
  };

  const handleOpenEditForm = (task) => {
    setActiveEditTask(task);
    setIsFormOpen(true);
  };

  const handleFormSubmit = async (formData) => {
    let result;
    if (activeEditTask) {
      result = await updateTask(activeEditTask.id, formData);
    } else {
      result = await addTask(formData);
    }

    if (result.success) {
      setIsFormOpen(false);
      setActiveEditTask(null);
    }
  };

  // Delete triggers
  const handleOpenDeleteConfirm = (id) => {
    setActiveDeleteId(id);
    setIsDeleteOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (activeDeleteId) {
      const result = await deleteTask(activeDeleteId);
      if (result.success) {
        setIsDeleteOpen(false);
        setActiveDeleteId(null);
      }
    }
  };

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      {/* API Error Banner */}
      {error && (
        <div className="mb-6 p-4 rounded-xl bg-orange-50 border border-orange-200 text-orange-850 flex items-center justify-between animate-fade-in shadow-sm">
          <div className="flex items-center gap-3">
            <XCircle size={18} className="text-orange-600 shrink-0" />
            <p className="text-sm font-medium">{error}</p>
          </div>
          <button
            onClick={clearError}
            className="text-xs font-bold text-orange-600 hover:text-orange-850 uppercase tracking-wider pl-4"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Page Header */}
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          <div className="h-11 w-11 rounded-2xl bg-clay-500 text-white flex items-center justify-center shadow-lg shadow-clay-500/20">
            <CheckSquare size={24} className="stroke-[2.5]" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-stone-900 tracking-tight">
              TaskFlow
            </h1>
            <p className="text-xs text-stone-500">
              Personal Task Management Dashboard
            </p>
          </div>
        </div>

        {/* Header Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={refreshTasks}
            disabled={loading}
            aria-label="Refresh tasks list"
            type="button"
            className="p-3 bg-white hover:bg-stone-50 text-stone-500 hover:text-stone-700 border border-stone-200 rounded-xl transition-all active:scale-95 disabled:opacity-50 shadow-sm"
          >
            <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
          </button>
          <button
            id="add-task-btn"
            onClick={handleOpenAddForm}
            type="button"
            className="glow-button flex items-center justify-center gap-2 px-5 py-3 bg-clay-500 hover:bg-clay-600 text-white rounded-xl text-xs font-bold tracking-wide transition-all"
          >
            <Plus size={16} className="stroke-[3]" />
            <span>Create Task</span>
          </button>
        </div>
      </header>

      {/* Statistics Cards */}
      <TaskStats stats={stats} />

      {/* Search & Filter Controls */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8 items-center justify-between">
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
        <TaskFilters
          currentFilter={statusFilter}
          onFilterChange={setStatusFilter}
          stats={stats}
        />
      </div>

      {/* Task List / Content Panel */}
      <main>
        {loading && tasks.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-stone-500 gap-3">
            <RefreshCw size={32} className="animate-spin text-clay-500" />
            <p className="text-sm font-medium">Loading your tasks...</p>
          </div>
        ) : (
          <TaskList
            tasks={tasks}
            allTasksCount={allTasksCount}
            searchQuery={searchQuery}
            statusFilter={statusFilter}
            onToggle={toggleTaskCompletion}
            onEdit={handleOpenEditForm}
            onDelete={handleOpenDeleteConfirm}
            onClearSearch={() => setSearchQuery('')}
            onClearFilter={() => setStatusFilter('all')}
            onAddTaskClick={handleOpenAddForm}
          />
        )}
      </main>

      {/* Add / Edit Task Modal Form */}
      <TaskForm
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setActiveEditTask(null);
        }}
        onSubmit={handleFormSubmit}
        initialData={activeEditTask}
      />

      {/* Delete Task Confirmation Dialog */}
      <ConfirmationModal
        isOpen={isDeleteOpen}
        onClose={() => {
          setIsDeleteOpen(false);
          setActiveDeleteId(null);
        }}
        onConfirm={handleDeleteConfirm}
        title="Delete Task"
        message="Are you sure you want to delete this task? This action will permanently remove it from your records."
      />

      {/* Footer copyright */}
      <footer className="mt-20 border-t border-stone-200/60 pt-6 text-center">
        <p className="text-xs text-stone-400">
          &copy; {new Date().getFullYear()} TaskFlow. Designed with precision & elegance.
        </p>
      </footer>
    </div>
  );
};

export default Dashboard;
