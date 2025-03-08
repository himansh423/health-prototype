"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"

type ToastProps = {
  title: string
  description?: string
  variant?: "default" | "destructive"
  duration?: number
}

export function Toast({ title, description, variant = "default", duration = 3000 }: ToastProps) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
    }, duration)

    return () => clearTimeout(timer)
  }, [duration])

  if (!isVisible) return null

  return (
    <div
      className={`fixed bottom-4 right-4 z-50 flex w-full max-w-md items-center rounded-lg shadow-lg p-4 ${
        variant === "destructive" ? "bg-red-600 text-white" : "bg-white text-gray-900 border border-gray-200"
      }`}
    >
      <div className="flex-1">
        <h3 className="font-medium">{title}</h3>
        {description && <p className="text-sm opacity-90">{description}</p>}
      </div>
      <button
        onClick={() => setIsVisible(false)}
        className={`ml-4 rounded-full p-1 ${variant === "destructive" ? "hover:bg-red-700" : "hover:bg-gray-100"}`}
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  )
}

export function useToast() {
  const [toasts, setToasts] = useState<ToastProps[]>([])

  const toast = (props: ToastProps) => {
    const id = Math.random().toString(36).substring(2, 9)
    setToasts((prev) => [...prev, { ...props, id }])

    // Auto remove toast after duration
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast:any) => toast.id !== id))
    }, props.duration || 3000)
  }

  return { toast, toasts }
}

