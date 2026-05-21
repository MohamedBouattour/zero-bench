import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function DashboardView({ consultants, loading, onOpenAddModal }) {
  const navigate = useNavigate();

  // Helper to parse days from bench status
  const parseDays = (status) => {
    if (!status) return 0;
    const match = status.match(/\d+/);
    return match ? parseInt(match[0], 10) : 0;
  };

  const getRiskColor = (level) => {
    switch (level) {
      case 'CRITICAL': return 'bg-error/10 text-error border border-error/20';
      case 'MEDIUM': return 'bg-amber-500/10 text-amber-600 border border-amber-500/20';
      default: return 'bg-secondary/10 text-secondary border border-secondary/20';
    }
  };

  const getTimelineBarColor = (level) => {
    switch (level) {
      case 'CRITICAL': return 'bg-gradient-to-r from-red-500 to-rose-600';
      case 'MEDIUM': return 'bg-gradient-to-r from-amber-500 to-yellow-600';
      default: return 'bg-gradient-to-r from-blue-500 to-indigo-600';
    }
  };

  // KPIs
  const criticalCount = consultants.filter(c => c.riskLevel === 'CRITICAL').length;
  const onBenchCount = consultants.filter(c => c.benchStatus && (c.benchStatus.toLowerCase().includes('bench') || parseDays(c.benchStatus) <= 15)).length;
  const dailyLoss = consultants
    .filter(c => c.benchStatus && (c.benchStatus.toLowerCase().includes('bench') || parseDays(c.benchStatus) <= 15))
    .reduce((sum, c) => sum + (c.dailyRate || 0), 0);

  return (
    <div className="space-y-6">
      {/* KPI Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* KPI 1 */}
        <div className="glass-card p-6 rounded-xl border border-outline-variant flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-error/10 flex items-center justify-center text-error">
            <span className="material-symbols-outlined text-[32px]">warning</span>
          </div>
          <div>
            <p className="font-label-md text-label-md text-on-surface-variant uppercase font-semibold">Critical Risks</p>
            <h3 className="font-headline-xl text-headline-xl font-bold text-primary">{criticalCount} Consultants</h3>
          </div>
        </div>

        {/* KPI 2 */}
        <div className="glass-card p-6 rounded-xl border border-outline-variant flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center text-secondary">
            <span className="material-symbols-outlined text-[32px]">group</span>
          </div>
          <div>
            <p className="font-label-md text-label-md text-on-surface-variant uppercase font-semibold">On Bench / Ending Soon</p>
            <h3 className="font-headline-xl text-headline-xl font-bold text-primary">{onBenchCount} Consultants</h3>
          </div>
        </div>

        {/* KPI 3 */}
        <div className="glass-card p-6 rounded-xl border border-outline-variant flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-tertiary/10 flex items-center justify-center text-tertiary">
            <span className="material-symbols-outlined text-[32px]">payments</span>
          </div>
          <div>
            <p className="font-label-md text-label-md text-on-surface-variant uppercase font-semibold">Est. Daily Loss</p>
            <h3 className="font-headline-xl text-headline-xl font-bold text-primary">{dailyLoss.toLocaleString()} EUR</h3>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Timeline (Gantt style) */}
        <div className="xl:col-span-2 glass-card p-6 rounded-xl border border-outline-variant flex flex-col space-y-4">
          <div className="flex items-center justify-between border-b border-outline-variant pb-4">
            <h3 className="font-headline-md text-headline-md font-bold text-primary flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary">date_range</span>
              Bench Availability Timeline
            </h3>
            <span className="text-label-md text-on-surface-variant font-label-md font-semibold">Next 60 Days</span>
          </div>

          {loading ? (
            <div className="py-12 text-center text-on-surface-variant">Loading timeline...</div>
          ) : (
            <div className="space-y-4 overflow-y-auto max-h-[450px] pr-2">
              {consultants.map((c) => {
                const days = parseDays(c.benchStatus);
                const percent = Math.min(100, Math.max(8, (days / 60) * 100));
                
                return (
                  <div key={c.id} className="grid grid-cols-1 md:grid-cols-4 items-center gap-4 border-b border-outline-variant/30 pb-3">
                    <div className="flex items-center gap-3 col-span-1">
                      {c.avatarUrl ? (
                        <img src={c.avatarUrl} alt={c.name} className="w-9 h-9 rounded-full object-cover border border-outline-variant" />
                      ) : (
                        <div className="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center font-bold text-on-surface-variant font-body-md">
                          {c.name.charAt(0)}
                        </div>
                      )}
                      <div>
                        <p className="font-body-md text-body-md font-bold text-primary leading-tight">{c.name}</p>
                        <p className="font-label-md text-label-md text-on-surface-variant leading-none">{c.title}</p>
                      </div>
                    </div>

                    <div className="col-span-3 flex items-center gap-4">
                      {/* Timeline bar */}
                      <div className="flex-1 bg-surface-container-low h-6 rounded-full relative overflow-hidden border border-outline-variant/30">
                        <div 
                          className={`h-full ${getTimelineBarColor(c.riskLevel)} rounded-full flex items-center pl-3 transition-all duration-500`}
                          style={{ width: `${percent}%` }}
                        >
                          {days > 10 && (
                            <span className="text-[10px] font-bold text-white uppercase truncate">
                              {days}d
                            </span>
                          )}
                        </div>
                      </div>
                      
                      {/* Status pill */}
                      <div className="w-[125px] text-right">
                        <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full uppercase ${getRiskColor(c.riskLevel)}`}>
                          {c.benchStatus}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* AI Recommendations */}
        <div className="glass-card p-6 rounded-xl border border-outline-variant flex flex-col space-y-4">
          <div className="flex items-center gap-2 border-b border-outline-variant pb-4">
            <span className="material-symbols-outlined text-tertiary">auto_awesome</span>
            <h3 className="font-headline-md text-headline-md font-bold text-primary">AI Placement Matcher</h3>
          </div>

          <div className="flex-1 space-y-4 overflow-y-auto max-h-[450px]">
            {consultants
              .filter(c => c.riskLevel === 'CRITICAL' && c.upskillingTarget)
              .map((c) => (
                <div key={c.id} className="p-4 rounded-lg bg-surface-container-low border border-outline-variant space-y-3 ai-glow">
                  <div className="flex items-center justify-between">
                    <span className="font-label-md text-label-md text-tertiary font-bold flex items-center gap-1">
                      <span className="material-symbols-outlined text-[16px]">school</span>
                      Upskilling Target
                    </span>
                    <span className="text-[11px] font-bold px-2 py-0.5 bg-success/10 text-success rounded-full border border-success/20">
                      {c.upskillingImpact}
                    </span>
                  </div>

                  <div>
                    <h4 className="font-body-md text-body-md font-bold text-primary">{c.name}</h4>
                    <p className="font-label-md text-label-md text-on-surface-variant mt-1">Recommended: <span className="font-semibold text-secondary">{c.upskillingTarget}</span></p>
                  </div>

                  <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                    Bridging this key skills gap increases their pipeline relevance score by matching active backend roles in negotiation.
                  </p>

                  <button
                    onClick={() => navigate('/pitch', { state: { consultantId: c.id } })}
                    className="w-full py-2 bg-tertiary text-white font-label-md text-label-md rounded-lg flex items-center justify-center gap-2 hover:opacity-90 transition-opacity cursor-pointer font-semibold"
                  >
                    <span className="material-symbols-outlined text-[16px]">auto_awesome</span>
                    Create Pitch Proposal
                  </button>
                </div>
              ))}

            {consultants.filter(c => c.riskLevel === 'CRITICAL' && c.upskillingTarget).length === 0 && (
              <div className="py-8 text-center text-on-surface-variant">
                <span className="material-symbols-outlined text-[48px] mb-2 opacity-35">celebration</span>
                <p className="font-body-md text-body-md">No upskilling suggestions needed. All high risk resources are currently matched or lack suggestions.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
