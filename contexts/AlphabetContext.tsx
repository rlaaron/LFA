"use client"

import { createContext, useContext, useState, ReactNode } from 'react'
import { Alphabet } from '@/lib/models/Alphabet'

export interface AlphabetState {
  name: string
  alphabet: Alphabet
}

interface AlphabetContextType {
  alphabets: AlphabetState[]
  setAlphabets: (alphabets: AlphabetState[]) => void
}

const AlphabetContext = createContext<AlphabetContextType | undefined>(undefined)

export function AlphabetProvider({ children }: { children: ReactNode }) {
  const [alphabets, setAlphabets] = useState<AlphabetState[]>([
    { name: "Alfabeto 1", alphabet: new Alphabet({ a: true, b: true, c: true }) },
    { name: "Alfabeto 2", alphabet: new Alphabet({ x: true, y: true, z: true }) },
    { name: "Alfabeto 3", alphabet: new Alphabet({ "1": true, "11": true, "01": true }) }
  ])

  return (
    <AlphabetContext.Provider value={{ alphabets, setAlphabets }}>
      {children}
    </AlphabetContext.Provider>
  )
}

export function useAlphabets() {
  const context = useContext(AlphabetContext)
  if (context === undefined) {
    throw new Error('useAlphabets must be used within an AlphabetProvider')
  }
  return context
}
