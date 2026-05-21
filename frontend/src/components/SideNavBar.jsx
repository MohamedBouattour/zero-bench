import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function SideNavBar({ onAddConsultantClick }) {
  const location = useLocation();
  const currentPath = location.pathname;

  const menuItems = [
    { path: '/', label: 'Dashboard', icon: 'dashboard' },
    { path: '/heatmap', label: 'Skills Heatmap', icon: 'query_stats' },
    { path: '/pipeline', label: 'Placement Pipeline', icon: 'view_kanban' },
    { path: '/pitch', label: 'AI Pitch Generator', icon: 'auto_awesome' },
  ];

  return (
    <nav className="hidden md:flex bg-surface-container-lowest w-[240px] h-screen fixed left-0 top-0 border-r border-outline-variant flex-col py-container-padding z-50">
      <div className="px-gutter mb-8">
        <h1 className="font-headline-xl text-headline-xl font-bold text-primary flex items-center gap-2">
          <span className="material-symbols-outlined text-[32px] icon-fill text-secondary">domain</span>
          BenchZero
        </h1>
        <p className="font-label-md text-label-md text-on-surface-variant mt-1 uppercase">ESN Management</p>
      </div>

      <div className="flex-1 px-3">
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const isActive = currentPath === item.path || 
                             (item.path === '/' && currentPath === '/dashboard');
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 font-body-md text-body-md ${
                    isActive
                      ? 'text-secondary font-bold border-r-2 border-secondary bg-surface-container-low scale-[0.98]'
                      : 'text-on-surface-variant hover:bg-surface-container-low'
                  }`}
                >
                  <span className={`material-symbols-outlined text-[20px] ${isActive ? 'icon-fill' : ''}`}>
                    {item.icon}
                  </span>
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="px-container-padding mt-auto mb-6">
        <button 
          onClick={onAddConsultantClick}
          className="w-full bg-secondary text-on-secondary font-label-md text-label-md py-2.5 rounded-lg flex items-center justify-center gap-2 hover:opacity-90 transition-opacity cursor-pointer"
        >
          <span className="material-symbols-outlined text-[18px]">add</span>
          Add Consultant
        </button>
      </div>

      <div className="px-3 border-t border-outline-variant pt-4">
        <ul className="space-y-1">
          <li>
            <a className="flex items-center gap-3 px-3 py-2 rounded-lg text-on-surface-variant hover:bg-surface-container-low transition-colors font-body-md text-body-md" href="#">
              <span className="material-symbols-outlined text-[20px]">help</span>
              Support
            </a>
          </li>
          <li>
            <a className="flex items-center gap-3 px-3 py-2 rounded-lg text-on-surface-variant hover:bg-surface-container-low transition-colors font-body-md text-body-md" href="#">
              <span className="material-symbols-outlined text-[20px]">logout</span>
              Sign Out
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
