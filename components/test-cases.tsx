"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Play, Check, X, AlertTriangle, Clock } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { ScrollArea } from "@/components/ui/scroll-area"

type TestCase = {
  id: string
  name: string
  description: string
  input: string
  expectedOutput: string
  status: "pending" | "passed" | "failed" | "running"
  time?: number
}

export function TestCases() {
  const [activeTab, setActiveTab] = useState("basic")
  const [progress, setProgress] = useState(0)
  const [running, setRunning] = useState(false)

  const [testCases, setTestCases] = useState<Record<string, TestCase[]>>({
    basic: [
      {
        id: "b1",
        name: "Validación de pares binarios",
        description: "Validar palabras formadas por pares binarios ('00', '01', '10', '11')",
        input: "001011",
        expectedOutput: "Válido",
        status: "pending",
      },
      {
        id: "b2",
        name: "Reflexión de palabras binarias",
        description: "Probar la reflexión de palabras binarias",
        input: "001011",
        expectedOutput: "110100",
        status: "pending",
      },
      {
        id: "b3",
        name: "Caso inválido",
        description: "Detectar errores comunes",
        input: "0010111",
        expectedOutput: "Inválido",
        status: "pending",
      },
    ],
    intermediate: [
      {
        id: "i1",
        name: "Símbolos de longitud variable",
        description: "Alfabeto con símbolos de diferentes longitudes ('a', 'bb', 'ccc', 'dddd')",
        input: "abbcccdddd",
        expectedOutput: "Válido",
        status: "pending",
      },
      {
        id: "i2",
        name: "Combinaciones complejas",
        description: "Validación de combinaciones complejas",
        input: "abbcccddddabbccc",
        expectedOutput: "Válido",
        status: "pending",
      },
    ],
    advanced: [
      {
        id: "a1",
        name: "Símbolos compuestos",
        description: "Alfabeto con símbolos compuestos ('++', '+-+', '-+-', '---', '++++', '----')",
        input: "+++-+---",
        expectedOutput: "Válido",
        status: "pending",
      },
      {
        id: "a2",
        name: "Palíndromos complejos",
        description: "Verificación de palíndromos con símbolos compuestos",
        input: "+-+---+-+",
        expectedOutput: "Es palíndromo",
        status: "pending",
      },
    ],
    extreme: [
      {
        id: "e1",
        name: "Palabras extremadamente largas",
        description: "Manejo de palabras extremadamente largas",
        input: "a".repeat(1000),
        expectedOutput: "Válido",
        status: "pending",
      },
      {
        id: "e2",
        name: "Casos ambiguos",
        description: "Análisis de casos ambiguos con múltiples interpretaciones posibles",
        input: "abababab",
        expectedOutput: "Múltiples interpretaciones",
        status: "pending",
      },
    ],
    special: [
      {
        id: "s1",
        name: "Palabra vacía",
        description: "Manejo de palabra vacía",
        input: "",
        expectedOutput: "Válido",
        status: "pending",
      },
      {
        id: "s2",
        name: "Símbolos Unicode",
        description: "Soporte para símbolos Unicode (emojis y caracteres especiales)",
        input: "🙂👍🎉",
        expectedOutput: "Válido",
        status: "pending",
      },
    ],
  })

  const runTests = (category: string) => {
    setRunning(true)
    setProgress(0)

    // Resetear estados
    const resetTests = { ...testCases }
    resetTests[category] = resetTests[category].map((test) => ({ ...test, status: "pending", time: undefined }))
    setTestCases(resetTests)

    // Simulación de ejecución de pruebas
    const totalTests = testCases[category].length
    let completedTests = 0

    const runNextTest = (index: number) => {
      if (index >= totalTests) {
        setRunning(false)
        setProgress(100)
        return
      }

      // Actualizar estado a "running"
      const updatedTests = { ...testCases }
      updatedTests[category][index] = { ...updatedTests[category][index], status: "running" }
      setTestCases(updatedTests)

      // Simular tiempo de ejecución
      const executionTime = Math.random() * 1000 + 500

      setTimeout(() => {
        // Simular resultado (80% de probabilidad de éxito)
        const success = Math.random() > 0.2
        const time = Math.round(executionTime)

        const finalTests = { ...testCases }
        finalTests[category][index] = {
          ...finalTests[category][index],
          status: success ? "passed" : "failed",
          time,
        }
        setTestCases(finalTests)

        completedTests++
        setProgress(Math.round((completedTests / totalTests) * 100))

        // Ejecutar siguiente prueba
        runNextTest(index + 1)
      }, executionTime)
    }

    // Iniciar ejecución
    runNextTest(0)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "passed":
        return <Check className="h-4 w-4 text-green-500" />
      case "failed":
        return <X className="h-4 w-4 text-red-500" />
      case "running":
        return <Clock className="h-4 w-4 text-yellow-500 animate-spin" />
      default:
        return <AlertTriangle className="h-4 w-4 text-muted-foreground" />
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Casos de Prueba</CardTitle>
          <CardDescription>
            Ejecute pruebas para verificar el funcionamiento del procesador de lenguajes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-3 md:grid-cols-5 mb-4">
              <TabsTrigger value="basic">Básicas</TabsTrigger>
              <TabsTrigger value="intermediate">Intermedias</TabsTrigger>
              <TabsTrigger value="advanced">Avanzadas</TabsTrigger>
              <TabsTrigger value="extreme">Extremas</TabsTrigger>
              <TabsTrigger value="special">Especiales</TabsTrigger>
            </TabsList>

            {Object.keys(testCases).map((category) => (
              <TabsContent key={category} value={category}>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium">
                      Pruebas{" "}
                      {category === "basic"
                        ? "Básicas"
                        : category === "intermediate"
                          ? "Intermedias"
                          : category === "advanced"
                            ? "Avanzadas"
                            : category === "extreme"
                              ? "Extremas"
                              : "Especiales"}
                    </h3>
                    <Button onClick={() => runTests(category)} disabled={running}>
                      <Play className="h-4 w-4 mr-2" />
                      Ejecutar pruebas
                    </Button>
                  </div>

                  {running && category === activeTab && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progreso</span>
                        <span>{progress}%</span>
                      </div>
                      <Progress value={progress} />
                    </div>
                  )}

                  <ScrollArea className="h-[400px] border rounded-md">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[50px]">Estado</TableHead>
                          <TableHead>Nombre</TableHead>
                          <TableHead className="hidden md:table-cell">Descripción</TableHead>
                          <TableHead className="hidden md:table-cell">Entrada</TableHead>
                          <TableHead className="hidden md:table-cell">Salida esperada</TableHead>
                          <TableHead className="w-[100px] text-right">Tiempo</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {testCases[category].map((test) => (
                          <TableRow key={test.id}>
                            <TableCell>{getStatusIcon(test.status)}</TableCell>
                            <TableCell className="font-medium">
                              <div>{test.name}</div>
                              <div className="md:hidden text-xs text-muted-foreground mt-1">{test.description}</div>
                            </TableCell>
                            <TableCell className="hidden md:table-cell">{test.description}</TableCell>
                            <TableCell className="hidden md:table-cell font-mono text-xs">
                              {test.input.length > 20 ? test.input.substring(0, 20) + "..." : test.input}
                            </TableCell>
                            <TableCell className="hidden md:table-cell">{test.expectedOutput}</TableCell>
                            <TableCell className="text-right">{test.time ? `${test.time}ms` : "-"}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </ScrollArea>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
