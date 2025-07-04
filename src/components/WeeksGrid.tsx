// src/components/WeeksGrid.tsx
import React, { forwardRef } from 'react'
import { DateTime } from 'luxon'

interface Props {
  dob: string  // ISO, e.g. "1990-06-15"
  dod: string  // ISO, e.g. "2080-06-15"
}

// Build an array of week statuses: past, current, future
function buildWeekArray(dob: DateTime, dod: DateTime) {
  const now   = DateTime.local()
  const start = dob.startOf('week')
  const end   = dod.endOf('week')
  const weeks: { status: 'past' | 'current' | 'future' }[] = []

  let cursor = start
  while (cursor <= end) {
    const status =
      cursor.plus({ weeks: 1 }) < now
        ? 'past'
      : cursor <= now && now < cursor.plus({ weeks: 1 })
        ? 'current'
        : 'future'
    weeks.push({ status })
    cursor = cursor.plus({ weeks: 1 })
  }
  return weeks
}

/**
 * ForwardRef wrapper so parent can get a ref to this entire grid container
 */
const WeeksGrid = forwardRef<HTMLDivElement, Props>(({ dob, dod }, ref) => {
  const birth = DateTime.fromISO(dob)
  const death = DateTime.fromISO(dod)
  const weeks = buildWeekArray(birth, death)

  // Group into rows of 52 weeks
  const rows: typeof weeks[] = []
  for (let i = 0; i < weeks.length; i += 52) {
    rows.push(weeks.slice(i, i + 52))
  }

  return (
    <div ref={ref} className="overflow-auto max-h-[60vh] my-6">
      {/* Section title */}
      <h3 className="text-center text-lg font-semibold mb-4">
        Weeks Remaining
      </h3>

      {/* Grid of weeks */}
      <div className="inline-block">
        {rows.map((row, rowIdx) => (
          <div key={rowIdx} className="flex">
            {row.map((w, i) => (
              <div
                key={i}
                className={
                  `w-3 h-3 border ` +
                  (w.status === 'past'
                    ? 'bg-gray-300'
                    : w.status === 'current'
                    ? 'bg-blue-500'
                    : 'bg-white')
                }
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
})

WeeksGrid.displayName = 'WeeksGrid'
export default WeeksGrid


