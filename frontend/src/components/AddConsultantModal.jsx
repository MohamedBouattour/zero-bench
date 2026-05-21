import React, { useState } from 'react';

export default function AddConsultantModal({ isOpen, onClose, onConsultantAdded }) {
  if (!isOpen) return null;

  const [formData, setFormData] = useState({
    name: '',
    title: '',
    skills: '',
    yoe: 1,
    benchStatus: '',
    dailyRate: '',
    currency: 'EUR',
    riskLevel: '',
    reactProficiency: 0,
    nodeProficiency: 0,
    devopsProficiency: 0,
    awsProficiency: 0,
    symfonyProficiency: 0,
    upskillingTarget: '',
    upskillingImpact: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'yoe' || name.endsWith('Proficiency') ? Number(value) : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch('/api/consultants', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          dailyRate: formData.dailyRate ? parseFloat(formData.dailyRate) : 0
        })
      });

      if (!response.ok) {
        throw new Error('Failed to create consultant');
      }

      const data = await response.json();
      onConsultantAdded(data);
      onClose();
      // Reset form
      setFormData({
        name: '',
        title: '',
        skills: '',
        yoe: 1,
        benchStatus: '',
        dailyRate: '',
        currency: 'EUR',
        riskLevel: '',
        reactProficiency: 0,
        nodeProficiency: 0,
        devopsProficiency: 0,
        awsProficiency: 0,
        symfonyProficiency: 0,
        upskillingTarget: '',
        upskillingImpact: ''
      });
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-primary/40 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-surface-container-lowest border border-outline-variant rounded-xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl glass-panel animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-outline-variant">
          <h3 className="font-headline-md text-headline-md font-bold text-primary flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary">person_add</span>
            Add New Consultant
          </h3>
          <button 
            onClick={onClose}
            className="p-1 hover:bg-surface-container-low rounded-full transition-colors cursor-pointer text-on-surface-variant"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6">
          {error && (
            <div className="bg-error-container text-on-error-container p-3 rounded-lg font-body-md text-body-md">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-label-md text-label-md font-medium text-on-surface-variant mb-1">
                Full Name *
              </label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. John Doe"
                className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-3 py-2 font-body-md text-body-md text-on-surface focus:outline-none focus:border-secondary"
              />
            </div>

            <div>
              <label className="block font-label-md text-label-md font-medium text-on-surface-variant mb-1">
                Role Title *
              </label>
              <input
                type="text"
                name="title"
                required
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. Senior Frontend Dev"
                className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-3 py-2 font-body-md text-body-md text-on-surface focus:outline-none focus:border-secondary"
              />
            </div>

            <div>
              <label className="block font-label-md text-label-md font-medium text-on-surface-variant mb-1">
                Skills * (comma separated)
              </label>
              <input
                type="text"
                name="skills"
                required
                value={formData.skills}
                onChange={handleChange}
                placeholder="React, AWS, Node.js"
                className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-3 py-2 font-body-md text-body-md text-on-surface focus:outline-none focus:border-secondary"
              />
            </div>

            <div>
              <label className="block font-label-md text-label-md font-medium text-on-surface-variant mb-1">
                Years of Experience *
              </label>
              <input
                type="number"
                name="yoe"
                required
                min="0"
                value={formData.yoe}
                onChange={handleChange}
                className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-3 py-2 font-body-md text-body-md text-on-surface focus:outline-none focus:border-secondary"
              />
            </div>

            <div>
              <label className="block font-label-md text-label-md font-medium text-on-surface-variant mb-1">
                Bench Status Text *
              </label>
              <input
                type="text"
                name="benchStatus"
                required
                value={formData.benchStatus}
                onChange={handleChange}
                placeholder="e.g. Ends in 12 days, Bench: 5d"
                className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-3 py-2 font-body-md text-body-md text-on-surface focus:outline-none focus:border-secondary"
              />
            </div>

            <div>
              <label className="block font-label-md text-label-md font-medium text-on-surface-variant mb-1">
                Risk Level (Optional)
              </label>
              <select
                name="riskLevel"
                value={formData.riskLevel}
                onChange={handleChange}
                className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-3 py-2 font-body-md text-body-md text-on-surface focus:outline-none focus:border-secondary"
              >
                <option value="">Auto-calculated by backend</option>
                <option value="CRITICAL">CRITICAL</option>
                <option value="MEDIUM">MEDIUM</option>
                <option value="STABLE">STABLE</option>
              </select>
            </div>

            <div>
              <label className="block font-label-md text-label-md font-medium text-on-surface-variant mb-1">
                Daily Rate *
              </label>
              <input
                type="number"
                name="dailyRate"
                required
                min="0"
                value={formData.dailyRate}
                onChange={handleChange}
                className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-3 py-2 font-body-md text-body-md text-on-surface focus:outline-none focus:border-secondary"
              />
            </div>

            <div>
              <label className="block font-label-md text-label-md font-medium text-on-surface-variant mb-1">
                Currency
              </label>
              <select
                name="currency"
                value={formData.currency}
                onChange={handleChange}
                className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-3 py-2 font-body-md text-body-md text-on-surface focus:outline-none focus:border-secondary"
              >
                <option value="EUR">EUR</option>
                <option value="TND">TND</option>
                <option value="USD">USD</option>
              </select>
            </div>
          </div>

          <div className="border-t border-outline-variant pt-4">
            <h4 className="font-headline-sm text-headline-sm font-bold text-primary mb-3">Skills Proficiency (Heatmap)</h4>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              {['React', 'Node', 'DevOps', 'AWS', 'Symfony'].map((skill) => {
                const fieldName = `${skill.toLowerCase()}Proficiency`;
                return (
                  <div key={skill}>
                    <label className="block font-label-md text-label-md text-on-surface-variant mb-1">
                      {skill} (0-5)
                    </label>
                    <input
                      type="number"
                      name={fieldName}
                      min="0"
                      max="5"
                      value={formData[fieldName]}
                      onChange={handleChange}
                      className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-3 py-2 font-body-md text-body-md text-on-surface focus:outline-none focus:border-secondary"
                    />
                  </div>
                );
              })}
            </div>
          </div>

          <div className="border-t border-outline-variant pt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-label-md text-label-md font-medium text-on-surface-variant mb-1">
                Upskilling Target
              </label>
              <input
                type="text"
                name="upskillingTarget"
                value={formData.upskillingTarget}
                onChange={handleChange}
                placeholder="e.g. AWS Cloud Practitioner"
                className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-3 py-2 font-body-md text-body-md text-on-surface focus:outline-none focus:border-secondary"
              />
            </div>

            <div>
              <label className="block font-label-md text-label-md font-medium text-on-surface-variant mb-1">
                Upskilling Impact
              </label>
              <input
                type="text"
                name="upskillingImpact"
                value={formData.upskillingImpact}
                onChange={handleChange}
                placeholder="e.g. +85% Placeability"
                className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-3 py-2 font-body-md text-body-md text-on-surface focus:outline-none focus:border-secondary"
              />
            </div>
          </div>

          {/* Footer buttons */}
          <div className="flex items-center justify-end gap-3 pt-6 border-t border-outline-variant">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="px-4 py-2 border border-outline rounded-lg text-on-surface hover:bg-surface-container-low transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-secondary text-on-secondary rounded-lg font-bold hover:opacity-90 transition-opacity cursor-pointer flex items-center gap-2"
            >
              {loading ? (
                <span>Adding...</span>
              ) : (
                <>
                  <span className="material-symbols-outlined text-[18px]">check</span>
                  Save Consultant
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
