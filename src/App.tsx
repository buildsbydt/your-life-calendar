import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import Form from './components/Form';
import Countdown from './components/Countdown';
import QuirkyTimeLeft from './components/QuirkyTimeLeft';
import WeeksGrid from './components/WeeksGrid';
import TipJar from './components/TipJar';
import { exportWeeksPdf } from './utils/pdfExport';
import PrivacyPolicy from './components/PrivacyPolicy'; // Import the new component

// Define a type for our countdown data
type CountdownData = {
  dob: string;
  dod: string;
};

function App() {
  // This state will hold the data ONLY after the user clicks "Start Countdown"
  const [countdownData, setCountdownData] = useState<CountdownData | null>(null);
  
  const [showMetrics, setShowMetrics] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  // **NEW**: State to control the visibility of the privacy policy
  const [isPolicyVisible, setIsPolicyVisible] = useState(false);

  // This function now receives the data from the form and sets our new state
  const handleSubmit = (data: { dob: string; dod: string }) => {
    setCountdownData(data);
    setShowMetrics(false); // Reset metrics visibility on new submission
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
        {/* The form's onSubmit now calls our updated handleSubmit function */}
        <Form onSubmit={handleSubmit} />
      </div>

      {/* This entire section will now ONLY render if countdownData has been set */}
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
                {/* NOTE ABOUT FREE PDF ADDED HERE */}
                <p className="text-xs text-gray-500 mt-2">
                  Download a free, high-quality PDF of your calendar!
                </p>
              </div>
              <div className="mt-4">
                <TipJar />
              </div>
            </div>
          )}
        </div>
      )}

      {/* FOOTER SECTION UPDATED HERE */}
      <footer className="w-full mt-16 border-t pt-8 text-center">
        <button 
          onClick={() => setIsPolicyVisible(!isPolicyVisible)}
          className="text-sm text-gray-600 underline hover:text-blue-600"
        >
          {isPolicyVisible ? 'Hide' : 'Show'} Privacy Policy & Contact
        </button>

        {/* The Privacy Policy will now only appear when the button is clicked */}
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
