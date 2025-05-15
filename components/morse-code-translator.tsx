"use client"

import { useState, useRef, ChangeEvent } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Upload, Braces, FileText, ChevronDown, ChevronUp } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { translateMorseCode } from "@/lib/morse-translator"

// Test examples organized by difficulty level
const TEST_EXAMPLES = {
  easy: [
    { morse: ".- .-.. .", translation: "ALE" },
    { morse: "... --- ...", translation: "SOS (señal de auxilio)" },
    { morse: ".... --- .-.. .-", translation: "HOLA" },
  ],
  intermediate: [
    { morse: ".- ..- -.. .. ---   -.-. --- -- . .-.", translation: "AUDIO COMER" },
    { morse: ". .-..   -- .- .-.   . ...   .- -- .- .-. .. .-.. .-.. ---", translation: "EL MAR ES AMARILLO" },
    { morse: "..- -. .-   ..-. .-.. --- .-.   .--. .- .-. .-   -- ..", translation: "UNA FLOR PARA MI" },
  ],
  advanced: [
    { morse: ".-.. .-   .--. .- -.. .-. .   . ... -.-. .-. .. -... .. ---   . -.   .-.. .-   .- .-. . -. .-", translation: "LA PADRE ESCRIBIO EN LA ARENA" },
    { morse: ".--. .-. .. -- . .-. ---   ... .-.. .- ...- .-   .-.. .. -... . .-. .-   . -.   .---- ---.. ..--- ..---", translation: "PRIMERO SLAVA LIBERA EN 1822" },
    { morse: "-.-. --- -.. .. --. ---   -- --- .-. ... .   . ...   ..- -.   .-.. . -. --. ..- .- .--- .   ..- -. .. ...- . .-. ... .- .-..", translation: "CODIGO MORSE ES UN LENGUAJE UNIVERSAL" },
  ],
  bonus: [
    { morse: "..--- ----- ..--- ....-   .---- ...-- --...   ..--.. -.-.--", translation: "2024 137 ?!" },
    { morse: ".--. .- .-. .   -.. . ... -.-. .. ..-. .-. .- .-.   . ... - .   -- . -. ... .- .--- .", translation: "PARE DESCIFRAR ESTE MENSAJE" },
  ]
};

