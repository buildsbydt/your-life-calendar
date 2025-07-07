import React from 'react';
import PrintableWeeksGrid from './PrintableWeeksGrid';

// This is the props interface for our new component
interface PdfPageProps {
  dob: string;
  dod: string;
  startYearIndex: number;
  endYearIndex: number;
  isFirstPage: boolean;
  isLastPage: boolean;
}

// This is a standard React component in a .tsx file, which is what Vite expects.
const PdfPage = ({ dob, dod, startYearIndex, endYearIndex, isFirstPage, isLastPage }: PdfPageProps) => {
  return (
    <PrintableWeeksGrid
      dob={dob}
      dod={dod}
      startYearIndex={startYearIndex}
      endYearIndex={endYearIndex}
      isFirstPage={isFirstPage}
      isLastPage={isLastPage}
    />
  );
};

export default PdfPage;
