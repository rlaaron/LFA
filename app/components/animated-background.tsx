"use client"

import { useEffect, useState } from "react"

type Symbol = {
  id: number
  char: string
  x: number
  y: number
  size: number
  speed: number
  opacity: number
}

export function AnimatedBackground() {
  const [symbols, setSymbols] = useState<Symbol[]>([])
  
  useEffect(() => {
    // Caracteres relacionados con lenguajes formales y autómatas
    const chars = ['Σ', 'δ', 'ε', 'λ', '∪', '∩', '→', '∈', '∉', '⊆', '∀', '∃', '¬', '∅', '*', '+', '⊕', '⊗']
    
    // Crear símbolos iniciales
    const initialSymbols = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      char: chars[Math.floor(Math.random() * chars.length)],
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 1 + 0.5,
      speed: Math.random() * 0.2 + 0.1,
      opacity: Math.random() * 0.15 + 0.05
    }))
    
    setSymbols(initialSymbols)
    
    // Animar símbolos
    const interval = setInterval(() => {
      setSymbols(prev => 
        prev.map(symbol => ({
          ...symbol,
          y: (symbol.y + symbol.speed) % 100,
          x: symbol.x + (Math.sin(symbol.y / 10) * 0.1),
          char: Math.random() < 0.01 ? chars[Math.floor(Math.random() * chars.length)] : symbol.char
        }))
      )
    }, 50)
    
    return () => clearInterval(interval)
  }, [])
  
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {symbols.map(symbol => (
        <div
          key={symbol.id}
          className="absolute text-primary font-mono transition-opacity duration-1000"
          style={{
            left: `${symbol.x}%`,
            top: `${symbol.y}%`,
            fontSize: `${symbol.size}rem`,
            opacity: symbol.opacity,
            transform: 'translate(-50%, -50%)',
          }}
        >
          {symbol.char}
        </div>
      ))}
    </div>
  )
}
