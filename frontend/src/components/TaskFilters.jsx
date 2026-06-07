import React from 'react';

export const TaskFilters = ({ currentFilter, onFilterChange, stats }) => {
  const filters = [
    { id: 'all', label: 'All', count: stats.total },
    { id: 'active', label: 'Active', count: stats.active },
    { id: 'completed', label: 'Completed', count: stats.completed },
  ];

  return (
    <div className="flex bg-stone-100 p-1.5 rounded-xl border border-stone-200 w-full sm:w-auto shadow-inner">
      {filters.map((filter) => {
        const isActive = currentFilter === filter.id;
        return (
          <button
            key={filter.id}
            onClick={() => onFilterChange(filter.id)}
            type="button"
            className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all duration-200 ${
              isActive
                ? 'bg-clay-500 text-white shadow-md shadow-clay-500/10'
                : 'text-stone-500 hover:text-stone-800 hover:bg-stone-200/40'
            }`}
          >
            {filter.label}
            <span
              className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                isActive
                  ? 'bg-white/20 text-white'
                  : 'bg-stone-200 text-stone-600'
              }`}
            >
              {filter.count}
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default TaskFilters;
