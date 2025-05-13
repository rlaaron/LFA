"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Check, Github, ArrowRightCircle, BookOpen, Code, Lightbulb, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { InteractiveDemo } from "./components/interactive-demo"
import { FeatureCarousel } from "./components/feature-carousel"
import { AnimatedBackground } from "./components/animated-background"
import { Testimonials } from "./components/testimonials"

export default function Home() {
  const [scrollY, setScrollY] = useState(0)
  const [showScrollHint, setShowScrollHint] = useState(true)
  
  // Detectar scroll para efectos visuales
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
      if (window.scrollY > 100) {
        setShowScrollHint(false)
      }
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  return (
    <main className="min-h-screen bg-background relative overflow-hidden">
      {/* Fondo animado con símbolos matemáticos */}
      <AnimatedBackground />
      
      <div className="container mx-auto px-4 py-6 space-y-12 max-w-md relative z-10">
        {/* Hero Section con animación */}
        <section className="text-center space-y-6 py-10">
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="inline-block p-1 bg-primary/10 rounded-full mb-2">
              <div className="bg-primary/20 px-3 py-1 rounded-full">
                <span className="text-xs font-medium">Versión 1.0</span>
              </div>
            </div>
            
            <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Procesador de Lenguajes
            </h1>
            
            <p className="text-muted-foreground">
              Una herramienta interactiva para trabajar con lenguajes formales, autómatas y gramáticas
            </p>
            
            <Link href="/app" className="block">
              <Button 
                className="mt-4 w-full transition-all duration-300 hover:scale-105 hover:shadow-md" 
                size="lg"
              >
                Iniciar Aplicación <ArrowRightCircle className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          
          {/* Indicador de scroll */}
          {showScrollHint && (
            <div className="animate-bounce mt-8 opacity-70 transition-opacity duration-500">
              <ChevronDown className="mx-auto h-6 w-6" />
              <span className="text-xs">Desliza para explorar</span>
            </div>
          )}
        </section>

        {/* Demo interactiva */}
        <section className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
          <h2 className="text-2xl font-semibold text-center mb-6">Pruébalo tú mismo</h2>
          <InteractiveDemo />
        </section>

        {/* Carrusel de características */}
        <section className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-500">
          <h2 className="text-2xl font-semibold text-center mb-6">Explora las funcionalidades</h2>
          <FeatureCarousel />
        </section>

        {/* Features Section con animación al scroll */}
        <section 
          className={`space-y-6 transition-all duration-700 ${
            scrollY > 200 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="text-2xl font-semibold text-center">¿Qué puedes hacer?</h2>
          
          <div className="grid gap-4">
            <Card className="overflow-hidden border-primary/10 hover:border-primary/30 transition-all duration-300 hover:shadow-md">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <Check className="h-4 w-4 text-primary" />
                  </div>
                  Trabajar con Alfabetos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Crear y gestionar alfabetos personalizados para definir lenguajes formales.
                </p>
              </CardContent>
            </Card>
            
            <Card className="overflow-hidden border-primary/10 hover:border-primary/30 transition-all duration-300 hover:shadow-md">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <Check className="h-4 w-4 text-primary" />
                  </div>
                  Operaciones con Palabras
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Validar, concatenar, reflejar, calcular potencias y verificar palíndromos.
                </p>
              </CardContent>
            </Card>
            
            <Card className="overflow-hidden border-primary/10 hover:border-primary/30 transition-all duration-300 hover:shadow-md">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <Check className="h-4 w-4 text-primary" />
                  </div>
                  Operaciones con Lenguajes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Unión, intersección, complemento y otras operaciones con lenguajes formales.
                </p>
              </CardContent>
            </Card>
            
            <Card className="overflow-hidden border-primary/10 hover:border-primary/30 transition-all duration-300 hover:shadow-md">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <Check className="h-4 w-4 text-primary" />
                  </div>
                  Gramáticas Formales
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Definir, analizar y trabajar con gramáticas formales de distintos tipos.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* How to Use Section con animación al scroll */}
        <section 
          className={`space-y-6 transition-all duration-700 ${
            scrollY > 600 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="text-2xl font-semibold text-center">Guía de Uso</h2>
          
          <div className="space-y-4">
            <div className="flex gap-3 hover:bg-muted/50 p-2 rounded-lg transition-colors">
              <div className="bg-gradient-to-br from-primary to-primary/70 rounded-full h-8 w-8 flex items-center justify-center shrink-0">
                <span className="text-white font-medium">1</span>
              </div>
              <div>
                <h3 className="font-medium">Define tu Alfabeto</h3>
                <p className="text-sm text-muted-foreground">
                  Comienza creando un alfabeto con los símbolos que necesitas.
                </p>
              </div>
            </div>
            
            <div className="flex gap-3 hover:bg-muted/50 p-2 rounded-lg transition-colors">
              <div className="bg-gradient-to-br from-primary to-primary/70 rounded-full h-8 w-8 flex items-center justify-center shrink-0">
                <span className="text-white font-medium">2</span>
              </div>
              <div>
                <h3 className="font-medium">Crea Palabras y Lenguajes</h3>
                <p className="text-sm text-muted-foreground">
                  Usa tu alfabeto para crear palabras y definir lenguajes formales.
                </p>
              </div>
            </div>
            
            <div className="flex gap-3 hover:bg-muted/50 p-2 rounded-lg transition-colors">
              <div className="bg-gradient-to-br from-primary to-primary/70 rounded-full h-8 w-8 flex items-center justify-center shrink-0">
                <span className="text-white font-medium">3</span>
              </div>
              <div>
                <h3 className="font-medium">Explora Operaciones</h3>
                <p className="text-sm text-muted-foreground">
                  Realiza operaciones de lenguajes formales: concatenación, reflexión, unión, etc.
                </p>
              </div>
            </div>
            
            <div className="flex gap-3 hover:bg-muted/50 p-2 rounded-lg transition-colors">
              <div className="bg-gradient-to-br from-primary to-primary/70 rounded-full h-8 w-8 flex items-center justify-center shrink-0">
                <span className="text-white font-medium">4</span>
              </div>
              <div>
                <h3 className="font-medium">Trabaja con Gramáticas</h3>
                <p className="text-sm text-muted-foreground">
                  Define, analiza y manipula gramáticas formales de diferentes tipos.
                </p>
              </div>
            </div>
          </div>
          
          <Link href="/app" className="block mt-6">
            <Button 
              className="w-full transition-all duration-300 hover:scale-105" 
              variant="outline"
            >
              <BookOpen className="mr-2 h-4 w-4" /> Ver Documentación Completa
            </Button>
          </Link>
        </section>
        
        {/* Testimonials section */}
        <section 
          className={`transition-all duration-700 ${
            scrollY > 900 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="text-2xl font-semibold text-center mb-6">Experiencias de Usuarios</h2>
          <Testimonials />
        </section>

        {/* Collaboration Section con animación al scroll */}
        <section 
          className={`space-y-6 transition-all duration-700 ${
            scrollY > 1200 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="text-2xl font-semibold text-center">Colabora con Nosotros</h2>
          
          <div className="space-y-4">
            <Card className="overflow-hidden border-primary/10 hover:border-primary/30 transition-all duration-300 hover:shadow-md hover:scale-[1.02]">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-base">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <Code className="h-4 w-4 text-primary" />
                  </div>
                  Desarrollo
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Contribuye con código para mejorar las funcionalidades o agregar nuevas características.
                </p>
                <Button className="mt-3 w-full" variant="outline" size="sm">
                  <Github className="mr-2 h-4 w-4" /> Ver Repositorio
                </Button>
              </CardContent>
            </Card>
            
            <Card className="overflow-hidden border-primary/10 hover:border-primary/30 transition-all duration-300 hover:shadow-md hover:scale-[1.02]">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-base">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <Lightbulb className="h-4 w-4 text-primary" />
                  </div>
                  Ideas y Sugerencias
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Comparte ideas para nuevas funcionalidades o mejoras a través de nuestro sistema de issues.
                </p>
                <Button className="mt-3 w-full" variant="outline" size="sm">
                  Enviar Sugerencias
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Footer con animación */}
        <footer className="py-6 border-t text-center text-sm text-muted-foreground animate-in fade-in duration-700 delay-500">
          <p>© {new Date().getFullYear()} Procesador de Lenguajes</p>
          <p className="mt-1">Desarrollado como proyecto educativo</p>
        </footer>
      </div>
    </main>
  )
}
