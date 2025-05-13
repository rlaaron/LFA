"use client"

import Link from "next/link"
import { Check, Github, ArrowRightCircle, BookOpen, Code, Lightbulb } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6 space-y-8 max-w-md">
        {/* Hero Section */}
        <section className="text-center space-y-4 py-10">
          <h1 className="text-3xl font-bold tracking-tight">Procesador de Lenguajes</h1>
          <p className="text-muted-foreground">
            Una herramienta interactiva para trabajar con lenguajes formales, autómatas y gramáticas
          </p>
          <Link href="/">
            <Button className="mt-4 w-full" size="lg">
              Iniciar Aplicación <ArrowRightCircle className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </section>

        {/* Features Section */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-center">¿Qué puedes hacer?</h2>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <Check className="h-5 w-5 text-primary" />
                Trabajar con Alfabetos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Crear y gestionar alfabetos personalizados para definir lenguajes formales.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <Check className="h-5 w-5 text-primary" />
                Operaciones con Palabras
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Validar, concatenar, reflejar, calcular potencias y verificar palíndromos.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <Check className="h-5 w-5 text-primary" />
                Operaciones con Lenguajes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Unión, intersección, complemento y otras operaciones con lenguajes formales.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <Check className="h-5 w-5 text-primary" />
                Gramáticas Formales
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Definir, analizar y trabajar con gramáticas formales de distintos tipos.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* How to Use Section */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-center">Guía de Uso</h2>
          
          <div className="space-y-4">
            <div className="flex gap-3">
              <div className="bg-primary rounded-full h-8 w-8 flex items-center justify-center shrink-0">
                <span className="text-white font-medium">1</span>
              </div>
              <div>
                <h3 className="font-medium">Define tu Alfabeto</h3>
                <p className="text-sm text-muted-foreground">
                  Comienza creando un alfabeto con los símbolos que necesitas.
                </p>
              </div>
            </div>
            
            <div className="flex gap-3">
              <div className="bg-primary rounded-full h-8 w-8 flex items-center justify-center shrink-0">
                <span className="text-white font-medium">2</span>
              </div>
              <div>
                <h3 className="font-medium">Crea Palabras y Lenguajes</h3>
                <p className="text-sm text-muted-foreground">
                  Usa tu alfabeto para crear palabras y definir lenguajes formales.
                </p>
              </div>
            </div>
            
            <div className="flex gap-3">
              <div className="bg-primary rounded-full h-8 w-8 flex items-center justify-center shrink-0">
                <span className="text-white font-medium">3</span>
              </div>
              <div>
                <h3 className="font-medium">Explora Operaciones</h3>
                <p className="text-sm text-muted-foreground">
                  Realiza operaciones de lenguajes formales: concatenación, reflexión, unión, etc.
                </p>
              </div>
            </div>
            
            <div className="flex gap-3">
              <div className="bg-primary rounded-full h-8 w-8 flex items-center justify-center shrink-0">
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
          
          <Link href="/">
            <Button className="w-full" variant="outline">
              <BookOpen className="mr-2 h-4 w-4" /> Ver Documentación Completa
            </Button>
          </Link>
        </section>

        {/* Collaboration Section */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-center">Colabora con Nosotros</h2>
          
          <div className="space-y-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-base">
                  <Code className="h-5 w-5 text-primary" />
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
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-base">
                  <Lightbulb className="h-5 w-5 text-primary" />
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

        {/* Footer */}
        <footer className="py-6 border-t text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Procesador de Lenguajes</p>
          <p className="mt-1">Desarrollado como proyecto educativo</p>
        </footer>
      </div>
    </main>
  )
}
