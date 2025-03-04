"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

const slides = [
  {
    id: 1,
    title: "Affordable Healthcare for Rural Communities",
    description:
      "Access quality healthcare services for just ₹500 per month with our innovative AI-powered financing solutions.",
    image: "/placeholder.svg?height=600&width=1200",
    buttonText: "Learn More",
    buttonLink: "#subscriptions",
  },
  {
    id: 2,
    title: "Bundled Diagnostic Tests & Medications",
    description:
      "Get essential diagnostic tests and generic medicines in one affordable package, tailored to your health needs.",
    image: "/placeholder.svg?height=600&width=1200",
    buttonText: "View Packages",
    buttonLink: "#medicines",
  },
  {
    id: 3,
    title: "Connect with Specialist Doctors",
    description:
      "Consult with specialists from the comfort of your home, with our network of qualified healthcare professionals.",
    image: "/placeholder.svg?height=600&width=1200",
    buttonText: "Find Doctors",
    buttonLink: "#hospitals",
  },
  {
    id: 4,
    title: "Track Your Health Journey",
    description:
      "Monitor your health progress with our QR-based tracking system that keeps all your medical records in one place.",
    image: "/placeholder.svg?height=600&width=1200",
    buttonText: "Generate QR",
    buttonLink: "#qr",
  },
]

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
  }, [])

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))
  }

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide()
    }, 5000)
    return () => clearInterval(interval)
  }, [nextSlide])

  return (
    <section className="relative h-[600px] overflow-hidden">
      <div className="absolute inset-0 flex">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`w-full h-full flex-shrink-0 transition-transform duration-500 ease-in-out ${
              index === currentSlide ? "translate-x-0" : index < currentSlide ? "-translate-x-full" : "translate-x-full"
            }`}
            style={{ transform: `translateX(${(index - currentSlide) * 100}%)` }}
          >
            <div className="absolute inset-0">
              <img src={slide.image || "/placeholder.svg"} alt={slide.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-900/70 to-transparent" />
            </div>
            <div className="relative z-10 flex flex-col justify-center h-full max-w-3xl px-8 md:px-16">
              <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">{slide.title}</h1>
              <p className="text-lg md:text-xl text-white/90 mb-8">{slide.description}</p>
              <div>
                <Button asChild size="lg" className="bg-orange-500 hover:bg-orange-600 text-white">
                  <a href={slide.buttonLink}>{slide.buttonText}</a>
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm p-2 rounded-full hover:bg-white/30 transition-colors"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6 text-white" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm p-2 rounded-full hover:bg-white/30 transition-colors"
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6 text-white" />
      </button>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full ${index === currentSlide ? "bg-white" : "bg-white/40"}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
}

