import { useState } from 'react';
import './App.css';
import Header from './components/Header';
import Form from './components/Form';
import Countdown from './components/Countdown';
import QuirkyTimeLeft from './components/QuirkyTimeLeft';
import WeeksGrid from './components/WeeksGrid';
import TipJar from './components/TipJar';

// **UPDATED**: Only need the export function
import { exportWeeksPdf } from './utils/pdfExport'; 

function App() {
  const [dob, setDob] = useState<string>('1990-01-01'); // Using example dates for demo
  const [dod, setDod] = useState<string>('2080-01-01');
  const [showMetrics, setShowMetrics] = useState(false); // Default to true for demo

  // **NEW**: State to manage the button's disabled status
  const [isExporting, setIsExporting] = useState(false);

  const handleSubmit = (data: { dob: string; dod: string }) => {
    setDob(data.dob);
    setDod(data.dod);
    setShowMetrics(false); 
  };

  // The export handler is now much simpler
  const handleExport = async () => {
    if (isExporting || !dob || !dod) return;

    setIsExporting(true);
    try {
      await exportWeeksPdf(dob, dod);
    } catch (error) {
      console.error("Failed to export PDF:", error);
      // You could show an error message to the user here
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-white text-gray-900 p-6">
      <div className="w-full max-w-3xl mb-12">
        <Header />
      </div>

      <div className="w-full max-w-lg">
        <Form onSubmit={handleSubmit} />
      </div>

      {dob && dod && (
        <div className="w-full max-w-2xl mt-12 text-center">
          <Countdown dob={dob} dod={dod} />

          <button
            onClick={() => setShowMetrics(v => !v)}
            className="mt-6 text-sm underline text-gray-700 hover:text-black"
          >
            {showMetrics ? 'Hide extra metrics' : 'See more metrics'}
          </button>

          {showMetrics && (
            <div className="mt-8 space-y-8">
              <QuirkyTimeLeft dob={dob} dod={dod} />
              <div className="border rounded overflow-x-auto pr-2">
                <WeeksGrid dob={dob} dod={dod} />
              </div>

              <div className="mt-4">
                <button
                  onClick={handleExport}
                  disabled={isExporting}
                  className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {isExporting ? 'Generating PDF...' : 'Export Full Calendar as PDF'}
                </button>
              </div>

              <div className="mt-4">
                <TipJar />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;


