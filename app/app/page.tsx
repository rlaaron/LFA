import { MobileNavigation } from "@/components/mobile-navigation"
import { DesktopNavigation } from "@/components/desktop-navigation"
import { ThemeToggle } from "@/components/theme-toggle"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { AlphabetManager } from "@/components/alphabet-manager"
import { WordOperations } from "@/components/word-operations"
import { LanguageOperations } from "@/components/language-operations"
import { GrammarProcessor } from "@/components/grammar-processor"
import { TestCases } from "@/components/test-cases"
import { MorseCodeTranslator } from "@/components/morse-code-translator"

export default function AppPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6">
        <header className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Procesador de Lenguajes</h1>
          <div className="flex items-center gap-4">
            <ThemeToggle />
          </div>
        </header>

        <div className="md:hidden">
          <MobileNavigation />
        </div>

        <div className="hidden md:flex md:gap-6">
          <aside className="w-64 shrink-0">
            <DesktopNavigation />
          </aside>
          <div className="flex-1">
            <Tabs defaultValue="alphabet" className="w-full">
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
              <TabsContent value="morse">
                <MorseCodeTranslator />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </main>
  )
}
