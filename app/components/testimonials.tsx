"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

type Testimonial = {
  id: number
  name: string
  role: string
  text: string
  initials: string
}

export function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0)
  
  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Alejandra Martínez",
      role: "Estudiante de Ciencias Computacionales",
      text: "Esta herramienta me ayudó a entender conceptos complejos de lenguajes formales de manera visual e interactiva.",
      initials: "AM"
    },
    {
      id: 2,
      name: "Carlos Rodríguez",
      role: "Profesor de Teoría de la Computación",
      text: "Uso esta aplicación para mostrar ejemplos prácticos a mis estudiantes. Las visualizaciones hacen que los conceptos abstractos sean mucho más accesibles.",
      initials: "CR"
    },
    {
      id: 3,
      name: "Laura Sánchez",
      role: "Desarrolladora de Software",
      text: "Incluso como profesional, encuentro esta herramienta útil para refrescar conceptos de autómatas y gramáticas cuando los necesito.",
      initials: "LS"
    }
  ]
  
  // Auto-advance testimonials
  useEffect(() => {
    const timer = setTimeout(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length)
    }, 6000)
    return () => clearTimeout(timer)
  }, [activeIndex, testimonials.length])
  
  return (
    <div className="py-4">
      <div className="relative overflow-hidden h-[180px]">
        {testimonials.map((testimonial, index) => (
          <Card
            key={testimonial.id}
            className={`absolute w-full transition-all duration-500 ease-in-out ${
              index === activeIndex 
                ? "opacity-100 translate-x-0" 
                : index < activeIndex 
                  ? "opacity-0 -translate-x-full" 
                  : "opacity-0 translate-x-full"
            }`}
          >
            <CardContent className="p-4 pt-6">
              <div className="flex items-start gap-4">
                <Avatar className="h-10 w-10 border-2 border-primary/20">
                  <AvatarFallback className="bg-primary/10 text-primary">
                    {testimonial.initials}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">{testimonial.name}</p>
                  <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                  <p className="mt-2 text-sm italic">"{testimonial.text}"</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="flex justify-center gap-1 mt-2">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              index === activeIndex ? "w-4 bg-primary" : "w-2 bg-muted"
            }`}
            aria-label={`Ver testimonio ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
