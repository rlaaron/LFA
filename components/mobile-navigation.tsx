"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlphabetManager } from "@/components/alphabet-manager"
import { WordOperations } from "@/components/word-operations"
import { LanguageOperations } from "@/components/language-operations"
import { GrammarProcessor } from "@/components/grammar-processor"
import { TestCases } from "@/components/test-cases"

export function MobileNavigation() {
  return (
    <Tabs defaultValue="alphabet" className="w-full">
      <TabsList className="grid grid-cols-5 mb-4">
        <TabsTrigger value="alphabet" className="text-xs p-1">
          Alfabetos
        </TabsTrigger>
        <TabsTrigger value="words" className="text-xs p-1">
          Palabras
        </TabsTrigger>
        <TabsTrigger value="languages" className="text-xs p-1">
          Lenguajes
        </TabsTrigger>
        <TabsTrigger value="grammar" className="text-xs p-1">
          Gramáticas
        </TabsTrigger>
        <TabsTrigger value="tests" className="text-xs p-1">
          Pruebas
        </TabsTrigger>
      </TabsList>
      <TabsContent value="alphabet">
        <AlphabetManager />
      </TabsContent>
      <TabsContent value="words">
        <WordOperations />
      </TabsContent>
      <TabsContent value="languages">
        <LanguageOperations />
      </TabsContent>
      <TabsContent value="grammar">
        <GrammarProcessor />
      </TabsContent>
      <TabsContent value="tests">
        <TestCases />
      </TabsContent>
    </Tabs>
  )
}
