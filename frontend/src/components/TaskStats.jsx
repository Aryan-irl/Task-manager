import React from 'react';
import { ClipboardList, AlertCircle, CheckCircle } from 'lucide-react';

export const TaskStats = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
      {/* Total Tasks Card */}
      <div className="glass-card rounded-2xl p-5 flex items-center justify-between border-slate-800/40 relative overflow-hidden group">
        <div className="absolute -right-6 -bottom-6 text-stone-100 group-hover:scale-110 transition-transform duration-300">
          <ClipboardList size={100} />
        </div>
        <div className="relative z-10">
          <p className="text-xs font-semibold text-stone-500 uppercase tracking-wider mb-1">
            Total Tasks
          </p>
          <h3 className="text-3xl font-extrabold text-stone-900 tracking-tight">
            {stats.total}
          </h3>
        </div>
        <div className="h-12 w-12 rounded-xl bg-clay-500/10 text-clay-600 flex items-center justify-center relative z-10 border border-clay-500/20">
          <ClipboardList size={22} />
        </div>
      </div>

      {/* Active Tasks Card */}
      <div className="glass-card rounded-2xl p-5 flex items-center justify-between border-slate-800/40 relative overflow-hidden group">
        <div className="absolute -right-6 -bottom-6 text-stone-100 group-hover:scale-110 transition-transform duration-300">
          <AlertCircle size={100} />
        </div>
        <div className="relative z-10">
          <p className="text-xs font-semibold text-stone-500 uppercase tracking-wider mb-1">
            Active Tasks
          </p>
          <h3 className="text-3xl font-extrabold text-amber-600 tracking-tight">
            {stats.active}
          </h3>
        </div>
        <div className="h-12 w-12 rounded-xl bg-amber-500/10 text-amber-700 flex items-center justify-center relative z-10 border border-amber-500/20">
          <AlertCircle size={22} />
        </div>
      </div>

      {/* Completed Tasks Card */}
      <div className="glass-card rounded-2xl p-5 flex items-center justify-between border-slate-800/40 relative overflow-hidden group">
        <div className="absolute -right-6 -bottom-6 text-stone-100 group-hover:scale-110 transition-transform duration-300">
          <CheckCircle size={100} />
        </div>
        <div className="relative z-10">
          <p className="text-xs font-semibold text-stone-500 uppercase tracking-wider mb-1">
            Completed Tasks
          </p>
          <h3 className="text-3xl font-extrabold text-emerald-700 tracking-tight">
            {stats.completed}
          </h3>
        </div>
        <div className="h-12 w-12 rounded-xl bg-emerald-500/10 text-emerald-700 flex items-center justify-center relative z-10 border border-emerald-500/20">
          <CheckCircle size={22} />
        </div>
      </div>
    </div>
  );
};

export default TaskStats;
