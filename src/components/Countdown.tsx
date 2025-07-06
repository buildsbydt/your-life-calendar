// src/components/Countdown.tsx
import React, { useState, useEffect } from 'react';
import { DateTime } from 'luxon';
import { motion } from 'framer-motion';

interface CountdownProps {
  dob: string;
  dod: string;
}

export default function Countdown({ dob, dod }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  // Ensure two-digit display
  const pad = (n: number) => String(Math.floor(n)).padStart(2, '0');

  // Recalculate every second
  useEffect(() => {
    if (!dod) return;
    const tick = () => {
      const now = DateTime.local();
      // **THE FIX**: Use fromFormat to correctly parse the 'dd/MM/yyyy' date string from the UI.
      const end = DateTime.fromFormat(dod, 'dd/MM/yyyy').plus({ days: 1 }).startOf('day');
      
      // Ensure we don't show negative numbers if the date has passed
      if (now > end) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const diff = end
        .diff(now)
        .shiftTo('days', 'hours', 'minutes', 'seconds')
        .toObject();

      setTimeLeft({
        days: diff.days ?? 0,
        hours: diff.hours ?? 0,
        minutes: diff.minutes ?? 0,
        seconds: diff.seconds ?? 0,
      });
    };
    tick();
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [dod]);

  // Don’t render until both dates are provided
  if (!dob || !dod) return null;

  const { days, hours, minutes, seconds } = timeLeft;

  // Define your colored cards—only the last one gets "left"
  const units = [
    { value: days,   label: 'Days',         color: 'bg-indigo-100' },
    { value: hours,  label: 'Hours',        color: 'bg-green-100'  },
    { value: minutes,label: 'Minutes',      color: 'bg-yellow-100' },
    { value: seconds,label: 'Seconds left', color: 'bg-pink-100'   },
  ];

  return (
    <div className="p-4">
      <div className="flex flex-wrap justify-center gap-4">
        {units.map(({ value, label, color }, idx) => (
          <div
            key={label}
            className={`
              ${color}
              flex-1 min-w-[4rem]
              p-4 rounded-lg shadow-md
              flex flex-col items-center justify-center
            `}
          >
            {idx === units.length - 1 ? (
              <motion.div
                key={value}
                initial={{ scale: 1.2 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.2 }}
                className="text-3xl font-bold"
              >
                {pad(value)}
              </motion.div>
            ) : (
              <div className="text-3xl font-bold">{pad(value)}</div>
            )}
            <div className="text-xs uppercase mt-1 text-gray-700">
              {label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
