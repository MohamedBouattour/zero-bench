import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import SideNavBar from './components/SideNavBar';
import TopNavBar from './components/TopNavBar';
import AddConsultantModal from './components/AddConsultantModal';
import DashboardView from './views/DashboardView';
import HeatmapView from './views/HeatmapView';
import PipelineView from './views/PipelineView';
import PitchGeneratorView from './views/PitchGeneratorView';
import './App.css';

function AppContent() {
  const location = useLocation();
  const [consultants, setConsultants] = useState([]);
  const [pipelineItems, setPipelineItems] = useState([]);
  const [loadingConsultants, setLoadingConsultants] = useState(true);
  const [loadingPipeline, setLoadingPipeline] = useState(true);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch initial data
  const fetchConsultants = async () => {
    try {
      const res = await fetch('/api/consultants');
      if (res.ok) {
        const data = await res.json();
        setConsultants(data);
      }
    } catch (err) {
      console.error("Error fetching consultants", err);
    } finally {
      setLoadingConsultants(false);
    }
  };

  const fetchPipelineItems = async () => {
    try {
      const res = await fetch('/api/pipelines');
      if (res.ok) {
        const data = await res.json();
        setPipelineItems(data);
      }
    } catch (err) {
      console.error("Error fetching pipeline items", err);
    } finally {
      setLoadingPipeline(false);
    }
  };

  useEffect(() => {
    fetchConsultants();
    fetchPipelineItems();
  }, []);

  const handleConsultantAdded = (newConsultant) => {
    setConsultants((prev) => [...prev, newConsultant]);
    // Refresh pipeline items since database might seed new items or change statuses
    fetchPipelineItems();
  };

  const handleUpdateItemStatus = async (id, status) => {
    try {
      const res = await fetch(`/api/pipelines/${id}/status?status=${status}`, {
        method: 'PUT'
      });
      if (res.ok) {
        const updatedItem = await res.json();
        setPipelineItems((prev) => 
          prev.map(item => item.id === id ? updatedItem : item)
        );
      }
    } catch (err) {
      console.error("Error updating pipeline item status", err);
    }
  };

  // Determine Title based on Route
  const getActiveTitle = () => {
    switch (location.pathname) {
      case '/':
      case '/dashboard':
        return 'Bench Risk Dashboard';
      case '/heatmap':
        return 'Skills Gap Heatmap';
      case '/pipeline':
        return 'Placement Pipeline';
      case '/pitch':
        return 'AI Pitch Generator';
      default:
        return 'BenchZero Suite';
    }
  };

  // Filter consultants based on search query
  const filteredConsultants = consultants.filter(c => {
    const query = searchQuery.toLowerCase();
    return (
      c.name.toLowerCase().includes(query) ||
      c.title.toLowerCase().includes(query) ||
      c.skills.toLowerCase().includes(query)
    );
  });

  return (
    <div className="min-h-screen bg-background text-on-background font-body-md flex">
      {/* Sidebar Nav */}
      <SideNavBar onAddConsultantClick={() => setAddModalOpen(true)} />
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col md:pl-[240px] min-h-screen">
        <TopNavBar 
          title={getActiveTitle()} 
          onSearchChange={location.pathname === '/heatmap' || location.pathname === '/dashboard' ? setSearchQuery : undefined}
          searchValue={searchQuery}
        />
        
        <main className="flex-1 p-container-padding overflow-y-auto max-w-[1600px] w-full mx-auto">
          <Routes>
            <Route path="/" element={<Navigate replace to="/dashboard" />} />
            <Route 
              path="/dashboard" 
              element={
                <DashboardView 
                  consultants={filteredConsultants} 
                  loading={loadingConsultants} 
                />
              } 
            />
            <Route 
              path="/heatmap" 
              element={
                <HeatmapView 
                  consultants={filteredConsultants} 
                  loading={loadingConsultants} 
                />
              } 
            />
            <Route 
              path="/pipeline" 
              element={
                <PipelineView 
                  pipelineItems={pipelineItems} 
                  loading={loadingPipeline} 
                  onUpdateItemStatus={handleUpdateItemStatus}
                />
              } 
            />
            <Route 
              path="/pitch" 
              element={
                <PitchGeneratorView 
                  consultants={consultants} 
                />
              } 
            />
          </Routes>
        </main>
      </div>

      {/* Add Consultant Modal */}
      <AddConsultantModal 
        isOpen={addModalOpen} 
        onClose={() => setAddModalOpen(false)} 
        onConsultantAdded={handleConsultantAdded} 
      />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
