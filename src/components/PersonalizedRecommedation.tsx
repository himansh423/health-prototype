"use client"

import type React from "react"
import { useState, useRef } from "react"
import axios from "axios"
import {
  Activity,
  AlertCircle,
  Clock,
  Heart,
  Info,
  Pill,
  Shield,
  Sparkles,
  User,
  Users,
  Zap,
  ChevronDown,
  ChevronUp,
  Loader2,
} from "lucide-react"

const PersonalizedRecommendations = () => {
  const [recommendations, setRecommendations] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [expanded, setExpanded] = useState<{ [key: string]: boolean }>({})
  const resultRef = useRef<HTMLDivElement>(null)

  const fetchRecommendations = async () => {
    setLoading(true)
    setError("")
    setRecommendations("")

    try {
      // Create a new AbortController
      const controller = new AbortController()
      const { signal } = controller

      // Make a streaming request
      const response = await fetch("/api/get-personalized-recommendation/67cab7250b3cc6436cebd7a7", { signal })

      if (!response.ok) {
        throw new Error("Failed to fetch recommendations")
      }

      // Get the reader from the response body
      const reader = response.body?.getReader()
      if (!reader) throw new Error("Response body is not readable")

      // Read the stream
      const decoder = new TextDecoder()
      let accumulatedText = ""

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        // Decode the chunk and append to accumulated text
        const chunk = decoder.decode(value, { stream: true })
        accumulatedText += chunk

        // Update the state with the accumulated text
        setRecommendations(accumulatedText)

        // Scroll to the bottom of the results
        if (resultRef.current) {
          resultRef.current.scrollTop = resultRef.current.scrollHeight
        }
      }
    } catch (err) {
      if (axios.isAxiosError(err) && err.message !== "canceled") {
        setError("Failed to fetch recommendations. Please try again.")
        console.error(err)
      }
    } finally {
      setLoading(false)
    }
  }

  // Function to parse and format the recommendations
  const formatRecommendations = (text: string) => {
    if (!text) return null

    // Split by new lines
    const lines = text.split("\n")
    const formattedContent: React.ReactNode[] = []
    let currentSection = ""
    let currentSectionContent: React.ReactNode[] = []
    let sectionIndex = 0

    lines.forEach((line, index) => {
      // Check if this is a section heading (we're looking for lines that are short and not bullet points)
      if (
        line.trim() &&
        !line.trim().startsWith("•") &&
        !line.trim().startsWith("-") &&
        line.length < 50 &&
        line.trim().endsWith(":")
      ) {
        // If we have a previous section, add it to the formatted content
        if (currentSection) {
          const sectionId = `section-${sectionIndex}`
          const isExpanded = expanded[sectionId] !== false // Default to expanded

          formattedContent.push(
            <div key={sectionId} className="mb-6">
              <div
                className="flex items-center justify-between cursor-pointer bg-blue-50 p-3 rounded-lg"
                onClick={() => setExpanded((prev) => ({ ...prev, [sectionId]: !isExpanded }))}
              >
                <h2 className="text-xl font-bold text-[#0070f3]">{currentSection}</h2>
                {isExpanded ? (
                  <ChevronUp className="h-5 w-5 text-[#0070f3]" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-[#0070f3]" />
                )}
              </div>

              {isExpanded && <div className="mt-3 pl-4 border-l-2 border-blue-100">{currentSectionContent}</div>}
            </div>,
          )

          // Reset for the next section
          currentSectionContent = []
          sectionIndex++
        }

        // Set the new current section
        currentSection = line.trim()
      }
      // This is content for the current section
      else if (line.trim()) {
        // Format bullet points
        if (line.trim().startsWith("•") || line.trim().startsWith("-")) {
          currentSectionContent.push(
            <li key={`${sectionIndex}-${index}`} className="text-gray-700 mb-2 flex items-start">
              <span className="text-[#0070f3] mr-2 mt-1">•</span>
              <span>{line.replace(/^[•-]\s*/, "")}</span>
            </li>,
          )
        }
        // Format regular paragraphs
        else {
          currentSectionContent.push(
            <p key={`${sectionIndex}-${index}`} className="text-gray-700 mb-3">
              {line}
            </p>,
          )
        }
      }
    })

    // Add the last section
    if (currentSection) {
      const sectionId = `section-${sectionIndex}`
      const isExpanded = expanded[sectionId] !== false // Default to expanded

      formattedContent.push(
        <div key={sectionId} className="mb-6">
          <div
            className="flex items-center justify-between cursor-pointer bg-blue-50 p-3 rounded-lg"
            onClick={() => setExpanded((prev) => ({ ...prev, [sectionId]: !isExpanded }))}
          >
            <h2 className="text-xl font-bold text-[#0070f3]">{currentSection}</h2>
            {isExpanded ? (
              <ChevronUp className="h-5 w-5 text-[#0070f3]" />
            ) : (
              <ChevronDown className="h-5 w-5 text-[#0070f3]" />
            )}
          </div>

          {isExpanded && <div className="mt-3 pl-4 border-l-2 border-blue-100">{currentSectionContent}</div>}
        </div>,
      )
    }

    return formattedContent
  }

  // Feature cards data
  const featureCards = [
    {
      title: "Personalized Analysis",
      description: "AI analyzes your complete health profile to provide tailored recommendations",
      icon: <User className="h-8 w-8 text-white" />,
    },
    {
      title: "Holistic Approach",
      description: "Considers medical history, current conditions, and preventive measures",
      icon: <Heart className="h-8 w-8 text-white" />,
    },
    {
      title: "Medication Insights",
      description: "Get reminders and advice on managing your current medications",
      icon: <Pill className="h-8 w-8 text-white" />,
    },
    {
      title: "Family Health",
      description: "Recommendations for your family members based on their profiles",
      icon: <Users className="h-8 w-8 text-white" />,
    },
    {
      title: "Insurance Optimization",
      description: "Learn how to maximize your insurance coverage and benefits",
      icon: <Shield className="h-8 w-8 text-white" />,
    },
    {
      title: "Real-time Generation",
      description: "Watch as AI generates your recommendations in real-time",
      icon: <Zap className="h-8 w-8 text-white" />,
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <div className="bg-[#0070f3] text-white py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">AI-Powered Health Recommendations</h1>
              <p className="text-xl opacity-90 mb-8">
                Get personalized health insights based on your complete medical profile, delivered in real-time.
              </p>
              <button
                onClick={fetchRecommendations}
                disabled={loading}
                className="px-8 py-4 bg-white text-[#0070f3] font-semibold rounded-lg hover:bg-blue-50 transition duration-300 disabled:bg-opacity-70 disabled:cursor-not-allowed flex items-center"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                    Generating Recommendations...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-5 w-5 mr-2" />
                    Get My Health Recommendations
                  </>
                )}
              </button>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="w-64 h-64 bg-blue-400 bg-opacity-30 rounded-full flex items-center justify-center">
                <Activity className="h-32 w-32 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="py-16 container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">How It Works</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Our AI-powered system analyzes your complete health profile to provide personalized recommendations tailored
            to your specific needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
            <div className="w-12 h-12 bg-[#0070f3] rounded-full flex items-center justify-center mb-4">
              <User className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2">1. Profile Analysis</h3>
            <p className="text-gray-600">
              Our AI analyzes your complete health profile, including medical history, current conditions, and
              medications.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
            <div className="w-12 h-12 bg-[#0070f3] rounded-full flex items-center justify-center mb-4">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2">2. AI Processing</h3>
            <p className="text-gray-600">
              Advanced AI algorithms process your data to identify patterns, risks, and opportunities for health
              improvement.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
            <div className="w-12 h-12 bg-[#0070f3] rounded-full flex items-center justify-center mb-4">
              <Zap className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2">3. Real-time Results</h3>
            <p className="text-gray-600">
              Watch as personalized recommendations are generated in real-time, with actionable insights for your
              health.
            </p>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Key Features</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our health recommendation system provides comprehensive insights across multiple aspects of your health.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featureCards.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:transform hover:scale-105"
              >
                <div className="bg-[#0070f3] p-4 flex items-center justify-center">{feature.icon}</div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Results Section */}
      {(recommendations || error) && (
        <div className="py-16 container mx-auto px-4 max-w-6xl">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
            <div className="bg-[#0070f3] p-4 text-white">
              <h2 className="text-2xl font-bold">Your Personalized Health Recommendations</h2>
              <p className="opacity-90">Based on your complete health profile analysis</p>
            </div>

            {error && (
              <div className="p-6 flex items-center text-red-500">
                <AlertCircle className="h-6 w-6 mr-2" />
                <p>{error}</p>
              </div>
            )}

            {recommendations && (
              <div ref={resultRef} className="p-6 max-h-[600px] overflow-y-auto">
                <div className="space-y-4">{formatRecommendations(recommendations)}</div>
              </div>
            )}

            <div className="bg-gray-50 p-4 border-t border-gray-200 flex justify-between items-center">
              <div className="flex items-center text-gray-500 text-sm">
                <Clock className="h-4 w-4 mr-1" />
                <span>Generated on {new Date().toLocaleDateString()}</span>
              </div>
              <div className="flex items-center text-gray-500 text-sm">
                <Info className="h-4 w-4 mr-1" />
                <span>Consult with your doctor before making health changes</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default PersonalizedRecommendations

