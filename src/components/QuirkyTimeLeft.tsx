// src/components/QuirkyTimeLeft.tsx
import { DateTime } from 'luxon'
import { useEffect, useState } from 'react'

type QuirkKey = 'fridays' | 'birthdays' | 'olympics'
const Q_OPTIONS: { key: QuirkKey; label: string }[] = [
  { key: 'fridays',    label: 'Fridays Left' },
  { key: 'birthdays',  label: 'Birthdays Left' },
  { key: 'olympics',   label: 'Summer Olympics Left' },
]

interface Props {
  dob: string    // ISO format, e.g. "1990-06-15"
  dod: string    // ISO format, e.g. "2080-06-15"
  hasPremium: boolean
}

export default function QuirkyTimeLeft({ dob, dod, hasPremium }: Props) {
  const [selected, setSelected] = useState<QuirkKey>('fridays')
  const [value, setValue] = useState<number>(0)

  // Count a given weekday between two dates
  function countWeekday(start: DateTime, end: DateTime, weekday: number) {
    let count = 0
    for (let day = start.startOf('day'); day <= end; day = day.plus({ days: 1 })) {
      if (day.weekday === weekday) count++
    }
    return count
  }

  // Compute based on selected metric
  function computeValue(): number {
    const now = DateTime.local()
    const end = DateTime.fromISO(dod)
    if (now >= end) return 0

    switch (selected) {
      case 'fridays':
        // 5 = Friday
        return countWeekday(now.plus({ days: 1 }), end, 5)

      case 'birthdays':
        {
          const birth = DateTime.fromISO(dob)
          let next = birth.set({ year: now.year })
          if (next < now) next = next.plus({ years: 1 })
          let count = 0
          while (next <= end) {
            count++
            next = next.plus({ years: 1 })
          }
          return count
        }

      case 'olympics':
        {
          // Every 4 years on July 1 starting 2024
          const startYear = now.year
          const endYear = end.year
          let cnt = 0
          for (let y = startYear; y <= endYear; y++) {
            if ((y - 2024) % 4 === 0 && y >= 2024) {
              const e = DateTime.fromObject({ year: y, month: 7, day: 1 })
              if (e > now && e <= end) cnt++
            }
          }
          return cnt
        }
    }
  }

  // Recompute on mount or when inputs change
  useEffect(() => {
    setValue(computeValue())
    // We deliberately omit computeValue from deps
  }, [selected, dob, dod])

  if (!hasPremium) {
    return (
      <div className="p-4 border border-dotted border-gray-400 rounded text-center">
        <p className="mb-2">Unlock premium metrics:</p>
        <button className="px-4 py-2 bg-black text-white rounded">
          Unlock Now
        </button>
      </div>
    )
  }

  return (
    <div className="p-4 bg-gray-50 rounded shadow-sm mt-8 max-w-md mx-auto">
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
      <div className="text-center">
        <p className="text-2xl font-semibold">{value}</p>
        <p className="text-sm text-gray-600">
          {Q_OPTIONS.find(o => o.key === selected)?.label}
        </p>
      </div>
    </div>
  )
}
