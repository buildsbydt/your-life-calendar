import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import Form from './components/Form'
import Countdown from './components/Countdown'
import QuirkyTimeLeft from './components/QuirkyTimeLeft'
import WeeksGrid from './components/WeeksGrid'
import ICalExport from './components/ICalExport'

function App() {
  const [dob, setDob] = useState<string>('')
  const [dod, setDod] = useState<string>('')
  const [showMetrics, setShowMetrics] = useState(false)
  // Replace this with your real premium check
  const hasPremium = true  // or false to show upsell

  const handleSubmit = (data: { dob: string; dod: string }) => {
    setDob(data.dob)
    setDod(data.dod)
    setShowMetrics(false) // reset panels when new dates set
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-white text-gray-900 p-6">
      {/* 1. Header + Quote Toggle */}
      <div className="w-full max-w-3xl mb-12">
        <Header />
      </div>

      {/* 2. Input Form */}
      <div className="w-full max-w-lg">
        <Form onSubmit={handleSubmit} />
      </div>

      {/* 3. Countdown + Metrics Toggle */}
      {dob && dod && (
        <div className="w-full max-w-2xl mt-12 text-center">
          <Countdown dob={dob} dod={dod} />

          {/* See More Metrics Toggle */}
          <button
            onClick={() => setShowMetrics(v => !v)}
            className="mt-6 text-sm underline text-gray-700 hover:text-black"
          >
            {showMetrics ? 'Hide extra metrics' : 'See more metrics'}
          </button>

          {/* 4. Metrics Panel (hidden by default) */}
          {showMetrics && (
            <div className="mt-8 space-y-8">
              {/* 4a. Quirky Time-Left Metrics */}
              <QuirkyTimeLeft dob={dob} dod={dod} hasPremium={hasPremium} />

              {/* 4b. Weeks-of-Your-Life Grid */}
              <WeeksGrid dob={dob} dod={dod} />

              {/* 4c. iCal Export of Milestones (premium only) */}
              {hasPremium ? (
                <ICalExport dob={dob} dod={dod} />
              ) : (
                <div className="p-4 border border-dotted border-gray-400 rounded text-center">
                  <p className="mb-2">Unlock premium to download milestones</p>
                  <button className="px-4 py-2 bg-black text-white rounded">
                    Unlock Now
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default App



