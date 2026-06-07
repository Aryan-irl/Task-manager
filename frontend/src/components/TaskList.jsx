import React from 'react';
import TaskItem from './TaskItem';
import EmptyState from './EmptyState';

export const TaskList = ({
  tasks,
  allTasksCount,
  searchQuery,
  statusFilter,
  onToggle,
  onEdit,
  onDelete,
  onClearSearch,
  onClearFilter,
  onAddTaskClick,
}) => {
  // 1. App has no tasks at all
  if (allTasksCount === 0) {
    return (
      <EmptyState
        type="no-tasks"
        onAction={onAddTaskClick}
        actionLabel="Create a Task"
      />
    );
  }

  // 2. Search query matches nothing
  if (tasks.length === 0 && searchQuery.trim() !== '') {
    return (
      <EmptyState
        type="no-search-results"
        onAction={onClearSearch}
        actionLabel="Clear Search"
      />
    );
  }

  // 3. Status filter matches nothing (e.g. no completed tasks yet)
  if (tasks.length === 0 && statusFilter !== 'all') {
    return (
      <EmptyState
        type="no-filter-results"
        onAction={onClearFilter}
        actionLabel="Show All Tasks"
      />
    );
  }

  // Fallback edge case (should not happen based on logic above)
  if (tasks.length === 0) {
    return (
      <EmptyState
        type="no-tasks"
        onAction={onAddTaskClick}
        actionLabel="Create a Task"
      />
    );
  }

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default TaskList;
