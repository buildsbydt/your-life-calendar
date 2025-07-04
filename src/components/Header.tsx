import { useEffect, useState } from 'react'
import quotesData from '../quotes.json'

type QuoteCategory = keyof typeof quotesData

export default function Header() {
  const [quoteType, setQuoteType] = useState<QuoteCategory>('motivational')
  const [currentQuote, setCurrentQuote] = useState<string>("")
  const [lastIndex, setLastIndex] = useState<number | null>(null)

  // Load stored theme on mount
  useEffect(() => {
    const storedType = localStorage.getItem('quoteType') as QuoteCategory | null
    if (storedType && quotesData[storedType]) {
      setQuoteType(storedType)
    }
  }, [])

  // Update localStorage whenever the quote type changes
  useEffect(() => {
    localStorage.setItem('quoteType', quoteType)
  }, [quoteType])

  // Quote selection logic
  const pickNonRepeatingQuote = (category: QuoteCategory) => {
    const categoryQuotes = quotesData[category]
    if (!categoryQuotes || categoryQuotes.length === 0) return "No quotes available."

    let index: number
    do {
      index = Math.floor(Math.random() * categoryQuotes.length)
    } while (index === lastIndex && categoryQuotes.length > 1)

    setLastIndex(index)
    return categoryQuotes[index]
  }

  // Quote rotation effect
  useEffect(() => {
    const initialQuote = pickNonRepeatingQuote(quoteType)
    setCurrentQuote(initialQuote)

    const interval = setInterval(() => {
      const nextQuote = pickNonRepeatingQuote(quoteType)
      setCurrentQuote(nextQuote)
    }, 30000)

    return () => clearInterval(interval)
  }, [quoteType])

  return (
    <header className="text-center mt-6 mb-4 px-4">
      <p className="text-xl md:text-2xl font-medium italic max-w-3xl mx-auto mb-4">
        “{currentQuote}”
      </p>

      <div className="flex flex-wrap justify-center gap-2 text-sm">
        {(Object.keys(quotesData) as QuoteCategory[]).map((type) => (
          <button
            key={type}
            onClick={() => setQuoteType(type)}
            className={`px-3 py-1 rounded-full transition ${
              quoteType === type
                ? 'bg-black text-white'
                : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
            }`}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>
    </header>
  )
}
