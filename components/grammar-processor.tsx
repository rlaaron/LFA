"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Play, Plus, Trash2, Upload, Download, RefreshCw } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"

export function GrammarProcessor() {
  const [rules, setRules] = useState([
    { nonTerminal: "S", productions: ["aS", "bS", "ε"] },
    { nonTerminal: "A", productions: ["aA", "bAb", "ε"] },
  ])
  const [newNonTerminal, setNewNonTerminal] = useState("")
  const [newProductions, setNewProductions] = useState("")
  const [startSymbol, setStartSymbol] = useState("S")
  const [generatedWords, setGeneratedWords] = useState<string[]>([])

  const addRule = () => {
    if (newNonTerminal && newProductions) {
      const productions = newProductions.split(",").map((p) => p.trim())
      setRules([...rules, { nonTerminal: newNonTerminal, productions }])
      setNewNonTerminal("")
      setNewProductions("")
    }
  }

  const removeRule = (index: number) => {
    const newRules = [...rules]
    newRules.splice(index, 1)
    setRules(newRules)
  }

  const generateWords = () => {
    // Simulación de generación de palabras
    // En una implementación real, esto usaría un algoritmo para expandir la gramática
    const simulatedWords = ["a", "b", "aa", "ab", "ba", "bb", "aaa", "aab", "aba", "abb", "baa", "bab", "bba", "bbb"]
    setGeneratedWords(simulatedWords)
  }

  const generateRandomWord = () => {
    // Simulación de generación aleatoria
    const randomWords = ["aabbb", "bababa", "aaa", "bbb", "abababab"]
    const randomIndex = Math.floor(Math.random() * randomWords.length)
    setGeneratedWords([randomWords[randomIndex]])
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Procesamiento de Gramáticas</CardTitle>
          <CardDescription>Defina reglas de producción y genere palabras válidas</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="start-symbol">Símbolo inicial</Label>
              <Input
                id="start-symbol"
                placeholder="S"
                value={startSymbol}
                onChange={(e) => setStartSymbol(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label>Reglas de producción</Label>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Upload className="h-4 w-4 mr-1" />
                    Importar
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-1" />
                    Exportar
                  </Button>
                </div>
              </div>

              <div className="border rounded-md">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>No Terminal</TableHead>
                      <TableHead>Producciones</TableHead>
                      <TableHead className="w-[100px]">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {rules.map((rule, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{rule.nonTerminal}</TableCell>
                        <TableCell>{rule.productions.join(" | ")}</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="icon" onClick={() => removeRule(index)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="new-non-terminal">Nuevo no terminal</Label>
                <Input
                  id="new-non-terminal"
                  placeholder="B"
                  value={newNonTerminal}
                  onChange={(e) => setNewNonTerminal(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-productions">Producciones (separadas por coma)</Label>
                <Input
                  id="new-productions"
                  placeholder="aB, bB, ε"
                  value={newProductions}
                  onChange={(e) => setNewProductions(e.target.value)}
                />
              </div>
            </div>

            <Button onClick={addRule} className="w-full">
              <Plus className="h-4 w-4 mr-2" />
              Agregar regla
            </Button>

            <div className="flex gap-2 mt-4">
              <Button onClick={generateWords} className="flex-1">
                <Play className="h-4 w-4 mr-2" />
                Generar palabras
              </Button>
              <Button onClick={generateRandomWord} variant="outline" className="flex-1">
                <RefreshCw className="h-4 w-4 mr-2" />
                Palabra aleatoria
              </Button>
            </div>

            {generatedWords.length > 0 && (
              <div className="mt-4">
                <Label>Palabras generadas:</Label>
                <ScrollArea className="h-[200px] border rounded-md p-4 mt-2">
                  <div className="space-y-2">
                    {generatedWords.map((word, index) => (
                      <div key={index} className="p-2 bg-muted rounded-md font-mono">
                        {word === "ε" ? <em>ε (palabra vacía)</em> : word}
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
