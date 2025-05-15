"use client"

import { Button } from "@/components/ui/button"
import { SquareIcon as AlphabetSquare, BookText, Code2, FileText, FlaskConical, Braces } from "lucide-react"

export function DesktopNavigation() {
  return (
    <div className="space-y-2">
      <Button variant="ghost" className="w-full justify-start" asChild>
        <a href="#alphabet">
          <AlphabetSquare className="mr-2 h-4 w-4" />
          Alfabetos
        </a>
      </Button>
      <Button variant="ghost" className="w-full justify-start" asChild>
        <a href="#words">
          <BookText className="mr-2 h-4 w-4" />
          Palabras
        </a>
      </Button>
      <Button variant="ghost" className="w-full justify-start" asChild>
        <a href="#languages">
          <FileText className="mr-2 h-4 w-4" />
          Lenguajes
        </a>
      </Button>
      <Button variant="ghost" className="w-full justify-start" asChild>
        <a href="#grammar">
          <Code2 className="mr-2 h-4 w-4" />
          Gramáticas
        </a>
      </Button>
      <Button variant="ghost" className="w-full justify-start" asChild>
        <a href="#tests">
          <FlaskConical className="mr-2 h-4 w-4" />
          Pruebas
        </a>
      </Button>
      <Button variant="ghost" className="w-full justify-start" asChild>
        <a href="#morse">
          <Braces className="mr-2 h-4 w-4" />
          Código Morse
        </a>
      </Button>
    </div>
  )
}
