import React, { useEffect } from 'react';
import { AlertTriangle, X } from 'lucide-react';

export const ConfirmationModal = ({ isOpen, onClose, onConfirm, title, message }) => {
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay backdrop */}
      <div 
        className="fixed inset-0 bg-stone-900/60 backdrop-blur-sm transition-opacity duration-300 animate-fade-in" 
        onClick={onClose}
      />
      
      {/* Modal Dialog Content */}
      <div className="relative glass-card bg-white border border-stone-200 rounded-3xl max-w-md w-full p-6 sm:p-7 overflow-hidden shadow-2xl shadow-stone-300/30 z-10 animate-scale-in">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-stone-400 hover:text-stone-700 transition-colors"
          type="button"
        >
          <X size={18} />
        </button>

        {/* Warning Icon & Header */}
        <div className="flex items-start gap-4 mt-2">
          <div className="h-10 w-10 rounded-xl bg-clay-500/10 text-clay-600 flex items-center justify-center border border-clay-500/10 shrink-0">
            <AlertTriangle size={20} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-stone-900 mb-2">
              {title || 'Delete Confirmation'}
            </h3>
            <p className="text-sm text-stone-500 leading-relaxed">
              {message || 'Are you sure you want to proceed? This action cannot be undone.'}
            </p>
          </div>
        </div>

        {/* Modal Action Buttons */}
        <div className="flex items-center justify-end gap-3 mt-6 pt-4 border-t border-stone-100">
          <button
            onClick={onClose}
            type="button"
            className="px-4 py-2.5 text-xs font-semibold text-stone-500 hover:text-stone-800 bg-stone-100/60 hover:bg-stone-200/50 border border-stone-200 rounded-xl transition-all duration-200"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            type="button"
            className="px-4 py-2.5 text-xs font-semibold text-white bg-clay-600 hover:bg-clay-700 rounded-xl hover:shadow-lg hover:shadow-clay-600/10 active:scale-95 transition-all duration-200"
          >
            Delete Task
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
