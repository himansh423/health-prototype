"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { QrCode, FileText, History, User, Download, Share2 } from "lucide-react"

export default function GenerateQRSection() {
  const [qrGenerated, setQrGenerated] = useState(false)

  return (
    <section id="qr" className="py-16 bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary mb-4">Track Your Health Journey</h2>
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
                  <div className="flex-shrink-0 h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                    <User className="h-6 w-6 text-primary" />
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
                  <div className="flex-shrink-0 h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                    <FileText className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-lg font-medium">Medical Reports</h4>
                    <p className="text-gray-600">
                      Store and access all your diagnostic reports and test results in one secure place.
                    </p>
                  </div>
                </div>

                <div className="flex">
                  <div className="flex-shrink-0 h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                    <History className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-lg font-medium">Treatment History</h4>
                    <p className="text-gray-600">
                      Track your treatment progress and medication history over time for better health management.
                    </p>
                  </div>
                </div>
              </div>

              <Button className="mt-8 w-full sm:w-auto" onClick={() => setQrGenerated(true)}>
                Generate My Health QR
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
                                  src="/placeholder.svg?height=200&width=200"
                                  alt="Profile QR Code"
                                  className="w-48 h-48 mx-auto"
                                />
                              </div>
                              <h4 className="font-medium mb-2">Your Health Profile QR</h4>
                              <p className="text-sm text-gray-600 mb-4">
                                Scan this QR code to access your complete health profile
                              </p>
                              <div className="flex justify-center space-x-3">
                                <Button size="sm" variant="outline" className="flex items-center gap-1">
                                  <Download className="h-4 w-4" />
                                  Download
                                </Button>
                                <Button size="sm" variant="outline" className="flex items-center gap-1">
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
                                  src="/placeholder.svg?height=200&width=200"
                                  alt="Reports QR Code"
                                  className="w-48 h-48 mx-auto"
                                />
                              </div>
                              <h4 className="font-medium mb-2">Your Medical Reports QR</h4>
                              <p className="text-sm text-gray-600 mb-4">
                                Scan this QR code to access all your medical reports
                              </p>
                              <div className="flex justify-center space-x-3">
                                <Button size="sm" variant="outline" className="flex items-center gap-1">
                                  <Download className="h-4 w-4" />
                                  Download
                                </Button>
                                <Button size="sm" variant="outline" className="flex items-center gap-1">
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
                                  src="/placeholder.svg?height=200&width=200"
                                  alt="History QR Code"
                                  className="w-48 h-48 mx-auto"
                                />
                              </div>
                              <h4 className="font-medium mb-2">Your Treatment History QR</h4>
                              <p className="text-sm text-gray-600 mb-4">
                                Scan this QR code to access your treatment history
                              </p>
                              <div className="flex justify-center space-x-3">
                                <Button size="sm" variant="outline" className="flex items-center gap-1">
                                  <Download className="h-4 w-4" />
                                  Download
                                </Button>
                                <Button size="sm" variant="outline" className="flex items-center gap-1">
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
    </section>
  )
}

