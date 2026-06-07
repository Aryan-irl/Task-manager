import React from 'react';
import { Calendar, Edit2, Trash2, CheckCircle, Circle, AlertCircle } from 'lucide-react';

export const TaskItem = ({ task, onToggle, onEdit, onDelete }) => {
  // Helper to format due date to a readable format
  const formatReadableDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  // Check if a task is overdue (not completed, has a due date, and due date is before today)
  const checkIfOverdue = () => {
    if (task.completed || !task.dueDate) return false;
    
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Start of today
    
    const dueDate = new Date(task.dueDate);
    dueDate.setHours(0, 0, 0, 0); // Start of due date
    
    return dueDate < today;
  };

  const isOverdue = checkIfOverdue();

  return (
    <div
      className={`glass-card glass-card-hover rounded-2xl p-5 border transition-all duration-300 relative group ${
        task.completed
          ? 'opacity-60 border-stone-200 bg-stone-50/40'
          : isOverdue
          ? 'border-clay-300 bg-clay-50/20 shadow-sm shadow-clay-100/5'
          : 'border-stone-200/80 bg-white'
      }`}
    >
      <div className="flex items-start gap-4">
        {/* Completion Toggle Button */}
        <button
          onClick={() => onToggle(task.id)}
          type="button"
          aria-label={task.completed ? "Mark task as active" : "Mark task as completed"}
          className={`mt-1.5 transition-transform duration-200 active:scale-90 shrink-0 ${
            task.completed
              ? 'text-emerald-600 hover:text-emerald-500'
              : isOverdue
              ? 'text-clay-600 hover:text-clay-500'
              : 'text-stone-400 hover:text-clay-500'
          }`}
        >
          {task.completed ? (
            <CheckCircle size={20} className="fill-emerald-500/5" />
          ) : (
            <Circle size={20} />
          )}
        </button>

        {/* Task Details Content */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1.5">
            <h4
              className={`text-base font-semibold leading-snug break-words ${
                task.completed
                  ? 'text-stone-400 line-through'
                  : isOverdue
                  ? 'text-clay-900 font-bold'
                  : 'text-stone-900'
              }`}
            >
              {task.title}
            </h4>
            
            {/* Overdue Badge */}
            {isOverdue && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-clay-100 text-clay-700 border border-clay-200/50">
                <AlertCircle size={10} />
                Overdue
              </span>
            )}
          </div>

          {/* Description */}
          {task.description && (
            <p
              className={`text-sm leading-relaxed mb-3 break-words ${
                task.completed ? 'text-stone-400 line-through' : 'text-stone-600'
              }`}
            >
              {task.description}
            </p>
          )}

          {/* Due Date Indicator */}
          {task.dueDate && (
            <div
              className={`inline-flex items-center gap-1.5 text-xs font-medium ${
                task.completed
                  ? 'text-stone-400'
                  : isOverdue
                  ? 'text-clay-700'
                  : 'text-stone-500'
              }`}
            >
              <Calendar size={13} />
              <span>Due by {formatReadableDate(task.dueDate)}</span>
            </div>
          )}
        </div>

        {/* Task Actions (Edit / Delete) */}
        <div className="flex items-center gap-1 opacity-90 sm:opacity-0 group-hover:opacity-100 transition-opacity duration-200 shrink-0 ml-2">
          {/* Edit Button */}
          <button
            onClick={() => onEdit(task)}
            type="button"
            aria-label="Edit task"
            className="p-2 text-stone-400 hover:text-stone-700 hover:bg-stone-100 rounded-lg transition-all duration-200"
          >
            <Edit2 size={16} />
          </button>
          
          {/* Delete Button */}
          <button
            onClick={() => onDelete(task.id)}
            type="button"
            aria-label="Delete task"
            className="p-2 text-stone-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
