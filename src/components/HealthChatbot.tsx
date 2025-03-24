/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { useState, useRef, useEffect, useCallback } from "react"
import type React from "react"

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

export default function HealthChatbot() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const [language, setLanguage] = useState<"english" | "hindi">("english")
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [listening, setListening] = useState(false)
  const [audioLevel, setAudioLevel] = useState(0)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { toast } = useToast()
  const synthRef = useRef<SpeechSynthesis | null>(null)
  const mediaStreamRef = useRef<MediaStream | null>(null)
  const audioContextRef = useRef<AudioContext | null>(null)
  const analyserRef = useRef<AnalyserNode | null>(null)
  const animationFrameRef = useRef<number | null>(null)
  const retryTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const manualTranscriptionRef = useRef<boolean>(false)

  // Initialize speech synthesis
  useEffect(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      synthRef.current = window.speechSynthesis
    }

    return () => {
      if (synthRef.current) {
        synthRef.current.cancel()
      }
      cleanupAudio()
    }
  }, [])

  // Scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const cleanupAudio = useCallback(() => {
    // Cancel any pending animation frames
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current)
      animationFrameRef.current = null
    }

    // Clear any retry timeouts
    if (retryTimeoutRef.current) {
      clearTimeout(retryTimeoutRef.current)
      retryTimeoutRef.current = null
    }

    // Stop all media tracks
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((track) => track.stop())
      mediaStreamRef.current = null
    }

    // Close audio context
    if (audioContextRef.current && audioContextRef.current.state !== "closed") {
      audioContextRef.current.close().catch((err) => console.error("Error closing audio context:", err))
      audioContextRef.current = null
    }

    analyserRef.current = null
    setListening(false)
    setAudioLevel(0)
  }, [])

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

  // Manual transcription function that doesn't rely on the Web Speech API
  const processAudioForTranscription = (audioBuffer: Float32Array) => {
    // This is a placeholder for manual transcription
    // In a real implementation, you would send this audio buffer to a server
    // for processing with a more reliable speech-to-text service

    // For now, we'll just detect if there's sound and notify the user
    const sum = audioBuffer.reduce((acc, val) => acc + Math.abs(val), 0)
    const average = sum / audioBuffer.length

    // If we detect significant audio and we're in manual transcription mode
    if (average > 0.01 && manualTranscriptionRef.current) {
      toast({
        title: language === "english" ? "Audio Detected" : "ऑडियो का पता चला",
        description:
          language === "english"
            ? "We detected audio. Please type your message if voice recognition isn't working."
            : "हमने ऑडियो का पता लगाया। यदि आवाज पहचान काम नहीं कर रही है तो कृपया अपना संदेश टाइप करें।",
      })

      // Only show this message once per listening session
      manualTranscriptionRef.current = false
    }
  }

  const startListening = async () => {
    // Stop any ongoing speech
    stopSpeaking()

    // Clean up any existing audio
    cleanupAudio()

    try {
      // Set manual transcription flag
      manualTranscriptionRef.current = true

      // Request microphone access
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        },
      })

      mediaStreamRef.current = stream

      // Create audio context and analyzer
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext
      if (!AudioContext) {
        throw new Error("AudioContext not supported")
      }

      audioContextRef.current = new AudioContext()
      analyserRef.current = audioContextRef.current.createAnalyser()
      const source = audioContextRef.current.createMediaStreamSource(stream)
      source.connect(analyserRef.current)

      // Configure analyzer
      analyserRef.current.fftSize = 256
      const bufferLength = analyserRef.current.frequencyBinCount
      const dataArray = new Uint8Array(bufferLength)

      // For manual transcription
      const scriptProcessor = audioContextRef.current.createScriptProcessor(4096, 1, 1)
      const audioBuffer = new Float32Array(4096)

      scriptProcessor.onaudioprocess = (audioProcessingEvent) => {
        const inputBuffer = audioProcessingEvent.inputBuffer
        const inputData = inputBuffer.getChannelData(0)
        audioBuffer.set(inputData)
        processAudioForTranscription(audioBuffer)
      }

      source.connect(scriptProcessor)
      scriptProcessor.connect(audioContextRef.current.destination)

      // Start voice detection
      setListening(true)

      // Start audio analysis loop for visualization
      const analyzeAudio = () => {
        if (!listening || !analyserRef.current) return

        analyserRef.current.getByteFrequencyData(dataArray)

        // Calculate average volume level (0-100)
        const average = Array.from(dataArray).reduce((sum, value) => sum + value, 0) / dataArray.length
        const normalizedLevel = Math.min(100, Math.max(0, average * 2)) // Scale for better visualization
        setAudioLevel(normalizedLevel)

        // Continue the loop
        animationFrameRef.current = requestAnimationFrame(analyzeAudio)
      }

      analyzeAudio()

      // Try to use the Web Speech API as a fallback
      try {
        const SpeechRecognition = window.SpeechRecognition || (window as any).webkitSpeechRecognition
        if (SpeechRecognition) {
          const recognition = new SpeechRecognition()
          recognition.lang = language === "english" ? "en-US" : "hi-IN"
          recognition.continuous = false
          recognition.interimResults = false

          recognition.onresult = (event: any) => {
            const transcript = event.results[0][0].transcript
            setInput(transcript)
          }

          recognition.onerror = (event: any) => {
            console.log("Speech recognition error:", event.error)

            if (event.error === "no-speech") {
              // If we get a no-speech error, retry after a short delay
              if (retryTimeoutRef.current) {
                clearTimeout(retryTimeoutRef.current)
              }

              retryTimeoutRef.current = setTimeout(() => {
                if (listening) {
                  try {
                    recognition.stop()
                    setTimeout(() => {
                      if (listening) {
                        recognition.start()
                      }
                    }, 100)
                  } catch (e) {
                    console.error("Error restarting recognition:", e)
                  }
                }
              }, 1000)
            }
          }

          recognition.onend = () => {
            // Restart recognition if we're still listening
            if (listening) {
              try {
                recognition.start()
              } catch (e) {
                console.error("Error restarting recognition:", e)
              }
            }
          }

          // Start recognition
          recognition.start()
        }
      } catch (e) {
        console.log("Web Speech API not available or error:", e)
        // Continue with manual audio processing only
      }

      toast({
        title: language === "english" ? "Listening..." : "सुन रहा हूँ...",
        description:
          language === "english" ? "Please speak clearly into your microphone." : "कृपया अपने माइक्रोफ़ोन में स्पष्ट रूप से बोलें।",
      })
    } catch (error) {
      console.error("Failed to start audio capture:", error)
      cleanupAudio()

      toast({
        title: language === "english" ? "Microphone Error" : "माइक्रोफोन त्रुटि",
        description:
          language === "english"
            ? "Could not access microphone. Please check permissions."
            : "माइक्रोफोन तक पहुंच नहीं सकता। कृपया अनुमतियां जांचें।",
        variant: "destructive",
      })
    }
  }

  const stopListening = () => {
    cleanupAudio()
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

    // Stop any ongoing speech
    stopSpeaking()

    // Create a new utterance
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = language === "english" ? "en-US" : "hi-IN"
    utterance.rate = 0.9 // Slightly slower for better clarity

    // Set up event handlers
    utterance.onstart = () => {
      setIsSpeaking(true)
    }

    utterance.onend = () => {
      setIsSpeaking(false)
    }

    utterance.onerror = (event) => {
      console.error("Speech synthesis error:", event)
      setIsSpeaking(false)
      toast({
        title: language === "english" ? "Error" : "त्रुटि",
        description:
          language === "english" ? "Failed to speak text. Please try again." : "टेक्स्ट बोलने में विफल। कृपया पुनः प्रयास करें।",
        variant: "destructive",
      })
    }

    // Start speaking
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
          <form onSubmit={handleSubmit} className="w-full flex flex-col gap-2">
            {listening && (
              <div className="w-full h-6 bg-gray-200 rounded-full overflow-hidden mb-2">
                <div
                  className="h-full bg-gradient-to-r from-blue-400 to-blue-600 transition-all duration-200"
                  style={{ width: `${audioLevel}%` }}
                />
              </div>
            )}
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={
                    language === "english" ? "Type your health question here..." : "अपना स्वास्थ्य प्रश्न यहां टाइप करें..."
                  }
                  className="min-h-[50px] pr-10 resize-none border-blue-200 focus:border-[#0070f3] focus:ring-1 focus:ring-[#0070f3]"
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={listening ? stopListening : startListening}
                  className={cn(
                    "absolute right-2 top-2 p-1 rounded-full",
                    listening ? "bg-red-100 text-red-500" : "bg-blue-100 text-blue-500",
                    "hover:bg-opacity-80 transition-colors",
                  )}
                  disabled={loading}
                  aria-label={listening ? "Stop listening" : "Start voice input"}
                >
                  {listening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                </button>
              </div>
              <Button
                type="submit"
                disabled={loading || !input.trim()}
                className="bg-[#0070f3] hover:bg-[#0060d3] transition-colors"
              >
                {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
              </Button>
            </div>
            {listening && (
              <p className="text-xs text-gray-500 mt-1">
                {language === "english"
                  ? "If voice recognition isn't working, you can type your message while the microphone is active."
                  : "यदि आवाज पहचान काम नहीं कर रही है, तो आप माइक्रोफोन सक्रिय होने पर अपना संदेश टाइप कर सकते हैं।"}
              </p>
            )}
          </form>
        </CardFooter>
      </Card>
    </div>
  )
}

