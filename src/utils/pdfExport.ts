import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { flushSync } from 'react-dom';
import { DateTime } from 'luxon';

// This import must exactly match the filename, including capitalization.
import PdfPage from '../components/PdfPage';

export async function exportWeeksPdf(dob: string, dod: string) {
  const YEARS_PER_PAGE = 15;
  const pdf = new jsPDF({ orientation: 'portrait', unit: 'pt', format: 'a4' });
  
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

  for (let i = 0; i < totalPages; i++) {
    const startYearIndex = i * YEARS_PER_PAGE;
    const endYearIndex = Math.min((i + 1) * YEARS_PER_PAGE, totalYears);

    const pageElement = React.createElement(PdfPage, {
      dob,
      dod,
      startYearIndex,
      endYearIndex,
      isFirstPage: i === 0,
      isLastPage: i === totalPages - 1,
    });

    flushSync(() => {
      reactRoot.render(pageElement);
    });

    const canvas = await html2canvas(renderContainer, {
      scale: 2,
      backgroundColor: '#ffffff',
    });

    const pageW = pdf.internal.pageSize.getWidth();
    const pageH = pdf.internal.pageSize.getHeight(); // This line is now used
    const imgData = canvas.toDataURL('image/png');
    const imgProps = pdf.getImageProperties(imgData);
    const imgW = pageW;
    const imgH = (imgProps.height * imgW) / imgProps.width;

    // This logic ensures the image isn't stretched and fits on the page
    const pageRatio = pageW / pageH;
    const imgRatio = imgW / imgH;
    let finalImgH = imgH;
    if (imgRatio > pageRatio) {
        finalImgH = pageW / imgRatio;
    }

    if (i > 0) pdf.addPage();
    pdf.addImage(imgData, 'PNG', 0, 0, pageW, finalImgH);
  }

  reactRoot.unmount();
  renderContainer.remove();
  pdf.save('your-life-calendar.pdf');
}

