"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FlagIcon as Union, Combine, ArrowRightLeft, Minus, RefreshCcw } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LanguageService } from "@/lib/services/LanguageService"
import { Alphabet } from "@/lib/models/Alphabet"

interface AlphabetState {
  name: string;
  alphabet: Alphabet;
}

export function LanguageOperations() {
  const [language1, setLanguage1] = useState("a, ab, abb")
  const [language2, setLanguage2] = useState("b, bb, bbb")
  const [alphabet1, setAlphabet1] = useState("Alfabeto 1")
  const [alphabet2, setAlphabet2] = useState("Alfabeto 1")
  const [result, setResult] = useState<string[]>([])
  const [operation, setOperation] = useState("")
  const [languageService] = useState(() => new LanguageService())
  const [alphabets] = useState<AlphabetState[]>([
    { name: "Alfabeto 1", alphabet: new Alphabet({ a: true, b: true, c: true }) },
    { name: "Alfabeto 2", alphabet: new Alphabet({ x: true, y: true, z: true }) }
  ])

  const performUnion = () => {
    const alph1 = alphabets.find(a => a.name === alphabet1)?.alphabet
    const alph2 = alphabets.find(a => a.name === alphabet2)?.alphabet
    if (!alph1 || !alph2) return

    const words1 = language1.split(",").map(w => w.trim()).filter(Boolean)
    const words2 = language2.split(",").map(w => w.trim()).filter(Boolean)

    const unionResult = languageService.union(words1, words2, alph1, alph2)
    setResult(unionResult)
    setOperation("Unión")
  }

  const performIntersection = () => {
    const alph1 = alphabets.find(a => a.name === alphabet1)?.alphabet
    const alph2 = alphabets.find(a => a.name === alphabet2)?.alphabet
    if (!alph1 || !alph2) return

    const words1 = language1.split(",").map(w => w.trim()).filter(Boolean)
    const words2 = language2.split(",").map(w => w.trim()).filter(Boolean)

    const intersectionResult = languageService.intersection(words1, words2, alph1, alph2)
    setResult(intersectionResult)
    setOperation("Intersección")
  }

  const performDifference = () => {
    const alph1 = alphabets.find(a => a.name === alphabet1)?.alphabet
    const alph2 = alphabets.find(a => a.name === alphabet2)?.alphabet
    if (!alph1 || !alph2) return

    const words1 = language1.split(",").map(w => w.trim()).filter(Boolean)
    const words2 = language2.split(",").map(w => w.trim()).filter(Boolean)

    const differenceResult = languageService.difference(words1, words2, alph1, alph2)
    setResult(differenceResult)
    setOperation("Diferencia")
  }

  const performConcatenation = () => {
    const alph1 = alphabets.find(a => a.name === alphabet1)?.alphabet
    const alph2 = alphabets.find(a => a.name === alphabet2)?.alphabet
    if (!alph1 || !alph2) return

    const words1 = language1.split(",").map(w => w.trim()).filter(Boolean)
    const words2 = language2.split(",").map(w => w.trim()).filter(Boolean)

    const concatenationResult = languageService.concatenation(words1, words2, alph1, alph2)
    setResult(concatenationResult)
    setOperation("Concatenación")
  }

  const performReflection = () => {
    const alph1 = alphabets.find(a => a.name === alphabet1)?.alphabet
    if (!alph1) return

    const words1 = language1.split(",").map(w => w.trim()).filter(Boolean)
    const reflectionResult = languageService.reflection(words1, alph1)
    setResult(reflectionResult)
    setOperation("Reflexión")
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Operaciones con Lenguajes</CardTitle>
          <CardDescription>Realice operaciones entre lenguajes formales</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="input" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="input">Entrada</TabsTrigger>
              <TabsTrigger value="result">Resultado</TabsTrigger>
            </TabsList>
            <TabsContent value="input">
              <div className="space-y-4 mt-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="language1">Lenguaje 1</Label>
                    <Select value={alphabet1} onValueChange={setAlphabet1}>
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
                  <Textarea
                    id="language1"
                    placeholder="Ingrese palabras separadas por comas"
                    value={language1}
                    onChange={(e) => setLanguage1(e.target.value)}
                    className="min-h-[100px]"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="language2">Lenguaje 2</Label>
                    <Select value={alphabet2} onValueChange={setAlphabet2}>
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
                  <Textarea
                    id="language2"
                    placeholder="Ingrese palabras separadas por comas"
                    value={language2}
                    onChange={(e) => setLanguage2(e.target.value)}
                    className="min-h-[100px]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 mt-4">
                  <Button onClick={performUnion} className="flex items-center gap-1">
                    <Union className="h-4 w-4" />
                    Unión
                  </Button>
                  <Button onClick={performIntersection} className="flex items-center gap-1">
                    <RefreshCcw className="h-4 w-4" />
                    Intersección
                  </Button>
                  <Button onClick={performDifference} className="flex items-center gap-1">
                    <Minus className="h-4 w-4" />
                    Diferencia
                  </Button>
                  <Button onClick={performConcatenation} className="flex items-center gap-1">
                    <Combine className="h-4 w-4" />
                    Concatenación
                  </Button>
                  <Button onClick={performReflection} className="flex items-center gap-1">
                    <ArrowRightLeft className="h-4 w-4" />
                    Reflexión
                  </Button>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="result">
              {result.length > 0 && (
                <div className="mt-4">
                  <Alert>
                    <AlertTitle>Resultado de {operation}</AlertTitle>
                    <AlertDescription>
                      <div className="mt-2 p-2 bg-muted rounded-md font-mono text-sm overflow-auto max-h-[300px]">
                        {result.join(", ")}
                      </div>
                    </AlertDescription>
                  </Alert>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
