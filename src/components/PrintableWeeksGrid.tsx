import React from 'react';
import { DateTime } from 'luxon';
import { WeeksGridProps } from './WeeksGrid';

interface PrintableProps extends WeeksGridProps {
  startYearIndex: number;
  endYearIndex: number;
  isFirstPage: boolean;
  isLastPage: boolean;
}

// Helper function remains the same
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
  const birth = DateTime.fromISO(dob);
  const death = DateTime.fromFormat(dod, 'dd/MM/yyyy');
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
  const yearLabelWidth = '5rem';
  const gridGap = '0.5rem';

  return (
    // The main container for a single page
    <div className="bg-white p-8">
      {/* This inner div provides the border and consistent padding */}
      <div className="border border-gray-300 p-6 flex flex-col items-center">
        
        {/* **FIX**: Add top margin/padding on pages that are NOT the first page */}
        {!isFirstPage && <div className="h-16" />}

        {/* Header - only appears on the first page */}
        {isFirstPage && (
          <div className="text-center mb-8">
            {/* **FIX**: Increased text size and made color uniform */}
            <h2 className="text-5xl font-bold text-black">
              Your Life in Weeks
            </h2>
            <p className="text-lg text-black mt-5">
              {livedWeeks} weeks lived, {remaining} weeks remaining
            </p>
            <p className="text-lg text-black mt-1">
              as of {todayFormatted}
            </p>
          </div>
        )}

        {/* Grid Container */}
        <div className="max-w-max space-y-4">
          {yearsToRender.map(({ label, weeks }) => {
            const firstHalf = weeks.slice(0, 26);
            const secondHalf = weeks.slice(26);
            
            // **FIX FOR CENTERING**: We add an invisible spacer on the right of the grid
            // to perfectly balance the year label on the left.
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
                  <div /> {/* Invisible spacer div */}
                </div>
                <div style={gridStyle}>
                  <div className="invisible">{label}</div> {/* Invisible label for alignment */}
                  {secondHalf.map((w, i) => {
                    const base = 'w-full h-full';
                    if (w.status === 'past') return <div key={i} className={`${base} bg-black`} />;
                    if (w.status === 'current') return <div key={i} className={`${base} border-2 border-blue-600`} />;
                    return <div key={i} className={`${base} border border-black`} />;
                  })}
                  <div /> {/* Invisible spacer div */}
                </div>
              </div>
            );
          })}
        </div>
        
        {/* RIP message - only appears on the last page */}
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

