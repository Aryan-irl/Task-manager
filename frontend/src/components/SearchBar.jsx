import React from 'react';
import { Search, X } from 'lucide-react';

export const SearchBar = ({ value, onChange }) => {
  const handleClear = () => {
    onChange('');
  };

  return (
    <div className="relative w-full">
      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
        <Search size={18} />
      </div>
      <input
        id="task-search-input"
        type="text"
        placeholder="Search tasks by title..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full pl-11 pr-10 py-3 bg-white border border-stone-200 rounded-xl text-stone-900 placeholder-stone-400 focus:border-clay-500 focus:ring-4 focus:ring-clay-500/10 transition-all duration-200 shadow-sm"
      />
      {value && (
        <button
          onClick={handleClear}
          type="button"
          aria-label="Clear search"
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-stone-400 hover:text-stone-600 transition-colors"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
