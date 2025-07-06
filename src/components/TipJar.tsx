// src/components/TipJar.tsx
import React from 'react'

/**
 * A simple tip jar component linking to an external donation page.
 * Replace the `url` constant with your own tip link (BuyMeACoffee, Ko-fi, PayPal, etc.).
 */
export default function TipJar() {
  const url = 'https://buymeacoffee.com/yourusername'  // ← update this to your tip jar URL

  return (
    <div className="flex justify-center">
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-4 py-2 rounded-lg shadow transition-all"
      >
        ☕ Buy me a coffee
      </a>
    </div>
  )
}
