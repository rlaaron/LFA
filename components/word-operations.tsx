"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { ArrowRightLeft, Check, Combine, RotateCcw, X, Repeat, Ruler } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useAlphabets } from "@/contexts/AlphabetContext"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { WordService } from "@/lib/services/WordService"
import { Alphabet } from "@/lib/models/Alphabet"

export function WordOperations() {
  const [word1, setWord1] = useState("")
  const [word2, setWord2] = useState("")
  const [selectedAlphabet, setSelectedAlphabet] = useState("Alfabeto 1")
  const [result, setResult] = useState<{ operation: string; result: string; valid: boolean } | null>(null)
  const [power, setPower] = useState("2")
  const [wordService] = useState(() => new WordService())
  const { alphabets } = useAlphabets()

  // Efecto para validar palabras cuando cambia el alfabeto - solo se ejecuta cuando cambia el alfabeto
  useEffect(() => {
    const currentAlphabet = alphabets.find(a => a.name === selectedAlphabet)?.alphabet
    if (!currentAlphabet || !word1) return

    const isValid = wordService.isValid(word1, currentAlphabet)
    if (!isValid) {
      setWord1('')
    }
  }, [selectedAlphabet, alphabets, wordService])

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
    if (!currentAlphabet || !word1 || !word2) return

    const isValid1 = wordService.isValid(word1, currentAlphabet)
    const isValid2 = wordService.isValid(word2, currentAlphabet)

    if (!isValid1 || !isValid2) {
      setResult({
        operation: "Concatenación",
        result: "Una o ambas palabras no son válidas para el alfabeto seleccionado",
        valid: false,
      })
      return
    }

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
    if (!currentAlphabet || !word1) return

    const isValid = wordService.isValid(word1, currentAlphabet)
    if (!isValid) {
      setResult({
        operation: "Reflexión",
        result: "La palabra no es válida para el alfabeto seleccionado",
        valid: false,
      })
      return
    }

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
    if (!currentAlphabet || !word1) return

    const isValid = wordService.isValid(word1, currentAlphabet)
    if (!isValid) {
      setResult({
        operation: "Potencia",
        result: "La palabra no es válida para el alfabeto seleccionado",
        valid: false,
      })
      return
    }

    try {
      const powerNum = Number.parseInt(power)
      if (isNaN(powerNum) || powerNum < 0) {
        setResult({
          operation: "Potencia",
          result: "El exponente debe ser un número entero no negativo",
          valid: false,
        })
        return
      }

      const result = wordService.power(word1, powerNum, currentAlphabet)
      setResult({
        operation: "Potencia",
        result: result,
        valid: true,
      })
    } catch (e) {
      setResult({
        operation: "Potencia",
        result: "Error al calcular la potencia",
        valid: false,
      })
    }
  }

  const checkPalindrome = () => {
    const currentAlphabet = alphabets.find(a => a.name === selectedAlphabet)?.alphabet
    if (!currentAlphabet || !word1) return

    const isValid = wordService.isValid(word1, currentAlphabet)
    if (!isValid) {
      setResult({
        operation: "Palíndromo",
        result: "La palabra no es válida para el alfabeto seleccionado",
        valid: false,
      })
      return
    }

    const isPalindrome = wordService.isPalindrome(word1, currentAlphabet)
    setResult({
      operation: "Palíndromo",
      result: isPalindrome ? "Es palíndromo" : "No es palíndromo",
      valid: isPalindrome,
    })
  }

  const calculateLength = () => {
    const currentAlphabet = alphabets.find(a => a.name === selectedAlphabet)?.alphabet
    if (!currentAlphabet || !word1) return

    const isValid = wordService.isValid(word1, currentAlphabet)
    if (!isValid) {
      setResult({
        operation: "Longitud",
        result: "La palabra no es válida para el alfabeto seleccionado",
        valid: false,
      })
      return
    }

    const wordLength = wordService.length(word1, currentAlphabet)
    setResult({
      operation: "Longitud",
      result: `La longitud de la palabra es: ${wordLength}`,
      valid: true,
    })
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Operaciones con Palabras</CardTitle>
          <CardDescription>Realice operaciones con palabras basadas en el alfabeto definido</CardDescription>
          <div className="flex justify-between items-center mt-4">
            <Label>Alfabeto Seleccionado</Label>
            <Select value={selectedAlphabet} onValueChange={setSelectedAlphabet}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Seleccionar alfabeto">
                  {selectedAlphabet}
                </SelectValue>
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
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid gap-4">
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
                <Button onClick={calculateLength} className="flex items-center gap-1">
                  <Ruler className="h-4 w-4" />
                  Longitud
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setWord1('')
                    setWord2('')
                    setPower('2')
                    setResult(null)
                  }}
                  className="flex items-center gap-1"
                >
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
            <AccordionItem value="item-6">
              <AccordionTrigger>Longitud</AccordionTrigger>
              <AccordionContent>
                Calcula la longitud de una palabra basada en los símbolos del alfabeto. Por ejemplo, si el alfabeto tiene símbolos como "1", "11", "01", la palabra "111" podría tener longitud 2 (interpretada como "11"+"1").
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </div>
  )
}
