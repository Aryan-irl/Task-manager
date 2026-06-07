import React from 'react';
import { ClipboardList, SearchX, Sparkles } from 'lucide-react';

export const EmptyState = ({ type = 'no-tasks', onAction, actionLabel }) => {
  const configs = {
    'no-tasks': {
      icon: <ClipboardList size={48} className="text-clay-500" />,
      title: 'No tasks yet',
      description: 'Capture your thoughts, plan projects, and stay organized. Start by creating your very first task.',
      buttonClass: 'bg-clay-500 hover:bg-clay-600 shadow-clay-500/10 text-white',
    },
    'no-search-results': {
      icon: <SearchX size={48} className="text-amber-600" />,
      title: 'No matches found',
      description: "We couldn't find any tasks matching your current search query. Try typing something else or clear the search.",
      buttonClass: 'bg-stone-100 hover:bg-stone-200 text-stone-700 border border-stone-200',
    },
    'no-filter-results': {
      icon: <Sparkles size={48} className="text-emerald-600" />,
      title: 'All caught up!',
      description: 'There are no tasks matching your selected filter. Sit back, relax, or add a new task to get going.',
      buttonClass: 'bg-stone-100 hover:bg-stone-200 text-stone-700 border border-stone-200',
    },
  };

  const currentConfig = configs[type] || configs['no-tasks'];

  return (
    <div className="glass-card rounded-2xl border border-stone-200 p-8 sm:p-12 text-center flex flex-col items-center justify-center max-w-lg mx-auto mb-8 animate-fade-in shadow-sm">
      {/* Icon Wrapper */}
      <div className="h-20 w-20 rounded-2xl bg-stone-50 border border-stone-200/60 flex items-center justify-center mb-6 shadow-inner">
        {currentConfig.icon}
      </div>

      {/* Header */}
      <h3 className="text-xl font-bold text-stone-900 mb-2 tracking-tight">
        {currentConfig.title}
      </h3>

      {/* Description */}
      <p className="text-stone-500 text-sm leading-relaxed mb-6">
        {currentConfig.description}
      </p>

      {/* Action Button */}
      {onAction && actionLabel && (
        <button
          onClick={onAction}
          type="button"
          className={`px-5 py-2.5 rounded-xl text-xs font-semibold shadow-md transition-all duration-200 active:scale-95 ${currentConfig.buttonClass}`}
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
};

export default EmptyState;
