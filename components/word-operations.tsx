"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { ArrowRightLeft, Check, Combine, RotateCcw, X, Repeat } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { WordService } from "@/lib/services/WordService"
import { Alphabet } from "@/lib/models/Alphabet"

interface AlphabetState {
  name: string;
  alphabet: Alphabet;
}

export function WordOperations() {
  const [word1, setWord1] = useState("")
  const [word2, setWord2] = useState("")
  const [power, setPower] = useState("2")
  const [result, setResult] = useState<{ operation: string; result: string; valid: boolean } | null>(null)
  const [alphabets, setAlphabets] = useState<AlphabetState[]>([
    { name: "Alfabeto 1", alphabet: new Alphabet({ a: true, b: true, c: true }) },
    { name: "Alfabeto 2", alphabet: new Alphabet({ x: true, y: true, z: true }) }
  ])
  const [selectedAlphabet, setSelectedAlphabet] = useState("Alfabeto 1")
  const [wordService] = useState(() => new WordService())

  const validateWord = () => {
    const currentAlphabet = alphabets.find(a => a.name === selectedAlphabet)?.alphabet
    if (!currentAlphabet) return

    const isValid = wordService.isValid(word1, currentAlphabet)
    setResult({
      operation: "Validación",
      result: word1,
      valid: isValid,
    })
  }

  const concatenateWords = () => {
    const currentAlphabet = alphabets.find(a => a.name === selectedAlphabet)?.alphabet
    if (!currentAlphabet) return

    try {
      const result = wordService.concatenate(word1, word2, currentAlphabet)
      setResult({
        operation: "Concatenación",
        result: result,
        valid: true,
      })
    } catch (e) {
      setResult({
        operation: "Concatenación",
        result: "Error: Palabras inválidas para el alfabeto",
        valid: false,
      })
    }
  }

  const reflectWord = () => {
    const currentAlphabet = alphabets.find(a => a.name === selectedAlphabet)?.alphabet
    if (!currentAlphabet) return

    try {
      const result = wordService.reflect(word1, currentAlphabet)
      setResult({
        operation: "Reflexión",
        result: result,
        valid: true,
      })
    } catch (e) {
      setResult({
        operation: "Reflexión",
        result: "Error: Palabra inválida para el alfabeto",
        valid: false,
      })
    }
  }

  const powerWord = () => {
    const currentAlphabet = alphabets.find(a => a.name === selectedAlphabet)?.alphabet
    if (!currentAlphabet) return

    try {
      const powerNum = Number.parseInt(power)
      const result = wordService.power(word1, powerNum, currentAlphabet)
      setResult({
        operation: `Potencia (${power})`,
        result: result,
        valid: true,
      })
    } catch (e) {
      setResult({
        operation: `Potencia (${power})`,
        result: "Error: Palabra inválida o exponente negativo",
        valid: false,
      })
    }
  }

  const checkPalindrome = () => {
    const currentAlphabet = alphabets.find(a => a.name === selectedAlphabet)?.alphabet
    if (!currentAlphabet) return

    const isPalindrome = wordService.isPalindrome(word1, currentAlphabet)
    setResult({
      operation: "Palíndromo",
      result: isPalindrome ? "Es palíndromo" : "No es palíndromo",
      valid: isPalindrome,
    })
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <CardTitle>Operaciones con Palabras</CardTitle>
              <CardDescription>Realice operaciones con palabras basadas en el alfabeto definido</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Select value={selectedAlphabet} onValueChange={setSelectedAlphabet}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Seleccionar alfabeto" />
                </SelectTrigger>
                <SelectContent>
                  {alphabets.map((alphabetState) => (
                    <SelectItem key={alphabetState.name} value={alphabetState.name}>
                      {alphabetState.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="word1">Palabra 1</Label>
              <Input
                id="word1"
                placeholder="Ingrese una palabra"
                value={word1}
                onChange={(e) => setWord1(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="word2">Palabra 2 (para concatenación)</Label>
              <Input
                id="word2"
                placeholder="Ingrese otra palabra"
                value={word2}
                onChange={(e) => setWord2(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="power">Potencia</Label>
              <Input
                id="power"
                type="number"
                min="0"
                placeholder="2"
                value={power}
                onChange={(e) => setPower(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              <Button onClick={validateWord} className="flex items-center gap-1">
                <Check className="h-4 w-4" />
                Validar
              </Button>
              <Button onClick={concatenateWords} className="flex items-center gap-1">
                <Combine className="h-4 w-4" />
                Concatenar
              </Button>
              <Button onClick={reflectWord} className="flex items-center gap-1">
                <ArrowRightLeft className="h-4 w-4" />
                Reflejar
              </Button>
              <Button onClick={powerWord} className="flex items-center gap-1">
                <Repeat className="h-4 w-4" />
                Potencia
              </Button>
              <Button onClick={checkPalindrome} className="flex items-center gap-1">
                <RotateCcw className="h-4 w-4" />
                Palíndromo
              </Button>
              <Button variant="outline" className="flex items-center gap-1">
                <X className="h-4 w-4" />
                Limpiar
              </Button>
            </div>

            {result && (
              <Alert variant={result.valid ? "default" : "destructive"} className="mt-4">
                <AlertTitle>{result.operation}</AlertTitle>
                <AlertDescription className="font-mono">{result.result}</AlertDescription>
              </Alert>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Referencia de Operaciones</CardTitle>
          <CardDescription>Descripción de las operaciones disponibles</CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>Validación</AccordionTrigger>
              <AccordionContent>
                Verifica si una palabra está formada por símbolos del alfabeto definido.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Concatenación</AccordionTrigger>
              <AccordionContent>Une dos palabras para formar una nueva palabra.</AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Reflexión</AccordionTrigger>
              <AccordionContent>Invierte el orden de los símbolos en una palabra.</AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>Potencia</AccordionTrigger>
              <AccordionContent>
                Repite una palabra n veces. La potencia 0 resulta en la palabra vacía.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5">
              <AccordionTrigger>Palíndromo</AccordionTrigger>
              <AccordionContent>Verifica si una palabra es igual a su reflexión.</AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </div>
  )
}
