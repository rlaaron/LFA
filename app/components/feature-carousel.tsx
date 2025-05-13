"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

type Feature = {
  title: string
  description: string
  icon: React.ReactNode
  example: string
}

export function FeatureCarousel() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  
  const features: Feature[] = [
    {
      title: "Validación de Palabras",
      description: "Verifica si una palabra pertenece a un lenguaje según su alfabeto",
      icon: <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
              <span className="text-primary text-lg font-semibold">Σ*</span>
            </div>,
      example: "Ejemplo: Para Σ={a,b,c}, la palabra 'abc' es válida"
    },
    {
      title: "Concatenación",
      description: "Une dos palabras para formar una nueva secuencia",
      icon: <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
              <span className="text-primary text-lg font-semibold">w₁·w₂</span>
            </div>,
      example: "Ejemplo: 'ab' + 'cd' = 'abcd'"
    },
    {
      title: "Reflexión",
      description: "Invierte el orden de los símbolos en una palabra",
      icon: <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
              <span className="text-primary text-lg font-semibold">wᴿ</span>
            </div>,
      example: "Ejemplo: La reflexión de 'abc' es 'cba'"
    },
    {
      title: "Gramáticas",
      description: "Define reglas para generar palabras de un lenguaje",
      icon: <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
              <span className="text-primary text-lg font-semibold">G</span>
            </div>,
      example: "Ejemplo: S → aS | bS | ε genera todas las palabras de {a,b}*"
    }
  ]

  const nextSlide = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setActiveIndex((prev) => (prev + 1) % features.length)
    setTimeout(() => setIsAnimating(false), 500)
  }

  const prevSlide = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setActiveIndex((prev) => (prev - 1 + features.length) % features.length)
    setTimeout(() => setIsAnimating(false), 500)
  }

  // Auto-advance carousel
  useEffect(() => {
    const timer = setTimeout(() => {
      nextSlide()
    }, 5000)
    return () => clearTimeout(timer)
  }, [activeIndex])

  return (
    <div className="relative">
      <Card className="overflow-hidden">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={prevSlide}
              className="transition-transform hover:scale-110"
              disabled={isAnimating}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            
            <div className="text-center flex-1">
              <div className="flex justify-center mb-4">
                {features[activeIndex].icon}
              </div>
              <h3 className="text-lg font-medium">{features[activeIndex].title}</h3>
              <p className="text-sm text-muted-foreground mt-1">{features[activeIndex].description}</p>
              <p className="text-xs font-mono mt-3 bg-muted p-2 rounded">{features[activeIndex].example}</p>
            </div>
            
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={nextSlide}
              className="transition-transform hover:scale-110"
              disabled={isAnimating}
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
          
          <div className="flex justify-center gap-1 mt-2">
            {features.map((_, index) => (
              <div 
                key={index} 
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  index === activeIndex ? "w-4 bg-primary" : "w-2 bg-muted"
                }`}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
