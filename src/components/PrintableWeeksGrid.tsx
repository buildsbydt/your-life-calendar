import React from 'react';
import { DateTime } from 'luxon';
import { WeeksGridProps } from './WeeksGrid';

interface PrintableProps extends WeeksGridProps {
  startYearIndex: number;
  endYearIndex: number;
  isFirstPage: boolean;
  isLastPage: boolean;
}

function buildWeekArray(dob: DateTime, dod: DateTime) {
  const now = DateTime.local();
  const start = dob.startOf('week');
  const end = dod.endOf('week');
  const weeks: { status: 'past' | 'current' | 'future' }[] = [];
  let cursor = start;

  while (cursor <= end) {
    const status =
      cursor.plus({ weeks: 1 }) < now ? 'past'
      : cursor <= now && now < cursor.plus({ weeks: 1 }) ? 'current'
      : 'future';
    weeks.push({ status });
    cursor = cursor.plus({ weeks: 1 });
  }
  return weeks;
}

const PrintableWeeksGrid = ({ dob, dod, startYearIndex, endYearIndex, isFirstPage, isLastPage }: PrintableProps) => {
  // **THE FIX**: Use fromISO, which correctly parses the 'YYYY-MM-DD' format.
  const birth = DateTime.fromISO(dob);
  const death = DateTime.fromISO(dod);

  // Stop if dates are invalid to prevent crashing the PDF export
  if (!birth.isValid || !death.isValid) {
    return <div className="p-8 text-red-500">Error: Invalid date format provided. Please check your inputs.</div>;
  }

  const allWeeks = buildWeekArray(birth, death);
  const totalYears = Math.ceil(allWeeks.length / 52);
  const livedWeeks = allWeeks.filter(w => w.status !== 'future').length;
  const remaining = allWeeks.length - livedWeeks;

  const todayFormatted = DateTime.local().toLocaleString(DateTime.DATE_FULL);
  const dodFormatted = death.toLocaleString(DateTime.DATE_FULL);

  const allYears: { label: number; weeks: typeof allWeeks }[] = [];
  for (let y = 0; y < totalYears; y++) {
    allYears.push({
      label: birth.year + y,
      weeks: allWeeks.slice(y * 52, y * 52 + 52),
    });
  }

  const yearsToRender = allYears.slice(startYearIndex, endYearIndex);

  const boxSize = '1.5rem';
  const yearLabelWidth = '4.8rem'; // Adjusted for better centering
  const gridGap = '0.5rem';

  return (
    <div className="bg-white p-8">
      <div className="border border-gray-300 p-6 flex flex-col items-center">
        {!isFirstPage && <div className="h-16" />}
        {isFirstPage && (
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-black">
              Your Life in Weeks
            </h2>
            <p className="text-lg text-black mt-2">
              {livedWeeks} weeks lived, {remaining} weeks remaining
            </p>
            <p className="text-base text-black mt-1">
              as of {todayFormatted}
            </p>
          </div>
        )}
        <div className="max-w-max space-y-4">
          {yearsToRender.map(({ label, weeks }) => {
            const firstHalf = weeks.slice(0, 26);
            const secondHalf = weeks.slice(26);
            const gridStyle = {
              display: 'grid',
              gap: gridGap,
              gridTemplateColumns: `${yearLabelWidth} repeat(26, ${boxSize}) ${yearLabelWidth}`,
              gridAutoRows: boxSize,
            };
            return (
              <div key={label} className="space-y-2">
                <div style={gridStyle}>
                  <div className="flex items-center justify-end pr-3 text-sm font-medium text-black">{label}</div>
                  {firstHalf.map((w, i) => {
                    const base = 'w-full h-full';
                    if (w.status === 'past') return <div key={i} className={`${base} bg-black`} />;
                    if (w.status === 'current') return <div key={i} className={`${base} border-2 border-blue-600`} />;
                    return <div key={i} className={`${base} border border-black`} />;
                  })}
                  <div />
                </div>
                <div style={gridStyle}>
                  <div className="invisible">{label}</div>
                  {secondHalf.map((w, i) => {
                    const base = 'w-full h-full';
                    if (w.status === 'past') return <div key={i} className={`${base} bg-black`} />;
                    if (w.status === 'current') return <div key={i} className={`${base} border-2 border-blue-600`} />;
                    return <div key={i} className={`${base} border border-black`} />;
                  })}
                  <div />
                </div>
              </div>
            );
          })}
        </div>
        {isLastPage && (
          <div className="mt-8 text-center">
              <p className="text-lg font-serif italic text-gray-800">Rest in Peace</p>
              <p className="text-sm text-gray-600">{dodFormatted}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PrintableWeeksGrid;