export function MorseCodeTranslator() {
  const [morseInput, setMorseInput] = useState<string>("");
  const [translatedText, setTranslatedText] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Translate Morse code to text
  const translateMorse = () => {
    if (!morseInput.trim()) {
      setError("Por favor ingresa código morse para traducir");
      return;
    }

    setError(null);
    try {
      const result = translateMorseCode(morseInput);
      setTranslatedText(result);
    } catch (err) {
      setError("Error al traducir el código morse");
      console.error(err);
    }
  };

  // Handle file upload
  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      setMorseInput(prev => prev ? `${prev}\n${content}` : content);
    };
    reader.onerror = () => {
      setError("Error al leer el archivo");
    };
    reader.readAsText(file);
    
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Trigger file input click
  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };

  // Load example to input field
  const loadExample = (morse: string) => {
    setMorseInput(morse);
    setError(null);
    setTranslatedText("");
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Braces className="h-5 w-5" />
          Traductor de Código Morse
        </CardTitle>
        <CardDescription>
          Traduce código morse a texto. Usa punto (.) para puntos, guión (-) para rayas, 
          espacio para separar letras y tres espacios para separar palabras.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Input area */}
        <div className="space-y-2">
          <label htmlFor="morse-input" className="text-sm font-medium">
            Código Morse
          </label>
          <Textarea
            id="morse-input"
            placeholder="Ingresa código morse (ej: .... --- .-.. .-)"
            value={morseInput}
            onChange={(e) => setMorseInput(e.target.value)}
            className="min-h-[100px]"
          />
        </div>

        {/* File upload */}
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            type="button" 
            onClick={triggerFileUpload}
            className="flex items-center gap-2"
          >
            <Upload className="h-4 w-4" />
            Importar archivo
          </Button>
          <Input
            ref={fileInputRef}
            type="file"
            accept=".txt,.morse"
            onChange={handleFileUpload}
            className="hidden"
          />
          <span className="text-xs text-muted-foreground">
            Formatos soportados: .txt, .morse
          </span>
        </div>

        {/* Translate button */}
        <Button 
          onClick={translateMorse} 
          className="w-full"
        >
          Traducir a Español
        </Button>

        {/* Error message */}
        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Result area */}
        {translatedText && (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              <h3 className="text-sm font-medium">Resultado:</h3>
            </div>
            <div className="p-4 rounded-md bg-muted/50 break-words">
              {translatedText}
            </div>
          </div>
        )}
        
        {/* Examples section */}
        <div className="mt-8 border-t pt-4">
          <h3 className="text-lg font-medium mb-2">Ejemplos para probar</h3>
          <p className="text-sm text-muted-foreground mb-4">Haz clic en cualquier ejemplo para cargarlo en el traductor</p>
          
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="easy">
              <AccordionTrigger className="text-sm font-medium">
                Nivel Fácil (Palabras cortas)
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2">
                  {TEST_EXAMPLES.easy.map((example, index) => (
                    <div key={`easy-${index}`} className="p-2 rounded-md hover:bg-muted/50 cursor-pointer" onClick={() => loadExample(example.morse)}>
                      <div className="text-sm font-mono">{example.morse}</div>
                      <div className="text-xs text-muted-foreground">Traducción: "{example.translation}"</div>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="intermediate">
              <AccordionTrigger className="text-sm font-medium">
                Nivel Intermedio (Frases simples)
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2">
                  {TEST_EXAMPLES.intermediate.map((example, index) => (
                    <div key={`intermediate-${index}`} className="p-2 rounded-md hover:bg-muted/50 cursor-pointer" onClick={() => loadExample(example.morse)}>
                      <div className="text-sm font-mono">{example.morse}</div>
                      <div className="text-xs text-muted-foreground">Traducción: "{example.translation}"</div>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="advanced">
              <AccordionTrigger className="text-sm font-medium">
                Nivel Avanzado (Frases más largas y complejas)
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2">
                  {TEST_EXAMPLES.advanced.map((example, index) => (
                    <div key={`advanced-${index}`} className="p-2 rounded-md hover:bg-muted/50 cursor-pointer" onClick={() => loadExample(example.morse)}>
                      <div className="text-sm font-mono">{example.morse}</div>
                      <div className="text-xs text-muted-foreground">Traducción: "{example.translation}"</div>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="bonus">
              <AccordionTrigger className="text-sm font-medium">
                Bonus (Números y signos)
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2">
                  {TEST_EXAMPLES.bonus.map((example, index) => (
                    <div key={`bonus-${index}`} className="p-2 rounded-md hover:bg-muted/50 cursor-pointer" onClick={() => loadExample(example.morse)}>
                      <div className="text-sm font-mono">{example.morse}</div>
                      <div className="text-xs text-muted-foreground">Traducción: "{example.translation}"</div>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        
        {/* Theoretical section explaining the relationship with formal languages and automata */}
        <div className="mt-8 border-t pt-4">
          <h3 className="text-lg font-medium mb-2">Código Morse y Lenguajes Formales</h3>
          
          <div className="space-y-4 text-sm">
            <p>
              El código Morse representa un <strong>lenguaje formal</strong> con su propio alfabeto y reglas de formación.
              Desde la perspectiva de la teoría de lenguajes formales, podemos analizar el código Morse de la siguiente manera:
            </p>
            
            <div className="pl-4 border-l-2 border-primary/30 space-y-2">
              <p><strong>Alfabeto (Σ):</strong> El alfabeto del código Morse está compuesto por tres símbolos básicos:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Punto (.): Señal corta</li>
                <li>Raya (-): Señal larga</li>
                <li>Espacio: Separador entre símbolos, letras y palabras</li>
              </ul>
            </div>
            
            <p>
              <strong>Gramática:</strong> El código Morse sigue una gramática regular que puede ser representada mediante
              expresiones regulares, lo que lo clasifica como un <strong>lenguaje regular</strong> dentro de la jerarquía de Chomsky.
            </p>
            
            <p>
              <strong>Autómata Finito:</strong> La traducción de código Morse puede modelarse como un autómata finito determinista (AFD)
              donde:
            </p>
            
            <div className="pl-4 border-l-2 border-primary/30 space-y-2">
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Estados (Q):</strong> Representan las secuencias parciales de puntos y rayas</li>
                <li><strong>Estado inicial (q₀):</strong> El estado vacío antes de procesar cualquier símbolo</li>
                <li><strong>Estados finales (F):</strong> Estados que corresponden a caracteres válidos del alfabeto latino</li>
                <li><strong>Función de transición (δ):</strong> Define cómo se mueve el autómata al recibir un punto, una raya o un espacio</li>
              </ul>
            </div>
            
            <p>
              Por ejemplo, al procesar la secuencia ".-" (que representa la letra "A"), el autómata sigue este camino:
            </p>
            
            <div className="p-3 bg-muted/30 rounded-md font-mono text-xs">
              q₀ --(.)--> q₁ --(-)--> q₂ [Estado final que representa "A"]
            </div>
            
            <p>
              <strong>Relación con el Procesador de Lenguajes:</strong> Este traductor de código Morse complementa las
              funcionalidades del procesador de lenguajes al ilustrar un caso práctico de reconocimiento y traducción de un
              lenguaje formal. Mientras que otras secciones de la aplicación se centran en operaciones abstractas con alfabetos
              y lenguajes, el traductor de Morse muestra cómo estos conceptos teóricos se aplican en un sistema de comunicación real.
            </p>
            
            <p>
              El proceso de traducción implementado en esta aplicación sigue un enfoque similar al de un analizador léxico
              (lexer) que reconoce tokens (secuencias de puntos y rayas) y los mapea a símbolos del alfabeto latino,
              demostrando conceptos fundamentales de la teoría de compiladores.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
