"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, X, Upload, Download } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alphabet } from "@/lib/models/Alphabet"

// Using AlphabetState from context
import { AlphabetState, useAlphabets } from "@/contexts/AlphabetContext"

export function AlphabetManager() {
  const { alphabets, setAlphabets } = useAlphabets()
  const [selectedAlphabet, setSelectedAlphabet] = useState("Alfabeto 1")
  const [showNewAlphabetDialog, setShowNewAlphabetDialog] = useState(false)
  const [newAlphabetName, setNewAlphabetName] = useState("")
  const [newSymbol, setNewSymbol] = useState("")
  const [jsonConfig, setJsonConfig] = useState("")
  const [symbolToCheck, setSymbolToCheck] = useState("")
  const [symbolBelongs, setSymbolBelongs] = useState<boolean | null>(null)
  const [verifiedSymbol, setVerifiedSymbol] = useState("")

  useEffect(() => {
    const currentAlphabet = alphabets.find(a => a.name === selectedAlphabet)
    if (currentAlphabet) {
      setJsonConfig(JSON.stringify({ symbols: currentAlphabet.alphabet.getSymbols() }, null, 2))
    }
  }, [selectedAlphabet, alphabets])

  const createNewAlphabet = () => {
    if (newAlphabetName.trim() && !alphabets.some(a => a.name === newAlphabetName.trim())) {
      const newAlphabetState = {
        name: newAlphabetName.trim(),
        alphabet: new Alphabet({})
      }
      setAlphabets([...alphabets, newAlphabetState])
      setSelectedAlphabet(newAlphabetName.trim())
      setNewAlphabetName("")
      setShowNewAlphabetDialog(false)
    }
  }

  const addSymbol = () => {
    if (!newSymbol) return;
    
    const currentAlphabetIndex = alphabets.findIndex(a => a.name === selectedAlphabet)
    if (currentAlphabetIndex === -1) return;

    const updatedAlphabets = [...alphabets]
    const currentAlphabet = updatedAlphabets[currentAlphabetIndex]
    
    if (!currentAlphabet.alphabet.hasSymbol(newSymbol)) {
      currentAlphabet.alphabet.addSymbol(newSymbol)
      setAlphabets(updatedAlphabets)
      setNewSymbol("")
    }
  }

  const removeSymbol = (symbol: string) => {
    const currentAlphabetIndex = alphabets.findIndex(a => a.name === selectedAlphabet)
    if (currentAlphabetIndex === -1) return;

    const updatedAlphabets = [...alphabets]
    const currentAlphabet = updatedAlphabets[currentAlphabetIndex]
    
    currentAlphabet.alphabet.removeSymbol(symbol)
    setAlphabets(updatedAlphabets)
  }

  const updateJsonConfig = (json: string) => {
    try {
      const jsonObj = JSON.parse(json)
      const currentAlphabetIndex = alphabets.findIndex(a => a.name === selectedAlphabet)
      if (currentAlphabetIndex === -1) return;

      const updatedAlphabets = [...alphabets]
      updatedAlphabets[currentAlphabetIndex].alphabet = new Alphabet(jsonObj.symbols)
      setAlphabets(updatedAlphabets)
      setJsonConfig(json)
    } catch (e) {
      // Error al parsear JSON
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <CardTitle>Manejo de Alfabetos</CardTitle>
              <CardDescription>Agregue, elimine y gestione los símbolos de su alfabeto</CardDescription>
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
              <Button variant="outline" size="icon" onClick={() => setShowNewAlphabetDialog(true)}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <div className="flex gap-2">
              <Input placeholder="Nuevo símbolo" value={newSymbol} onChange={(e) => setNewSymbol(e.target.value)} />
              <Button onClick={addSymbol}>
                <Plus className="h-4 w-4 mr-2" />
                Agregar
              </Button>
            </div>

            <div className="mt-4">
              <h3 className="text-sm font-medium mb-2">Símbolos actuales:</h3>
              <div className="flex flex-wrap gap-2">
                {alphabets
                  .find(a => a.name === selectedAlphabet)
                  ?.alphabet.getSymbols() &&
                  Object.entries(alphabets.find(a => a.name === selectedAlphabet)?.alphabet.getSymbols() || {})
                    .filter(([_, value]) => value)
                    .map(([symbol]) => (
                      <Badge key={symbol} variant="secondary" className="flex items-center gap-1">
                        {symbol}
                        <button onClick={() => removeSymbol(symbol)} className="ml-1 rounded-full hover:bg-muted p-0.5">
                          <X className="h-3 w-3" />
                          <span className="sr-only">Eliminar</span>
                        </button>
                      </Badge>
                    ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Configuración JSON</CardTitle>
          <CardDescription>Edite la configuración del alfabeto en formato JSON</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label htmlFor="json-config">Configuración JSON</Label>
            <Textarea
              id="json-config"
              value={jsonConfig}
              onChange={(e) => updateJsonConfig(e.target.value)}
              className="font-mono text-sm h-40"
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">
            <Upload className="h-4 w-4 mr-2" />
            Importar
          </Button>
          <Button>
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Operaciones con Alfabetos</CardTitle>
          <CardDescription>Combine alfabetos y verifique pertenencia de símbolos</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="check-symbol">Verificar pertenencia</Label>
              <div className="flex gap-2 mt-1">
                <Input 
                  id="check-symbol" 
                  placeholder="Símbolo a verificar" 
                  value={symbolToCheck}
                  onChange={(e) => setSymbolToCheck(e.target.value)}
                />
                <Button onClick={() => {
                  const currentAlphabet = alphabets.find(a => a.name === selectedAlphabet);
                  if (currentAlphabet && symbolToCheck) {
                    setSymbolBelongs(currentAlphabet.alphabet.hasSymbol(symbolToCheck));
                    setVerifiedSymbol(symbolToCheck);
                  }
                }}>Verificar</Button>
              </div>
              {symbolBelongs !== null && (
                <div className={`mt-2 p-2 rounded ${symbolBelongs ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {symbolBelongs 
                    ? `El símbolo '${verifiedSymbol}' pertenece al alfabeto ${selectedAlphabet}` 
                    : `El símbolo '${verifiedSymbol}' no pertenece al alfabeto ${selectedAlphabet}`}
                </div>
              )}
            </div>

            <div>
              <Label>Combinar con otro alfabeto</Label>
              <div className="flex gap-2 mt-1">
                <Input placeholder="Símbolos separados por coma" />
                <Button>Combinar</Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {showNewAlphabetDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-background p-6 rounded-lg w-full max-w-md">
            <h3 className="text-lg font-medium mb-4">Crear nuevo alfabeto</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="new-alphabet-name">Nombre del alfabeto</Label>
                <Input
                  id="new-alphabet-name"
                  value={newAlphabetName}
                  onChange={(e) => setNewAlphabetName(e.target.value)}
                  placeholder="Ej: Alfabeto Binario"
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setShowNewAlphabetDialog(false)}>
                  Cancelar
                </Button>
                <Button onClick={createNewAlphabet}>Crear</Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
