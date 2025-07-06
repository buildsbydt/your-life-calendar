import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import React from 'react'; // Import React is crucial for React.createElement
import { createRoot } from 'react-dom/client';
import { flushSync } from 'react-dom';
import { DateTime } from 'luxon';

// Import the component we will be rendering
import PdfPage from '../components/PdfPage';

export async function exportWeeksPdf(dob: string, dod: string) {
  // --- CONFIGURATION ---
  const YEARS_PER_PAGE = 15;

  // --- SETUP ---
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'pt',
    format: 'a4',
  });
  
  const birth = DateTime.fromISO(dob);
  const death = DateTime.fromISO(dod);
  const totalYears = Math.ceil(death.diff(birth, 'years').years);
  const totalPages = Math.ceil(totalYears / YEARS_PER_PAGE);

  const renderContainer = document.createElement('div');
  Object.assign(renderContainer.style, {
    position: 'absolute',
    top: '-9999px',
    left: '0',
    width: '1024px',
  });
  document.body.appendChild(renderContainer);
  const reactRoot = createRoot(renderContainer);

  // --- PAGE-BY-PAGE RENDERING LOOP ---
  for (let i = 0; i < totalPages; i++) {
    const startYearIndex = i * YEARS_PER_PAGE;
    const endYearIndex = Math.min((i + 1) * YEARS_PER_PAGE, totalYears);

    // **THE FIX**: This creates the component without using JSX tags.
    // This is plain TypeScript and will not cause a build error.
    const pageElement = React.createElement(PdfPage, {
      dob,
      dod,
      startYearIndex,
      endYearIndex,
      isFirstPage: i === 0,
      isLastPage: i === totalPages - 1,
    });

    // Render the element we just created.
    flushSync(() => {
      reactRoot.render(pageElement);
    });

    const canvas = await html2canvas(renderContainer, {
      scale: 2,
      backgroundColor: '#ffffff',
    });

    const pageW = pdf.internal.pageSize.getWidth();
    const pageH = pdf.internal.pageSize.getHeight();
    const imgData = canvas.toDataURL('image/png');
    const imgProps = pdf.getImageProperties(imgData);
    const imgW = pageW;
    const imgH = (imgProps.height * imgW) / imgProps.width;

    if (i > 0) {
      pdf.addPage();
    }

    pdf.addImage(imgData, 'PNG', 0, 0, imgW, imgH);
  }

  // --- CLEANUP AND SAVE ---
  reactRoot.unmount();
  renderContainer.remove();
  pdf.save('weeks-calendar.pdf');
}

