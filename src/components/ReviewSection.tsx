"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react"

const reviews = [
  {
    id: 1,
    name: "Rajesh Kumar",
    location: "Dehradun, Uttarakhand",
    rating: 5,
    comment:
      "This healthcare platform has been a lifesaver for my family. The affordable subscription plan gives us access to quality healthcare services that were previously out of reach. The QR code system makes it easy to track all our medical records.",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 2,
    name: "Priya Sharma",
    location: "Mussoorie, Uttarakhand",
    rating: 5,
    comment:
      "As someone living in a remote village, accessing healthcare was always a challenge. This platform has changed everything. The teleconsultations and medicine delivery service have made managing my diabetes so much easier and more affordable.",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 3,
    name: "Anand Singh",
    location: "Haridwar, Uttarakhand",
    rating: 4,
    comment:
      "The subscription model is perfect for my budget. I no longer have to worry about unexpected medical expenses. The generic medicines are just as effective and cost a fraction of branded ones. Highly recommend for rural families.",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 4,
    name: "Meena Devi",
    location: "Rishikesh, Uttarakhand",
    rating: 5,
    comment:
      "I was skeptical at first, but after using this service for six months, I'm completely satisfied. The doctors are professional, the medicines are genuine, and the overall experience has been excellent. It's truly healthcare made accessible.",
    image: "/placeholder.svg?height=100&width=100",
  },
]

export default function ReviewSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [activeReviews, setActiveReviews] = useState(reviews.slice(0, 3))

  const nextReview = () => {
    const newIndex = (currentIndex + 1) % reviews.length
    setCurrentIndex(newIndex)
    updateActiveReviews(newIndex)
  }

  const prevReview = () => {
    const newIndex = (currentIndex - 1 + reviews.length) % reviews.length
    setCurrentIndex(newIndex)
    updateActiveReviews(newIndex)
  }

  const updateActiveReviews = (startIndex: number) => {
    const endIndex = (startIndex + 3) % reviews.length
    let newActiveReviews = []

    if (endIndex > startIndex) {
      newActiveReviews = reviews.slice(startIndex, endIndex)
    } else {
      newActiveReviews = [...reviews.slice(startIndex), ...reviews.slice(0, endIndex)]
    }

    setActiveReviews(newActiveReviews.length ? newActiveReviews : reviews.slice(0, 3))
  }

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[#0070f3] mb-4">What Our Users Say</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Hear from people who have transformed their healthcare experience with our affordable solutions.
          </p>
        </div>

        <div className="relative max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {activeReviews.map((review) => (
              <Card key={review.id} className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                      <img
                        src={review.image || "/placeholder.svg"}
                        alt={review.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-semibold">{review.name}</h4>
                      <p className="text-sm text-gray-500">{review.location}</p>
                    </div>
                  </div>

                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i < review.rating ? "text-amber-400 fill-amber-400" : "text-gray-300"}`}
                      />
                    ))}
                  </div>

                  <div className="relative">
                    <Quote className="h-8 w-8 text-primary/10 absolute -top-2 -left-2" />
                    <p className="text-gray-600 relative z-10 pl-4">{review.comment}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="flex justify-center mt-8 space-x-2">
            <Button variant="outline" size="icon" onClick={prevReview} className="rounded-full">
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button variant="outline" size="icon" onClick={nextReview} className="rounded-full">
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

