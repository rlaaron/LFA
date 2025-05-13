"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowRightLeft, Check, X } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export function InteractiveDemo() {
  const [word, setWord] = useState("")
  const [result, setResult] = useState<{ operation: string; result: string; valid: boolean } | null>(null)
  const [alphabet] = useState(["a", "b", "c"])
  const [animation, setAnimation] = useState("")

  const validateWord = () => {
    const isValid = word.split("").every(char => alphabet.includes(char))
    setResult({
      operation: "Validación",
      result: word,
      valid: isValid,
    })
    setAnimation("validate")
    setTimeout(() => setAnimation(""), 1000)
  }

  const reflectWord = () => {
    if (!word) return
    
    const isValid = word.split("").every(char => alphabet.includes(char))
    if (!isValid) {
      setResult({
        operation: "Reflexión",
        result: "La palabra no es válida para el alfabeto",
        valid: false,
      })
      return
    }
    
    const reflected = word.split("").reverse().join("")
    setResult({
      operation: "Reflexión",
      result: reflected,
      valid: true,
    })
    setAnimation("reflect")
    setTimeout(() => setAnimation(""), 1000)
  }

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-4 space-y-4">
        <div className="text-center mb-2">
          <p className="text-sm font-medium">Prueba una mini-demostración</p>
          <p className="text-xs text-muted-foreground">Alfabeto disponible: {alphabet.join(", ")}</p>
        </div>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="demo-word">Palabra</Label>
            <Input
              id="demo-word"
              placeholder="Ingrese una palabra (a, b, c)"
              value={word}
              onChange={(e) => setWord(e.target.value)}
              className={`transition-all duration-300 ${animation === "validate" ? "bg-primary/10" : ""} ${animation === "reflect" ? "bg-secondary/10" : ""}`}
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Button 
              onClick={validateWord} 
              className="flex items-center gap-1 transition-transform hover:scale-105"
              variant="outline"
            >
              <Check className="h-4 w-4" />
              Validar
            </Button>
            <Button 
              onClick={reflectWord} 
              className="flex items-center gap-1 transition-transform hover:scale-105"
              variant="outline"
            >
              <ArrowRightLeft className="h-4 w-4" />
              Reflejar
            </Button>
          </div>

          {result && (
            <Alert variant={result.valid ? "default" : "destructive"} className="mt-4 animate-in fade-in slide-in-from-bottom-5 duration-300">
              <AlertTitle>{result.operation}</AlertTitle>
              <AlertDescription className="font-mono">{result.result}</AlertDescription>
            </Alert>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
