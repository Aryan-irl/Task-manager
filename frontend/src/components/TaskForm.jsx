import React, { useState, useEffect } from 'react';
import { X, Calendar, Edit3, PlusCircle } from 'lucide-react';

export const TaskForm = ({ isOpen, onClose, onSubmit, initialData = null }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [errors, setErrors] = useState({});

  // Sync state with initialData when editing
  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || '');
      setDescription(initialData.description || '');
      // Format due date to YYYY-MM-DD for date input
      if (initialData.dueDate) {
        setDueDate(initialData.dueDate.substring(0, 10));
      } else {
        setDueDate('');
      }
    } else {
      // Clear form when adding a new task
      setTitle('');
      setDescription('');
      setDueDate('');
    }
    setErrors({});
  }, [initialData, isOpen]);

  // Prevent scrolling on the body behind the modal
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const validate = () => {
    const newErrors = {};
    if (!title.trim()) {
      newErrors.title = 'Title is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    onSubmit({
      title: title.trim(),
      description: description.trim(),
      dueDate: dueDate || null,
    });
  };

  const isEditing = !!initialData;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay backdrop */}
      <div 
        className="fixed inset-0 bg-stone-900/60 backdrop-blur-sm transition-opacity duration-300 animate-fade-in" 
        onClick={onClose}
      />

      {/* Modal Dialog Content */}
      <div className="relative glass-card bg-white border border-stone-200 rounded-3xl max-w-lg w-full p-6 sm:p-8 overflow-hidden shadow-2xl shadow-stone-300/30 z-10 animate-scale-in">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-stone-400 hover:text-stone-700 transition-colors"
          type="button"
        >
          <X size={18} />
        </button>

        {/* Form Title */}
        <div className="flex items-center gap-3 mb-6 pb-3 border-b border-stone-100">
          <div className="h-9 w-9 rounded-xl bg-clay-500/10 text-clay-600 flex items-center justify-center border border-clay-500/10">
            {isEditing ? <Edit3 size={18} /> : <PlusCircle size={18} />}
          </div>
          <h3 className="text-lg font-bold text-stone-900">
            {isEditing ? 'Edit Task Details' : 'Create New Task'}
          </h3>
        </div>

        {/* Form Fields */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Title Field */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="task-title-input" className="text-xs font-bold text-stone-500 uppercase tracking-wider">
              Title <span className="text-clay-500">*</span>
            </label>
            <input
              id="task-title-input"
              type="text"
              placeholder="e.g., Read Research Papers"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (errors.title) setErrors((prev) => ({ ...prev, title: null }));
              }}
              className={`w-full ${errors.title ? 'border-red-400/80 focus:border-red-500 focus:ring-red-500/10' : ''}`}
            />
            {errors.title && (
              <span className="text-xs text-red-500 font-medium ml-1">
                {errors.title}
              </span>
            )}
          </div>

          {/* Description Field */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="task-desc-input" className="text-xs font-bold text-stone-500 uppercase tracking-wider">
              Description
            </label>
            <textarea
              id="task-desc-input"
              placeholder="e.g., Review the introduction section and notes on key findings..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="w-full resize-none bg-stone-50 border border-stone-200 text-stone-900 rounded-xl px-4 py-3 outline-none transition-all duration-200 focus:border-clay-500 focus:ring-4 focus:ring-clay-500/10 placeholder-stone-400"
            />
          </div>

          {/* Due Date Field */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="task-date-input" className="text-xs font-bold text-stone-500 uppercase tracking-wider flex items-center gap-1.5">
              <Calendar size={14} className="text-stone-400" />
              Due Date
            </label>
            <input
              id="task-date-input"
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 mt-8 pt-4 border-t border-stone-100">
            <button
              onClick={onClose}
              type="button"
              className="px-4 py-2.5 text-xs font-semibold text-stone-500 hover:text-stone-800 bg-stone-100/60 hover:bg-stone-200/50 border border-stone-200 rounded-xl transition-all duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 text-xs font-semibold text-white bg-clay-500 hover:bg-clay-600 rounded-xl hover:shadow-lg hover:shadow-clay-500/10 active:scale-95 transition-all duration-200"
            >
              {isEditing ? 'Save Changes' : 'Create Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;
