// src/components/ICalExport.tsx
import React from 'react'
import { DateTime } from 'luxon'
import ical, { ICalEventData } from 'ical-generator'
import { saveAs } from 'file-saver'

interface Props { dob: string; dod: string }

export default function ICalExport({ dob, dod }: Props) {
  const generateICS = () => {
    const birth = DateTime.fromISO(dob)
    const death = DateTime.fromISO(dod)
    const half    = birth.plus(death.diff(birth).divideBy(2))
    const tenLeft = death.minus({ years: 10 })

    const events: ICalEventData[] = [
      { start: half.toJSDate(),    summary: '🏁 Halfway Through Your Life' },
      { start: tenLeft.toJSDate(), summary: '⏳ 10 Years Left' },
    ]

    const cal = ical({ name: 'Time To Live Milestones' })
    events.forEach(e => cal.createEvent(e))

    const blob = new Blob([cal.toString()], {
      type: 'text/calendar;charset=utf-8',
    })
    saveAs(blob, 'time-to-live-milestones.ics')
  }

  return (
    <button
      onClick={generateICS}
      className="mt-4 px-4 py-2 bg-black text-white rounded"
    >
      Download Milestones (.ics)
    </button>
  )
}




