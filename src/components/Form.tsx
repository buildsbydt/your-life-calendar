import React, { useState, FormEvent } from 'react';
import { DateTime } from 'luxon';

type Props = {
  onSubmit: (data: { dob: string; dod: string }) => void;
};

export default function Form({ onSubmit }: Props) {
  const [dob, setDob] = useState('');
  const [dod, setDod] = useState('');
  const defaults = [80, 90, 100];

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (dob && dod) {
      onSubmit({ dob, dod });
    }
  };

  const applyDefaultAge = (age: number) => {
    if (!dob) return;
    const birthDate = DateTime.fromISO(dob);
    if (birthDate.isValid) {
      const deathDate = birthDate.plus({ years: age });
      setDod(deathDate.toISODate());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Date of Birth */}
      <label className="block">
        {/* FONT SIZE INCREASED HERE */}
        <span className="text-xl font-medium text-gray-600 font-covered-by-your-grace">Date of Birth</span>
        <input
          type="date"
          value={dob}
          onChange={e => setDob(e.target.value)}
          required
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
            // FONT SIZE INCREASED HERE
            className="w-full px-3 py-1 bg-gradient-to-b from-gray-200 to-gray-300 text-gray-700 rounded hover:from-gray-500 hover:to-gray-600 font-medium focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-400 transition-all font-covered-by-your-grace text-2xl"
          >
            {age} yrs
          </button>
        ))}
      </div>

      {/* Preset instructions */}
      <p className="text-center italic text-xl text-gray-700 font-covered-by-your-grace">
        Choose your own date of death or try a preset below!
      </p>

      {/* Date of Death */}
      <label className="block">
        {/* FONT SIZE INCREASED HERE */}
        <span className="text-xl font-medium text-gray-600 font-covered-by-your-grace">Date of Death</span>
        <input
          type="date"
          value={dod}
          onChange={e => setDod(e.target.value)}
          required
          className="block w-full mt-1 px-2 py-1 bg-slate-100 border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-slate-400 transition-colors"
        />
      </label>

      {/* Submit button */}
      <button
        type="submit"
        // FONT SIZE INCREASED HERE
        className="w-full px-4 py-2 bg-gradient-to-r from-gray-200 to-blue-400 text-black-700 rounded hover:from-blue-200 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-colors font-covered-by-your-grace text-2xl"
      >
        Start Countdown
      </button>
    </form>
  );
}
