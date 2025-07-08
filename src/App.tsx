import { useState } from 'react';
import './App.css';
import Header from './components/Header';
import Form from './components/Form';
import Countdown from './components/Countdown';
import QuirkyTimeLeft from './components/QuirkyTimeLeft';
import WeeksGrid from './components/WeeksGrid';
import { exportWeeksPdf } from './utils/pdfExport';
import PrivacyPolicy from './components/PrivacyPolicy';

type CountdownData = {
  dob: string;
  dod: string;
};

function App() {
  const [countdownData, setCountdownData] = useState<CountdownData | null>(null);
  const [showMetrics, setShowMetrics] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [isPolicyVisible, setIsPolicyVisible] = useState(false);

  const handleSubmit = (data: { dob: string; dod: string }) => {
    setCountdownData(data);
    setShowMetrics(false);
  };

  const handleExport = async () => {
    if (isExporting || !countdownData) return;
    setIsExporting(true);
    try {
      await exportWeeksPdf(countdownData.dob, countdownData.dod);
    } catch (error) {
      console.error("Failed to export PDF:", error);
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
      {countdownData && (
        <div className="w-full max-w-2xl mt-12 text-center">
          <Countdown dob={countdownData.dob} dod={countdownData.dod} />
          <button
            onClick={() => setShowMetrics(v => !v)}
            className="mt-6 text-sm underline text-gray-700 hover:text-black"
          >
            {showMetrics ? 'Hide extra metrics' : 'See more metrics'}
          </button>
          {showMetrics && (
            <div className="mt-8 space-y-8">
              <QuirkyTimeLeft dob={countdownData.dob} dod={countdownData.dod} />
              <div className="border rounded overflow-x-auto pr-2">
                <WeeksGrid dob={countdownData.dob} dod={countdownData.dod} />
              </div>
              <div className="mt-4">
                <button
                  onClick={handleExport}
                  disabled={isExporting}
                  className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {isExporting ? 'Generating PDF...' : 'Export Full Calendar as PDF'}
                </button>
                <p className="text-xs text-gray-500 mt-2">
                  Download a free, high-quality PDF of your calendar!
                </p>
              </div>
              {/* THE TIP JAR COMPONENT HAS BEEN REMOVED FROM HERE */}
            </div>
          )}
        </div>
      )}
      <footer className="w-full mt-16 border-t pt-8 text-center">
        <button 
          onClick={() => setIsPolicyVisible(!isPolicyVisible)}
          className="text-sm text-gray-600 underline hover:text-blue-600"
        >
          {isPolicyVisible ? 'Hide' : 'Show'} Privacy Policy & Contact
        </button>
        {isPolicyVisible && (
          <div className="mt-4">
            <PrivacyPolicy />
          </div>
        )}
      </footer>
    </div>
  );
}

export default App;
