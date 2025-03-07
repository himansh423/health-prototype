"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import axios from "axios"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Loader2 } from "lucide-react"

const verifySchema = z.object({
  otp: z.string().length(6, "OTP must be 6 digits"),
})

type VerifyFormValues = z.infer<typeof verifySchema>

export default function VerifyPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [timeLeft, setTimeLeft] = useState(300) 
  const router = useRouter()
  const searchParams = useSearchParams()
  const email = searchParams.get("email")

  useEffect(() => {
    if (!email) {
      router.push("/register")
      return
    }

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer)
          return 0
        }
        return prevTime - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [email, router])

  const form = useForm<VerifyFormValues>({
    resolver: zodResolver(verifySchema),
    defaultValues: {
      otp: "",
    },
  })

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`
  }

  const onSubmit = async (data: VerifyFormValues) => {
    if (!email) return

    setIsLoading(true)
    setError("")

    try {
      const response = await axios.post("/api/auth/verify-otp", {
        email,
        otp: data.otp,
      })

      if (response.data.success) {
        router.push("/")
      }
    } catch (error: any) {
      setError(error.response?.data?.message || "Invalid OTP")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white p-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold" style={{ color: "#0070f3" }}>
            Verify Your Email
          </h1>
          <p className="mt-2 text-gray-600">We've sent a 6-digit code to {email}</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="otp"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Enter OTP</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="123456"
                      {...field}
                      maxLength={6}
                      className="text-center text-xl tracking-widest"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="text-center text-sm">
              <p className="text-gray-600">
                Time remaining: <span className="font-medium">{formatTime(timeLeft)}</span>
              </p>
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={isLoading || timeLeft === 0}
              style={{ backgroundColor: "#43C6B8" }}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Verifying...
                </>
              ) : timeLeft === 0 ? (
                "Time expired"
              ) : (
                "Verify OTP"
              )}
            </Button>
          </form>
        </Form>

        {timeLeft === 0 && (
          <div className="text-center">
            <p className="text-sm text-gray-600">
              Your OTP has expired. Please{" "}
              <Button
                variant="link"
                className="p-0 h-auto"
                style={{ color: "#0070f3" }}
                onClick={() => router.push("/register")}
              >
                register again
              </Button>
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

