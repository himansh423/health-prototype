"use client"

import { useState } from "react"
import axios from "axios"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { QrCode, FileText, History, User, Download, Share2, Loader2 } from "lucide-react"
import { Toast } from "./Toast"


export default function GenerateQRSection() {
  const [qrGenerated, setQrGenerated] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [qrData, setQrData] = useState({
    profile: "",
    reports: "",
    history: "",
  })
  const [pdfUrl, setPdfUrl] = useState("")
  const [toastMessage, setToastMessage] = useState<{
    show: boolean
    title: string
    description?: string
    variant?: "default" | "destructive"
  }>({
    show: false,
    title: "",
  })

  const showToast = (title: string, description?: string, variant?: "default" | "destructive") => {
    setToastMessage({
      show: true,
      title,
      description,
      variant,
    })

    // Auto hide toast after 3 seconds
    setTimeout(() => {
      setToastMessage((prev) => ({ ...prev, show: false }))
    }, 3000)
  }

  const generateQR = async () => {
    setIsLoading(true)
    try {
      // Replace with your actual user ID
      const userId = "67cab7250b3cc6436cebd7a7"

      const response = await axios.post("/api/generate-qr", { userId })
      const data = response.data

      if (data.success) {
        // Set the same QR code for all tabs for simplicity
        // In a real app, you might want to generate different QRs for different sections
        setQrData({
          profile: data.qrCode,
          reports: data.qrCode,
          history: data.qrCode,
        })
        setPdfUrl(data.pdfUrl)
        setQrGenerated(true)
        showToast("Success", "Your health QR code has been generated successfully")
      } else {
        throw new Error(data.message || "Failed to generate QR code")
      }
    } catch (error) {
      console.error("Error generating QR code:", error)
      showToast("Error", "Failed to generate QR code. Please try again.", "destructive")
    } finally {
      setIsLoading(false)
    }
  }

  const handleDownload = () => {
    // Create a temporary link and trigger download
    window.open(pdfUrl, "_blank")
  }

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: "My Health Profile",
          text: "Check out my health profile",
          url: pdfUrl,
        })
        showToast("Shared", "Your health profile has been shared successfully")
      } else {
        // Fallback for browsers that don't support the Web Share API
        navigator.clipboard.writeText(pdfUrl)
        showToast("Link Copied", "PDF link copied to clipboard")
      }
    } catch (error) {
      console.error("Error sharing:", error)
      showToast("Error", "Failed to share. Link copied to clipboard instead.", "destructive")
    }
  }

  return (
    <section id="qr" className="py-16 bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#0070f3] mb-4">Track Your Health Journey</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Generate a personalized QR code to access your medical history, prescriptions, and test results anytime,
              anywhere.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-semibold mb-6">Why Use QR Health Tracking?</h3>

              <div className="space-y-6">
                <div className="flex">
                  <div className="flex-shrink-0 h-12 w-12 bg-[#0070f3]/10 rounded-full flex items-center justify-center mr-4">
                    <User className="h-6 w-6 text-[#0070f3]" />
                  </div>
                  <div>
                    <h4 className="text-lg font-medium">Personal Health Profile</h4>
                    <p className="text-gray-600">
                      Access your complete health profile with a simple scan, including medical history and current
                      medications.
                    </p>
                  </div>
                </div>

                <div className="flex">
                  <div className="flex-shrink-0 h-12 w-12 bg-[#0070f3]/10 rounded-full flex items-center justify-center mr-4">
                    <FileText className="h-6 w-6 text-[#0070f3]" />
                  </div>
                  <div>
                    <h4 className="text-lg font-medium">Medical Reports</h4>
                    <p className="text-gray-600">
                      Store and access all your diagnostic reports and test results in one secure place.
                    </p>
                  </div>
                </div>

                <div className="flex">
                  <div className="flex-shrink-0 h-12 w-12 bg-[#0070f3]/10 rounded-full flex items-center justify-center mr-4">
                    <History className="h-6 w-6 text-[#0070f3]" />
                  </div>
                  <div>
                    <h4 className="text-lg font-medium">Treatment History</h4>
                    <p className="text-gray-600">
                      Track your treatment progress and medication history over time for better health management.
                    </p>
                  </div>
                </div>
              </div>

              <Button className="mt-8 w-full bg-[#0070f3] sm:w-auto" onClick={generateQR} disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  "Generate My Health QR"
                )}
              </Button>
            </div>

            <div>
              <Card className="overflow-hidden">
                <CardContent className="p-0">
                  <Tabs defaultValue="profile">
                    <TabsList className="w-full grid grid-cols-3">
                      <TabsTrigger value="profile">Profile</TabsTrigger>
                      <TabsTrigger value="reports">Reports</TabsTrigger>
                      <TabsTrigger value="history">History</TabsTrigger>
                    </TabsList>

                    <div className="p-6">
                      <TabsContent value="profile" className="mt-0">
                        <div className="text-center">
                          {qrGenerated ? (
                            <div>
                              <div className="bg-white p-4 rounded-lg inline-block mb-4">
                                <img
                                  src={qrData.profile || "/placeholder.svg?height=200&width=200"}
                                  alt="Profile QR Code"
                                  className="w-48 h-48 mx-auto"
                                />
                              </div>
                              <h4 className="font-medium mb-2">Your Health Profile QR</h4>
                              <p className="text-sm text-gray-600 mb-4">
                                Scan this QR code to download your complete health profile
                              </p>
                              <div className="flex justify-center space-x-3">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="flex items-center gap-1"
                                  onClick={handleDownload}
                                >
                                  <Download className="h-4 w-4" />
                                  Download
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="flex items-center gap-1"
                                  onClick={handleShare}
                                >
                                  <Share2 className="h-4 w-4" />
                                  Share
                                </Button>
                              </div>
                            </div>
                          ) : (
                            <div className="py-12">
                              <QrCode className="h-16 w-16 mx-auto text-gray-300 mb-4" />
                              <p className="text-gray-500">Generate your QR code to see a preview here</p>
                            </div>
                          )}
                        </div>
                      </TabsContent>

                      <TabsContent value="reports" className="mt-0">
                        <div className="text-center">
                          {qrGenerated ? (
                            <div>
                              <div className="bg-white p-4 rounded-lg inline-block mb-4">
                                <img
                                  src={qrData.reports || "/placeholder.svg?height=200&width=200"}
                                  alt="Reports QR Code"
                                  className="w-48 h-48 mx-auto"
                                />
                              </div>
                              <h4 className="font-medium mb-2">Your Medical Reports QR</h4>
                              <p className="text-sm text-gray-600 mb-4">
                                Scan this QR code to download all your medical reports
                              </p>
                              <div className="flex justify-center space-x-3">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="flex items-center gap-1"
                                  onClick={handleDownload}
                                >
                                  <Download className="h-4 w-4" />
                                  Download
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="flex items-center gap-1"
                                  onClick={handleShare}
                                >
                                  <Share2 className="h-4 w-4" />
                                  Share
                                </Button>
                              </div>
                            </div>
                          ) : (
                            <div className="py-12">
                              <FileText className="h-16 w-16 mx-auto text-gray-300 mb-4" />
                              <p className="text-gray-500">Generate your QR code to see a preview here</p>
                            </div>
                          )}
                        </div>
                      </TabsContent>

                      <TabsContent value="history" className="mt-0">
                        <div className="text-center">
                          {qrGenerated ? (
                            <div>
                              <div className="bg-white p-4 rounded-lg inline-block mb-4">
                                <img
                                  src={qrData.history || "/placeholder.svg?height=200&width=200"}
                                  alt="History QR Code"
                                  className="w-48 h-48 mx-auto"
                                />
                              </div>
                              <h4 className="font-medium mb-2">Your Treatment History QR</h4>
                              <p className="text-sm text-gray-600 mb-4">
                                Scan this QR code to download your treatment history
                              </p>
                              <div className="flex justify-center space-x-3">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="flex items-center gap-1"
                                  onClick={handleDownload}
                                >
                                  <Download className="h-4 w-4" />
                                  Download
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="flex items-center gap-1"
                                  onClick={handleShare}
                                >
                                  <Share2 className="h-4 w-4" />
                                  Share
                                </Button>
                              </div>
                            </div>
                          ) : (
                            <div className="py-12">
                              <History className="h-16 w-16 mx-auto text-gray-300 mb-4" />
                              <p className="text-gray-500">Generate your QR code to see a preview here</p>
                            </div>
                          )}
                        </div>
                      </TabsContent>
                    </div>
                  </Tabs>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Toast Component */}
      {toastMessage.show && (
        <Toast title={toastMessage.title} description={toastMessage.description} variant={toastMessage.variant} />
      )}
    </section>
  )
}

