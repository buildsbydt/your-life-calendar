// src/components/WeeksGrid.tsx
import React, { forwardRef } from 'react'
import { DateTime } from 'luxon'

interface Props {
  dob: string   // ISO, e.g. "1990-06-15"
  dod: string   // ISO, e.g. "2080-06-15"
}

// Build array of week statuses
function buildWeekArray(dob: DateTime, dod: DateTime) {
  const now   = DateTime.local()
  const start = dob.startOf('week')
  const end   = dod.endOf('week')
  const weeks: { status: 'past' | 'current' | 'future' }[] = []
  let cursor = start

  while (cursor <= end) {
    const status =
      cursor.plus({ weeks: 1 }) < now           ? 'past'
      : cursor <= now && now < cursor.plus({ weeks: 1 }) ? 'current'
      : 'future'
    weeks.push({ status })
    cursor = cursor.plus({ weeks: 1 })
  }

  return weeks
}

// Forward ref now points to scrollable container
const WeeksGrid = forwardRef<HTMLDivElement, Props>(({ dob, dod }, ref) => {
  const birth      = DateTime.fromISO(dob)
  const death      = DateTime.fromISO(dod)
  const allWeeks   = buildWeekArray(birth, death)
  const totalYears = Math.ceil(allWeeks.length / 52)
  const livedWeeks = allWeeks.filter(w => w.status !== 'future').length
  const remaining  = allWeeks.length - livedWeeks

  const years: { label: number; weeks: typeof allWeeks }[] = []
  for (let y = 0; y < totalYears; y++) {
    years.push({
      label: birth.year + y,
      weeks: allWeeks.slice(y * 52, y * 52 + 52),
    })
  }

  return (
    <div className="my-8">
      <h2 className="text-2xl font-bold text-center mb-1">
        Your life in weeks calendar
      </h2>
      <p className="text-center text-sm mb-6">
        <span className="font-medium">{livedWeeks}</span> weeks lived,{' '}
        <span className="font-medium">{remaining}</span> weeks remaining
      </p>

      {/* Move ref here onto scrollable container */}
      <div
        ref={ref}
        className="overflow-y-auto overflow-x-hidden max-h-[70vh] border p-4 space-y-6"
      >
        {years.map(({ label, weeks }, idx) => {
          const firstHalf  = weeks.slice(0, 26)
          const secondHalf = weeks.slice(26)

          return (
            <div key={idx} className="space-y-1">
              {/* First 26 weeks */}
              <div
                className="grid gap-1"
                style={{
                  gridTemplateColumns: '4rem repeat(26, minmax(1rem, 1fr))',
                  gridAutoRows: '1rem',
                }}
              >
                <div className="flex items-center justify-end pr-2 text-xs font-medium">
                  {label}
                </div>
                {firstHalf.map((w, i) => {
                  const base = 'w-full h-full'
                  if (w.status === 'past') {
                    return <div key={i} className={`${base} bg-black`} />
                  }
                  if (w.status === 'current') {
                    return (
                      <div
                        key={i}
                        className={`${base} border-2 border-blue-600`}
                      />
                    )
                  }
                  return <div key={i} className={`${base} border border-black`} />
                })}
              </div>

              {/* Second 26 weeks */}
              <div
                className="grid gap-1"
                style={{
                  gridTemplateColumns: '4rem repeat(26, minmax(1rem, 1fr))',
                  gridAutoRows: '1rem',
                }}
              >
                <div className="pr-2 text-xs font-medium invisible">
                  {label}
                </div>
                {secondHalf.map((w, i) => {
                  const base = 'w-full h-full'
                  if (w.status === 'past') {
                    return <div key={i} className={`${base} bg-black`} />
                  }
                  if (w.status === 'current') {
                    return (
                      <div
                        key={i}
                        className={`${base} border-2 border-blue-600`}
                      />
                    )
                  }
                  return <div key={i} className={`${base} border border-black`} />
                })}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
})

WeeksGrid.displayName = 'WeeksGrid'
export default WeeksGrid
export type { Props as WeeksGridProps }