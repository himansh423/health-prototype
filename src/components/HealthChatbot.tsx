/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Send, Loader2, MessageSquare, Globe, User, Bot, Volume2, VolumeX, Mic, MicOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { useToast } from "./Toast"


interface Message {
  role: "user" | "assistant"
  content: string
  language: "english" | "hindi"
}


declare global {
  interface Window {
    SpeechRecognition: any
    webkitSpeechRecognition: any
  }
  interface SpeechRecognitionEvent extends Event {
    results: SpeechRecognitionResultList
  }
  interface SpeechRecognitionErrorEvent extends Event {
    error: string
  }
}

export default function HealthChatbot() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const [language, setLanguage] = useState<"english" | "hindi">("english")
  const [isListening, setIsListening] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { toast } = useToast()
  const recognitionRef = useRef<typeof SpeechRecognition | null>(null)
  const synthRef = useRef<SpeechSynthesis | null>(null)

  useEffect(() => {
    if (typeof window !== "undefined") {
      if ("SpeechRecognition" in window || "webkitSpeechRecognition" in window) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
        recognitionRef.current = new SpeechRecognition()
        recognitionRef.current.continuous = false
        recognitionRef.current.interimResults = false
      }

      if ("speechSynthesis" in window) {
        synthRef.current = window.speechSynthesis
      }
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort()
      }
      if (synthRef.current) {
        synthRef.current.cancel()
      }
    }
  }, [])

  useEffect(() => {
    if (recognitionRef.current) {
      recognitionRef.current.lang = language === "english" ? "en-US" : "hi-IN"
    }
  }, [language])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])
  useEffect(() => {
    if (recognitionRef.current) {
      recognitionRef.current.lang = language === "english" ? "en-US" : "hi-IN"
    }
  }, [language])

  
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return


    const userMessage: Message = {
      role: "user",
      content: input,
      language,
    }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setLoading(true)

    try {
      
      const response = await fetch("/api/health-chatbot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: input,
          language,
          userId: "67cab7250b3cc6436cebd7a7", 
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to get response")
      }

      const data = await response.json()

      
      const assistantMessage: Message = {
        role: "assistant",
        content: data.response,
        language,
      }
      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      console.error("Error:", error)
    
      const errorMessage: Message = {
        role: "assistant",
        content:
          language === "english"
            ? "Sorry, I couldn't process your request. Please try again."
            : "क्षमा करें, मैं आपके अनुरोध को संसाधित नहीं कर सका। कृपया पुनः प्रयास करें।",
        language,
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setLoading(false)
    }
  }

  const startListening = () => {
    if (!recognitionRef.current) {
      toast({
        title: language === "english" ? "Not supported" : "समर्थित नहीं है",
        description:
          language === "english"
            ? "Speech recognition is not supported in your browser."
            : "आपके ब्राउज़र में स्पीच रिकग्निशन समर्थित नहीं है।",
        variant: "destructive",
      })
      return
    }

    setIsListening(true)

    recognitionRef.current.onresult = (event: SpeechRecognitionEvent) => {
      const transcript = event.results[0][0].transcript
      setInput(transcript)
    }

    recognitionRef.current.onend = () => {
      setIsListening(false)
    }

    recognitionRef.current.onerror = (event: SpeechRecognitionErrorEvent) => {
      console.error("Speech recognition error", event.error)
      setIsListening(false)
      toast({
        title: language === "english" ? "Error" : "त्रुटि",
        description:
          language === "english"
            ? "Failed to recognize speech. Please try again."
            : "भाषण को पहचानने में विफल। कृपया पुनः प्रयास करें।",
        variant: "destructive",
      })
    }

    recognitionRef.current.start()
  }

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop()
      setIsListening(false)
    }
  }

  const speakMessage = (text: string) => {
    if (!synthRef.current) {
      toast({
        title: language === "english" ? "Not supported" : "समर्थित नहीं है",
        description:
          language === "english"
            ? "Text-to-speech is not supported in your browser."
            : "आपके ब्राउज़र में टेक्स्ट-टू-स्पीच समर्थित नहीं है।",
        variant: "destructive",
      })
      return
    }

   
    synthRef.current.cancel()

    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = language === "english" ? "en-US" : "hi-IN"

    utterance.onstart = () => {
      setIsSpeaking(true)
    }

    utterance.onend = () => {
      setIsSpeaking(false)
    }

    utterance.onerror = () => {
      setIsSpeaking(false)
      toast({
        title: language === "english" ? "Error" : "त्रुटि",
        description:
          language === "english" ? "Failed to speak text. Please try again." : "टेक्स्ट बोलने में विफल। कृपया पुनः प्रयास करें।",
        variant: "destructive",
      })
    }

    synthRef.current.speak(utterance)
  }

  const stopSpeaking = () => {
    if (synthRef.current) {
      synthRef.current.cancel()
      setIsSpeaking(false)
    }
  }

  const getWelcomeMessage = () => {
    if (language === "english") {
      return "Hello! I'm your health assistant. How can I help you today? You can ask me questions about your health, medications, or general health advice."
    } else {
      return "नमस्ते! मैं आपका स्वास्थ्य सहायक हूँ। आज मैं आपकी कैसे मदद कर सकता हूँ? आप मुझसे अपने स्वास्थ्य, दवाओं, या सामान्य स्वास्थ्य सलाह के बारे में प्रश्न पूछ सकते हैं।"
    }
  }

  return (
    <div className="w-full max-w-4xl mx-auto mb-16 my-12 px-4 sm:px-6">
      <Card className="border-2 border-[#0070f3] shadow-xl overflow-hidden backdrop-blur-sm bg-white/95">
        <CardHeader className="bg-gradient-to-r from-[#0070f3] to-[#0060d3] text-white p-4 sm:p-6">
          <CardTitle className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center">
              <MessageSquare className="mr-2 h-6 w-6" />
              <span className="text-xl font-bold">Health Assistant</span>
            </div>
            <Tabs
              defaultValue="english"
              value={language}
              onValueChange={(value) => setLanguage(value as "english" | "hindi")}
              className="w-full sm:w-[200px]"
            >
              <TabsList className="grid w-full grid-cols-2 bg-blue-600/50">
                <TabsTrigger
                  value="english"
                  className="data-[state=active]:bg-white data-[state=active]:text-[#0070f3] transition-all"
                >
                  English
                </TabsTrigger>
                <TabsTrigger
                  value="hindi"
                  className="data-[state=active]:bg-white data-[state=active]:text-[#0070f3] transition-all"
                >
                  हिंदी
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="h-[450px] overflow-y-auto p-4 bg-gradient-to-b from-blue-50 to-white">
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center p-6">
                <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                  <Globe className="h-8 w-8 text-[#0070f3]" />
                </div>
                <p className="text-gray-700 mb-3 font-medium">{getWelcomeMessage()}</p>
                <p className="text-sm text-gray-500">
                  {language === "english"
                    ? "Your conversation is private and secure."
                    : "आपकी बातचीत निजी और सुरक्षित है।"}
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {messages.map((message, index) => (
                  <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={cn(
                        "flex items-start max-w-[85%] p-3 shadow-md",
                        message.role === "user"
                          ? "bg-gradient-to-r from-[#0070f3] to-[#0060d3] text-white rounded-tl-lg rounded-tr-none"
                          : "bg-white border border-blue-100 text-gray-800 rounded-tr-lg rounded-tl-none",
                        "rounded-bl-lg rounded-br-lg transition-all",
                      )}
                    >
                      <div
                        className={cn(
                          "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center mr-2",
                          message.role === "user" ? "bg-blue-400/30" : "bg-blue-100",
                        )}
                      >
                        {message.role === "user" ? (
                          <User className="h-4 w-4 text-white" />
                        ) : (
                          <Bot className="h-4 w-4 text-[#0070f3]" />
                        )}
                      </div>
                      <div className="flex-1 whitespace-pre-wrap">{message.content}</div>
                      {message.role === "assistant" && (
                        <button
                          onClick={() => (isSpeaking ? stopSpeaking() : speakMessage(message.content))}
                          className="ml-2 p-1 text-blue-500 hover:text-blue-700 transition-colors"
                          aria-label={isSpeaking ? "Stop speaking" : "Speak message"}
                        >
                          {isSpeaking ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                        </button>
                      )}
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="p-4 border-t bg-gradient-to-b from-white to-blue-50">
          <form onSubmit={handleSubmit} className="w-full flex gap-2">
            <div className="relative flex-1">
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={
                  language === "english" ? "Type your health question here..." : "अपना स्वास्थ्य प्रश्न यहां टाइप करें..."
                }
                className="min-h-[50px] pr-10 resize-none border-blue-200 focus:border-[#0070f3] focus:ring-1 focus:ring-[#0070f3]"
                disabled={loading || isListening}
              />
              <button
                type="button"
                onClick={isListening ? stopListening : startListening}
                className={cn(
                  "absolute right-2 top-2 p-1 rounded-full",
                  isListening ? "bg-red-100 text-red-500" : "bg-blue-100 text-blue-500",
                  "hover:bg-opacity-80 transition-colors",
                )}
                disabled={loading}
                aria-label={isListening ? "Stop listening" : "Start voice input"}
              >
                {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
              </button>
            </div>
            <Button
              type="submit"
              disabled={loading || !input.trim()}
              className="bg-[#0070f3] hover:bg-[#0060d3] transition-colors"
            >
              {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
            </Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  )
}

