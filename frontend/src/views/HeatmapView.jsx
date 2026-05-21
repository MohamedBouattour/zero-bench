import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function HeatmapView({ consultants, loading }) {
  const navigate = useNavigate();
  const [selectedConsultantId, setSelectedConsultantId] = useState(null);

  const keySkills = [
    { key: 'reactProficiency', label: 'React' },
    { key: 'nodeProficiency', label: 'Node.js' },
    { key: 'devopsProficiency', label: 'DevOps' },
    { key: 'awsProficiency', label: 'AWS' },
    { key: 'symfonyProficiency', label: 'Symfony' }
  ];

  const getProficiencyClass = (level) => {
    if (level === 0 || level === null || level === undefined) return 'prof-gap';
    return `prof-${level}`;
  };

  const selectedConsultant = consultants.find(c => c.id === selectedConsultantId) || consultants[0];

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
      {/* Matrix Table */}
      <div className="xl:col-span-2 glass-card p-6 rounded-xl border border-outline-variant flex flex-col space-y-4">
        <div className="flex items-center justify-between border-b border-outline-variant pb-4">
          <h3 className="font-headline-md text-headline-md font-bold text-primary flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary">query_stats</span>
            Skills Matrix
          </h3>
          <div className="flex gap-2">
            <span className="text-label-md text-on-surface-variant flex items-center gap-1 font-label-md">
              <span className="inline-block w-3 h-3 bg-[#f8f9ff] border border-dashed border-[#c6c6cd] rounded"></span>
              Gap
            </span>
            <span className="text-label-md text-on-surface-variant flex items-center gap-1 font-label-md">
              <span className="inline-block w-3 h-3 bg-[#07006c] rounded"></span>
              L5 (Expert)
            </span>
          </div>
        </div>

        {loading ? (
          <div className="py-12 text-center text-on-surface-variant">Loading matrix...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-outline-variant text-left">
                  <th className="py-3 px-4 font-label-md text-label-md text-on-surface-variant uppercase font-semibold">Consultant</th>
                  {keySkills.map(skill => (
                    <th key={skill.key} className="py-3 px-2 text-center font-label-md text-label-md text-on-surface-variant uppercase font-semibold w-24">
                      {skill.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {consultants.map(c => {
                  const isSelected = selectedConsultant && selectedConsultant.id === c.id;
                  return (
                    <tr 
                      key={c.id} 
                      onClick={() => setSelectedConsultantId(c.id)}
                      className={`border-b border-outline-variant/30 hover:bg-surface-container-low transition-colors cursor-pointer ${
                        isSelected ? 'bg-surface-container' : ''
                      }`}
                    >
                      <td className="py-3 px-4 flex items-center gap-3">
                        {c.avatarUrl ? (
                          <img src={c.avatarUrl} alt={c.name} className="w-8 h-8 rounded-full object-cover border border-outline-variant" />
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center font-bold text-on-surface-variant font-body-md">
                            {c.name.charAt(0)}
                          </div>
                        )}
                        <div>
                          <p className="font-body-md text-body-md font-bold text-primary leading-tight">{c.name}</p>
                          <p className="font-label-md text-label-md text-on-surface-variant leading-none">{c.title}</p>
                        </div>
                      </td>

                      {keySkills.map(skill => {
                        const score = c[skill.key];
                        return (
                          <td key={skill.key} className="py-3 px-2 text-center">
                            <div className="flex justify-center items-center">
                              <span className={`w-9 h-9 rounded-lg flex items-center justify-center font-bold text-sm heatmap-cell ${getProficiencyClass(score)}`}>
                                {score > 0 ? score : '-'}
                              </span>
                            </div>
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Detail Panel */}
      <div className="glass-card p-6 rounded-xl border border-outline-variant flex flex-col space-y-4">
        <h3 className="font-headline-md text-headline-md font-bold text-primary border-b border-outline-variant pb-4">
          Upskilling Detail
        </h3>

        {selectedConsultant ? (
          <div className="space-y-6 flex-1 flex flex-col">
            <div className="flex items-center gap-4">
              {selectedConsultant.avatarUrl ? (
                <img src={selectedConsultant.avatarUrl} alt={selectedConsultant.name} className="w-14 h-14 rounded-full object-cover border-2 border-secondary" />
              ) : (
                <div className="w-14 h-14 rounded-full bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center font-bold text-xl">
                  {selectedConsultant.name.charAt(0)}
                </div>
              )}
              <div>
                <h4 className="font-headline-sm text-headline-sm font-bold text-primary">{selectedConsultant.name}</h4>
                <p className="font-body-md text-body-md text-on-surface-variant">{selectedConsultant.title}</p>
                <p className="font-label-md text-label-md text-secondary font-semibold mt-0.5">{selectedConsultant.yoe} YOE • {selectedConsultant.benchStatus}</p>
              </div>
            </div>

            <div>
              <h5 className="font-label-md text-label-md font-bold text-on-surface-variant uppercase mb-2">Core Tech Stack</h5>
              <div className="flex flex-wrap gap-1.5">
                {selectedConsultant.skills.split(',').map((skill, i) => (
                  <span key={i} className="px-2.5 py-1 bg-surface-container text-primary text-[11px] font-semibold rounded-md border border-outline-variant/50">
                    {skill.trim()}
                  </span>
                ))}
              </div>
            </div>

            {selectedConsultant.upskillingTarget ? (
              <div className="p-4 rounded-lg bg-tertiary-fixed/30 border border-tertiary/20 space-y-3 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-label-md text-label-md text-tertiary font-bold flex items-center gap-1">
                      <span className="material-symbols-outlined text-[18px]">school</span>
                      Active Target
                    </span>
                    <span className="text-[11px] font-bold px-2 py-0.5 bg-success/15 text-success rounded-full border border-success/35">
                      {selectedConsultant.upskillingImpact}
                    </span>
                  </div>
                  <h5 className="font-body-md text-body-md font-bold text-primary">{selectedConsultant.upskillingTarget}</h5>
                  <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                    Completing this learning path aligns {selectedConsultant.name} with multiple enterprise profiles currently in pipeline negotiation.
                  </p>
                </div>

                <div className="space-y-2 pt-4">
                  <button 
                    onClick={() => navigate('/pitch', { state: { consultantId: selectedConsultant.id } })}
                    className="w-full py-2.5 bg-secondary text-on-secondary font-semibold font-label-md text-label-md rounded-lg flex items-center justify-center gap-2 hover:opacity-90 transition-opacity cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[18px]">auto_awesome</span>
                    Generate Upskill Pitch
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-6 border border-dashed border-outline-variant rounded-lg flex-1 flex flex-col items-center justify-center text-center text-on-surface-variant">
                <span className="material-symbols-outlined text-[36px] mb-2 opacity-40">school</span>
                <p className="font-body-md text-body-md font-medium">No Active Recommendation</p>
                <p className="font-body-sm text-body-sm mt-1">This consultant already matches expected skill proficiencies or doesn't have an active learning path assigned.</p>
              </div>
            )}
          </div>
        ) : (
          <div className="py-12 text-center text-on-surface-variant">Select a consultant from the matrix to inspect.</div>
        )}
      </div>
    </div>
  );
}
