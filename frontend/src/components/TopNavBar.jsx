import React from 'react';

export default function TopNavBar({ title, onSearchChange, searchValue }) {
  return (
    <header className="h-[70px] border-b border-outline-variant bg-surface-container-lowest flex items-center justify-between px-container-padding sticky top-0 z-40">
      <div className="flex items-center gap-4">
        <h2 className="font-headline-lg text-headline-lg font-bold text-primary">{title}</h2>
      </div>

      <div className="flex items-center gap-6">
        {/* Search Bar */}
        {onSearchChange !== undefined && (
          <div className="relative w-[320px] hidden sm:block">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]">
              search
            </span>
            <input
              type="text"
              placeholder="Search consultants, skills..."
              value={searchValue}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full bg-surface-container-low border border-outline-variant rounded-full pl-10 pr-4 py-2 font-body-md text-body-md text-on-surface focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-all"
            />
          </div>
        )}

        {/* Action icons */}
        <div className="flex items-center gap-3">
          <button className="p-2 hover:bg-surface-container-low rounded-full relative transition-colors cursor-pointer text-on-surface-variant">
            <span className="material-symbols-outlined text-[24px]">notifications</span>
            <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-error rounded-full ring-2 ring-surface-container-lowest"></span>
          </button>
          <button className="p-2 hover:bg-surface-container-low rounded-full transition-colors cursor-pointer text-on-surface-variant">
            <span className="material-symbols-outlined text-[24px]">settings</span>
          </button>
        </div>

        {/* User profile */}
        <div className="flex items-center gap-3 pl-4 border-l border-outline-variant">
          <div className="text-right hidden md:block">
            <p className="font-body-md text-body-md font-semibold text-primary">Operations Manager</p>
            <p className="font-label-md text-label-md text-on-surface-variant">Admin</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center font-bold font-body-md">
            OP
          </div>
        </div>
      </div>
    </header>
  );
}
