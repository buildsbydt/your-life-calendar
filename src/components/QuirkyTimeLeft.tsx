// src/components/QuirkyTimeLeft.tsx
import React, { useEffect, useState } from 'react'
import { DateTime } from 'luxon'

// Define the three “quirky” metrics
type QuirkKey = 'fridays' | 'birthdays' | 'olympics'

const Q_OPTIONS: { key: QuirkKey; label: string }[] = [
  { key: 'fridays',   label: 'Fridays Left' },
  { key: 'birthdays', label: 'Birthdays Left' },
  { key: 'olympics',  label: 'Summer Olympics Left' },
]

interface Props {
  dob: string    // ISO, e.g. "1990-06-15"
  dod: string    // ISO, e.g. "2080-06-15"
}

export default function QuirkyTimeLeft({ dob, dod }: Props) {
  const [selected, setSelected] = useState<QuirkKey>('fridays')
  const [value, setValue]       = useState<number>(0)

  // 1) Count occurrences of a particular weekday between two dates
  function countWeekday(start: DateTime, end: DateTime, weekday: number) {
    let count = 0
    for (let day = start.startOf('day'); day <= end; day = day.plus({ days: 1 })) {
      if (day.weekday === weekday) count++
    }
    return count
  }

  // 2) Compute the currently selected metric
  function computeValue(): number {
    const now = DateTime.local()
    const end = DateTime.fromISO(dod)
    if (now >= end) return 0

    switch (selected) {
      case 'fridays':
        // Friday has weekday number 5
        return countWeekday(now.plus({ days: 1 }), end, 5)

      case 'birthdays': {
        const birth = DateTime.fromISO(dob)
        // Find the next birthday occurrence
        let next = birth.set({ year: now.year })
        if (next < now) next = next.plus({ years: 1 })

        // Count until death
        let count = 0
        while (next <= end) {
          count++
          next = next.plus({ years: 1 })
        }
        return count
      }

      case 'olympics': {
        // Summer Olympics every 4 years on July 1, from 2024 onward
        const nowYear = now.year
        const endYear = end.year
        let cnt = 0
        for (let y = nowYear; y <= endYear; y++) {
          if (y >= 2024 && (y - 2024) % 4 === 0) {
            const olympDate = DateTime.fromObject({ year: y, month: 7, day: 1 })
            if (olympDate > now && olympDate <= end) cnt++
          }
        }
        return cnt
      }
    }
  }

  // 3) Recompute whenever selection, dob, or dod changes
  useEffect(() => {
    setValue(computeValue())
  }, [selected, dob, dod])

  // 4) Render the metric selector and current value
  return (
    <div className="p-4 bg-gray-50 rounded shadow-sm mt-8 max-w-md mx-auto">
      {/* Buttons to choose which metric to show */}
      <div className="flex justify-center gap-2 mb-4 text-sm">
        {Q_OPTIONS.map(opt => (
          <button
            key={opt.key}
            onClick={() => setSelected(opt.key)}
            className={`px-3 py-1 rounded-full transition ${
              selected === opt.key
                ? 'bg-black text-white'
                : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {/* Display the computed value */}
      <div className="text-center">
        <p className="text-2xl font-semibold">{value}</p>
        <p className="text-sm text-gray-600">
          {Q_OPTIONS.find(o => o.key === selected)?.label}
        </p>
      </div>
    </div>
  )
}

