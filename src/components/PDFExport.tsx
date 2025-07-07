// src/components/PDFExport.tsx
import React from 'react'
import { exportWeeksPdf } from '../utils/pdfExport'

interface Props {
  /** A ref to the <div> wrapping your WeeksGrid */
  containerRef: React.RefObject<HTMLDivElement>
}

export default function PDFExport({ containerRef }: Props) {
  const handleDownload = () => {
    if (containerRef.current) {
      exportWeeksPdf(containerRef.current)
    }
  }

  return (
    <div className="text-center mt-6">
      <button
        onClick={handleDownload}
        className="px-6 py-2 bg-black text-white rounded"
      >
        Download Weeks PDF
      </button>
    </div>
  )
}


