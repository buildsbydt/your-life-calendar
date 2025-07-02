import { useState, useEffect } from 'react';
import quotes from '../quotes.json';

export default function Header() {
  const [text, setText] = useState('');
  useEffect(() => {
    setText(quotes[Math.floor(Math.random() * quotes.length)]);
  }, []);
  return (
    <header className="text-xl md:text-2xl p-4 text-center">
      "{text}"
    </header>
  );
}
