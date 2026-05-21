import React from 'react';

export default function PipelineView({ pipelineItems, loading, onUpdateItemStatus }) {
  const columns = [
    { id: 'ENDING_SOON', label: 'Ending Soon', status: 'ENDING_SOON' },
    { id: 'CV_SENT', label: 'CV Sent', status: 'CV_SENT' },
    { id: 'INTERVIEW_SCHEDULED', label: 'Interview Scheduled', status: 'INTERVIEW_SCHEDULED' },
    { id: 'NEGOTIATION', label: 'Negotiation', status: 'NEGOTIATION' }
  ];

  const handleDragStart = (e, id) => {
    e.dataTransfer.setData('text/plain', id);
  };

  const handleDrop = (e, status) => {
    e.preventDefault();
    const id = e.dataTransfer.getData('text/plain');
    if (id) {
      onUpdateItemStatus(Number(id), status);
    }
  };

  const getVelocityColor = (v) => {
    switch (v?.toLowerCase()) {
      case 'high': return 'bg-success/10 text-success';
      case 'med': return 'bg-tertiary/10 text-tertiary';
      default: return 'bg-on-surface-variant/10 text-on-surface-variant';
    }
  };

  const getMatchScoreColor = (score) => {
    if (score >= 90) return 'text-success bg-success/10 border border-success/20';
    if (score >= 80) return 'text-secondary bg-secondary/10 border border-secondary/20';
    return 'text-tertiary bg-tertiary/10 border border-tertiary/20';
  };

  return (
    <div className="space-y-6 overflow-x-auto">
      {loading ? (
        <div className="py-12 text-center text-on-surface-variant">Loading pipeline...</div>
      ) : (
        <div className="flex gap-6 pb-6 min-w-[1280px]">
          {columns.map(col => {
            const items = pipelineItems.filter(item => item.status === col.status);
            const totalRevenue = items.reduce((sum, item) => sum + (item.potentialRevenue || 0), 0);

            return (
              <div 
                key={col.id} 
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => handleDrop(e, col.status)}
                className="flex-1 bg-surface-container-low border border-outline-variant/60 rounded-xl p-4 min-w-[280px] max-w-[340px] flex flex-col min-h-[550px]"
              >
                {/* Column Header */}
                <div className="flex items-center justify-between mb-4 border-b border-outline-variant/50 pb-2">
                  <div>
                    <h4 className="font-headline-sm text-headline-sm font-bold text-primary flex items-center gap-1.5">
                      {col.label}
                      <span className="text-xs bg-surface-container-highest px-2 py-0.5 rounded-full text-on-surface-variant font-medium">
                        {items.length}
                      </span>
                    </h4>
                    <p className="font-label-md text-label-md text-on-surface-variant mt-0.5 font-semibold">
                      {totalRevenue > 0 ? `${totalRevenue.toLocaleString()} EUR` : '0 EUR'}
                    </p>
                  </div>
                </div>

                {/* Column Cards */}
                <div className="space-y-3 flex-1 overflow-y-auto">
                  {items.map(item => (
                    <div 
                      key={item.id}
                      draggable
                      onDragStart={(e) => handleDragStart(e, item.id)}
                      className={`p-4 rounded-lg bg-surface-container-lowest border hover:shadow-md transition-all duration-200 cursor-grab active:cursor-grabbing relative overflow-hidden ${
                        item.aiSuggested 
                          ? 'border-tertiary shadow-sm shadow-tertiary/10 ai-glow' 
                          : 'border-outline-variant'
                      }`}
                    >
                      {item.aiSuggested && (
                        <div className="absolute top-0 right-0 bg-tertiary text-white text-[9px] font-bold px-2 py-0.5 rounded-bl flex items-center gap-0.5 uppercase tracking-wider">
                          <span className="material-symbols-outlined text-[10px]">auto_awesome</span>
                          AI Match
                        </div>
                      )}

                      <div className="space-y-2.5">
                        <div className="flex justify-between items-start">
                          <div>
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${getVelocityColor(item.velocity)}`}>
                              {item.velocity} Velocity
                            </span>
                          </div>
                          {item.matchScore && (
                            <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${getMatchScoreColor(item.matchScore)}`}>
                              {item.matchScore}% Match
                            </span>
                          )}
                        </div>

                        <div>
                          <h5 className="font-body-md text-body-md font-bold text-primary leading-tight">{item.clientName}</h5>
                          <p className="font-label-md text-label-md text-on-surface-variant">{item.missionTitle}</p>
                        </div>

                        {/* Consultant badge */}
                        <div className="flex items-center gap-2 bg-surface-container-low p-2 rounded-md border border-outline-variant/30">
                          {item.avatarUrl ? (
                            <img src={item.avatarUrl} alt={item.consultantName} className="w-7 h-7 rounded-full object-cover" />
                          ) : (
                            <div className="w-7 h-7 rounded-full bg-surface-container-highest flex items-center justify-center font-bold text-[11px]">
                              {item.consultantName?.charAt(0)}
                            </div>
                          )}
                          <div className="truncate">
                            <p className="font-label-md text-label-md font-semibold text-primary leading-tight">{item.consultantName}</p>
                            <p className="font-body-sm text-[10px] text-on-surface-variant leading-none">{item.consultantTitle}</p>
                          </div>
                        </div>

                        <div className="flex justify-between items-center text-label-md text-label-md font-label-md text-on-surface-variant pt-1 border-t border-outline-variant/30">
                          <span className="flex items-center gap-0.5 text-[11px] text-on-surface-variant">
                            <span className="material-symbols-outlined text-[14px]">calendar_today</span>
                            {item.info}
                          </span>
                          <span className="font-semibold text-primary text-xs">
                            {item.dailyRate ? `${item.dailyRate}€/d` : '-'}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}

                  {items.length === 0 && (
                    <div className="py-8 text-center text-on-surface-variant/40 border border-dashed border-outline-variant/50 rounded-lg">
                      <span className="material-symbols-outlined text-[36px] opacity-25">drag_indicator</span>
                      <p className="text-[11px] font-medium mt-1 font-body-md">Drag cards here</p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
