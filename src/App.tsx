import { useState } from 'react';
import './App.css';
import Header from './components/Header';
import Form from './components/Form';
import Countdown from './components/Countdown';

function App() {
  // 1. Lifted state for dates
  const [dob, setDob] = useState<string>('');
  const [dod, setDod] = useState<string>('');

  // 2. Handler to wire Form → App state
  const handleSubmit = (data: { dob: string; dod: string }) => {
    console.log('[App] Form submitted with:', data);
    setDob(data.dob);
    setDod(data.dod);
  };

  return (
    <div className="max-w-lg mx-auto p-4">
      {/* App header with extra bottom margin */}
      <div className="mb-16">
        <Header />
      </div>

      {/* 3. Wire the form */}
      <Form onSubmit={handleSubmit} />
      
      {/* 4. Conditionally show the countdown with extra spacing */}
      {dob && dod && (
        <div className="mt-12">
          <Countdown dob={dob} dod={dod} />
        </div>
      )}
    </div>
  );
}

export default App;



