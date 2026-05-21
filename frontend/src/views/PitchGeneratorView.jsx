import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function PitchGeneratorView({ consultants }) {
  const location = useLocation();
  const [selectedId, setSelectedId] = useState('');
  const [jd, setJd] = useState('');
  const [loading, setLoading] = useState(false);
  const [pitch, setPitch] = useState(null);
  const [error, setError] = useState('');

  // Handle route state redirection pre-selection
  useEffect(() => {
    if (location.state && location.state.consultantId) {
      setSelectedId(String(location.state.consultantId));
    } else if (consultants.length > 0 && !selectedId) {
      setSelectedId(String(consultants[0].id));
    }
  }, [location.state, consultants]);

  const handleGenerate = async (e) => {
    e.preventDefault();
    if (!selectedId || !jd.trim()) {
      setError('Please select a consultant and paste a job description.');
      return;
    }

    setLoading(true);
    setError('');
    setPitch(null);

    try {
      const response = await fetch('/api/pitches/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          consultantId: Number(selectedId),
          jobDescription: jd
        })
      });

      if (!response.ok) {
        throw new Error('Failed to generate pitch');
      }

      const data = await response.json();
      setPitch(data);
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const activeConsultant = consultants.find(c => String(c.id) === selectedId);

  return (
    <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
      {/* Input Panel */}
      <div className="xl:col-span-2 glass-card p-6 rounded-xl border border-outline-variant flex flex-col space-y-4">
        <h3 className="font-headline-md text-headline-md font-bold text-primary flex items-center gap-2 border-b border-outline-variant pb-4">
          <span className="material-symbols-outlined text-tertiary">auto_awesome</span>
          AI Pitch Criteria
        </h3>

        <form onSubmit={handleGenerate} className="space-y-4 flex-1 flex flex-col justify-between">
          <div className="space-y-4">
            <div>
              <label className="block font-label-md text-label-md font-medium text-on-surface-variant mb-1">
                Select Consultant
              </label>
              <select
                value={selectedId}
                onChange={(e) => setSelectedId(e.target.value)}
                className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-3 py-2.5 font-body-md text-body-md text-on-surface focus:outline-none focus:border-secondary"
              >
                <option value="">-- Choose Consultant --</option>
                {consultants.map(c => (
                  <option key={c.id} value={c.id}>
                    {c.name} ({c.title}) - {c.benchStatus}
                  </option>
                ))}
              </select>
            </div>

            {activeConsultant && (
              <div className="p-3 bg-surface-container-low rounded-lg border border-outline-variant/60">
                <p className="font-label-md text-label-md font-bold text-on-surface-variant uppercase font-semibold">Consultant Profile</p>
                <p className="font-body-md text-body-md font-semibold text-primary mt-1">{activeConsultant.name}</p>
                <p className="font-body-sm text-body-sm text-on-surface-variant">{activeConsultant.title} • {activeConsultant.yoe} Years Exp</p>
                <p className="font-label-md text-label-md text-secondary mt-1 font-semibold">Skills: {activeConsultant.skills}</p>
              </div>
            )}

            <div className="flex-1 flex flex-col">
              <label className="block font-label-md text-label-md font-medium text-on-surface-variant mb-1">
                Paste Job Description
              </label>
              <textarea
                value={jd}
                onChange={(e) => setJd(e.target.value)}
                placeholder="Paste the target client's job requirements or mission description here to custom match the consultant..."
                rows="8"
                required
                className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-3 py-2 font-body-md text-body-md text-on-surface focus:outline-none focus:border-secondary flex-1 resize-none"
              ></textarea>
            </div>
          </div>

          <div className="pt-4 border-t border-outline-variant/50">
            {error && (
              <p className="text-error text-body-sm mb-3 font-medium">{error}</p>
            )}
            <button
              type="submit"
              disabled={loading || !selectedId || !jd.trim()}
              className="w-full py-3 bg-tertiary text-white font-bold font-label-md text-label-md rounded-lg flex items-center justify-center gap-2 hover:opacity-90 transition-opacity cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span>Generating Pitch...</span>
              ) : (
                <>
                  <span className="material-symbols-outlined">auto_awesome</span>
                  Reframe & Match CV
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Output Panel */}
      <div className="xl:col-span-3 glass-card p-6 rounded-xl border border-outline-variant flex flex-col relative overflow-hidden min-h-[500px]">
        {loading ? (
          <div className="flex-1 flex flex-col items-center justify-center space-y-3">
            <span className="material-symbols-outlined text-[48px] text-tertiary animate-spin">sync</span>
            <p className="font-body-md text-body-md text-on-surface-variant font-semibold">AI is analyzing profile alignments...</p>
          </div>
        ) : pitch ? (
          <div className="space-y-6 flex-1 flex flex-col animate-in fade-in duration-300">
            {/* Header with Match Score */}
            <div className="flex items-center justify-between border-b border-outline-variant pb-4">
              <div>
                <h3 className="font-headline-md text-headline-md font-bold text-primary flex items-center gap-2">
                  <span className="material-symbols-outlined text-success">verified</span>
                  Reframed Pitch Proposal
                </h3>
                <p className="font-label-md text-label-md text-on-surface-variant mt-0.5 font-semibold">Matched for {activeConsultant?.name}</p>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="font-label-md text-[10px] text-on-surface-variant uppercase font-bold leading-none">Match Score</p>
                  <p className="font-headline-xl text-2xl font-black text-success leading-tight">{pitch.matchScore}%</p>
                </div>
                <div className="w-12 h-12 rounded-full border-4 border-success/20 border-t-success flex items-center justify-center font-bold text-success text-sm">
                  {pitch.matchScore}
                </div>
              </div>
            </div>

            {/* Executive Summary */}
            <div className="space-y-2">
              <h4 className="font-label-md text-label-md text-on-surface-variant uppercase font-bold flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px] text-tertiary">notes</span>
                Executive Summary
              </h4>
              <p className="font-body-md text-body-md text-primary leading-relaxed bg-surface-container-low p-4 rounded-lg border border-outline-variant/50">
                {pitch.executiveSummary}
              </p>
            </div>

            {/* Alignments */}
            <div className="space-y-3 flex-1">
              <h4 className="font-label-md text-label-md text-on-surface-variant uppercase font-bold flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px] text-tertiary">check_circle</span>
                Key Role Alignments
              </h4>
              <div className="space-y-3 overflow-y-auto max-h-[300px] pr-1">
                {pitch.keyAlignments.map((align, idx) => (
                  <div key={idx} className="p-3 bg-surface-container-low border border-outline-variant/40 rounded-lg space-y-1">
                    <h5 className="font-body-md text-body-md font-bold text-primary flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 bg-secondary rounded-full"></span>
                      {align.requirement}
                    </h5>
                    <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed pl-3">
                      {align.explanation}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-4 border-t border-outline-variant/50 flex gap-3">
              <button 
                onClick={() => {
                  navigator.clipboard.writeText(
                    `Executive Summary:\n${pitch.executiveSummary}\n\nKey Alignments:\n` +
                    pitch.keyAlignments.map(a => `- ${a.requirement}: ${a.explanation}`).join('\n')
                  );
                  alert('Proposal copied to clipboard!');
                }}
                className="flex-1 py-2.5 border border-outline rounded-lg font-semibold font-label-md text-label-md text-on-surface hover:bg-surface-container-low transition-colors cursor-pointer flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-[18px]">content_copy</span>
                Copy Pitch
              </button>
              <button 
                onClick={() => window.print()}
                className="flex-1 py-2.5 bg-secondary text-on-secondary rounded-lg font-semibold font-label-md text-label-md hover:opacity-90 transition-opacity cursor-pointer flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-[18px]">print</span>
                Print/Save PDF
              </button>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center text-on-surface-variant p-6">
            <span className="material-symbols-outlined text-[64px] text-tertiary/20 mb-3 animate-pulse">auto_awesome</span>
            <h4 className="font-headline-sm text-headline-sm font-bold text-primary">Awaiting Generation</h4>
            <p className="font-body-md text-body-md mt-1 max-w-sm">
              Select a consultant and paste a target job description on the left, then click "Reframe & Match CV" to compile the custom pitch.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
