import React, { useState, FormEvent } from 'react';

type Props = {
  onSubmit: (data: { dob: string; dod: string }) => void;
};

export default function Form({ onSubmit }: Props) {
  const [dob, setDob] = useState('');
  const [dod, setDod] = useState('');
  const defaults = [80, 90, 100];

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit({ dob, dod });
  };

  const applyDefaultAge = (age: number) => {
    if (!dob) return;
    const [y, m, d] = dob.split('-');
    const death = new Date(+y + age, +m - 1, +d).toISOString().split('T')[0];
    setDod(death);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Date of Birth */}
      <label className="block">
        <span className="text-sm font-medium text-gray-600">Date of Birth</span>
        <input
          type="date"
          value={dob}
          onChange={e => setDob(e.target.value)}
          required
          // --- STYLE UPDATED for muted theme ---
          className="block w-full mt-1 px-2 py-1 bg-slate-100 border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-slate-400 transition-colors"
        />
      </label>

      {/* Default-age buttons */}
      <div className="flex space-x-2">
        {defaults.map(age => (
          <button
            key={age}
            type="button"
            onClick={() => applyDefaultAge(age)}
            // --- STYLE CHANGE HERE ---
            // Applied a muted, top-to-bottom silver/gray gradient
            className="w-full px-3 py-1 bg-gradient-to-b from-slate-200 to-slate-300 text-slate-700 rounded hover:from-slate-300 hover:to-slate-400 font-medium focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-slate-400 transition-all"
          >
            {age} yrs
          </button>
        ))}
      </div>

      {/* Date of Death */}
      <label className="block">
        <span className="text-sm font-medium text-gray-600">Date of Death</span>
        <input
          type="date"
          value={dod}
          onChange={e => setDod(e.target.value)}
          required
           // --- STYLE UPDATED for muted theme ---
          className="block w-full mt-1 px-2 py-1 bg-slate-100 border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-slate-400 transition-colors"
        />
      </label>

      {/* Submit button (retains a touch of color) */}
      <button
        type="submit"
        className="w-full px-4 py-2 bg-gradient-to-r from-purple-200 to-pink-200 text-gray-700 rounded hover:from-purple-300 hover:to-pink-300 focus:outline-none focus:ring-2 focus:ring-purple-300 transition-colors"
      >
        Start Countdown
      </button>
    </form>
  );
}

