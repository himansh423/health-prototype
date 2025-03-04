import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Building2, FileCheck, Users, ArrowRight, CheckCircle2 } from "lucide-react"

export default function GovernmentIntegrationSection() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-2 bg-primary/10 rounded-full mb-4">
            <Building2 className="h-6 w-6 text-primary" />
          </div>
          <h2 className="text-3xl font-bold text-primary mb-4">Government Healthcare Integration</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Our platform seamlessly integrates with government healthcare schemes and infrastructure to maximize
            benefits for rural communities.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <Card className="lg:col-span-1 bg-gradient-to-br from-blue-50 to-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileCheck className="h-5 w-5 text-primary" />
                Supported Government Schemes
              </CardTitle>
              <CardDescription>We integrate with these national healthcare programs</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-center p-3 bg-white rounded-lg shadow-sm">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3 flex-shrink-0">
                    <span className="font-semibold text-primary">AB</span>
                  </div>
                  <div>
                    <h4 className="font-medium">Ayushman Bharat</h4>
                    <p className="text-xs text-gray-500">Health insurance for low-income families</p>
                  </div>
                </li>
                <li className="flex items-center p-3 bg-white rounded-lg shadow-sm">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3 flex-shrink-0">
                    <span className="font-semibold text-primary">PM</span>
                  </div>
                  <div>
                    <h4 className="font-medium">PM-JAY</h4>
                    <p className="text-xs text-gray-500">Pradhan Mantri Jan Arogya Yojana</p>
                  </div>
                </li>
                <li className="flex items-center p-3 bg-white rounded-lg shadow-sm">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3 flex-shrink-0">
                    <span className="font-semibold text-primary">NHM</span>
                  </div>
                  <div>
                    <h4 className="font-medium">National Health Mission</h4>
                    <p className="text-xs text-gray-500">Rural & urban health initiatives</p>
                  </div>
                </li>
                <li className="flex items-center p-3 bg-white rounded-lg shadow-sm">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3 flex-shrink-0">
                    <span className="font-semibold text-primary">PMSBY</span>
                  </div>
                  <div>
                    <h4 className="font-medium">Suraksha Bima Yojana</h4>
                    <p className="text-xs text-gray-500">Accident insurance scheme</p>
                  </div>
                </li>
              </ul>
              <Button variant="outline" className="w-full mt-4">
                Check Eligibility
              </Button>
            </CardContent>
          </Card>

          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                Integration Benefits
              </CardTitle>
              <CardDescription>How our platform enhances government healthcare initiatives</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium flex items-center gap-2 mb-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    Streamlined Eligibility
                  </h4>
                  <p className="text-sm text-gray-600">
                    Our AI system automatically checks your eligibility for government schemes and applies benefits to
                    your healthcare costs.
                  </p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium flex items-center gap-2 mb-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    Paperless Documentation
                  </h4>
                  <p className="text-sm text-gray-600">
                    Digital verification and documentation eliminates paperwork and reduces approval times from weeks to
                    minutes.
                  </p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium flex items-center gap-2 mb-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    Combined Benefits
                  </h4>
                  <p className="text-sm text-gray-600">
                    Stack government benefits with our financing options to further reduce your out-of-pocket healthcare
                    expenses.
                  </p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium flex items-center gap-2 mb-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    Rural Health Infrastructure
                  </h4>
                  <p className="text-sm text-gray-600">
                    We partner with government PHCs and CHCs to enhance service delivery in remote areas.
                  </p>
                </div>
              </div>

              <div className="mt-6 bg-blue-50 p-4 rounded-lg">
                <h4 className="font-medium mb-2">How It Works</h4>
                <ol className="space-y-2">
                  <li className="flex items-start">
                    <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-primary text-white text-xs mr-2 flex-shrink-0">
                      1
                    </span>
                    <span className="text-sm">Link your government ID (Aadhaar) to your profile</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-primary text-white text-xs mr-2 flex-shrink-0">
                      2
                    </span>
                    <span className="text-sm">Our system verifies your eligibility for various schemes</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-primary text-white text-xs mr-2 flex-shrink-0">
                      3
                    </span>
                    <span className="text-sm">Benefits are automatically applied to your healthcare costs</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-primary text-white text-xs mr-2 flex-shrink-0">
                      4
                    </span>
                    <span className="text-sm">Receive a consolidated statement of all benefits utilized</span>
                  </li>
                </ol>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto">
          <h3 className="text-xl font-semibold mb-4 text-primary">Public-Private Partnership Model</h3>
          <p className="text-gray-600 mb-6">
            Our platform operates on a unique public-private partnership model that enhances government healthcare
            delivery while ensuring sustainability:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Building2 className="h-8 w-8 text-primary" />
              </div>
              <h4 className="font-medium mb-2">Government</h4>
              <p className="text-sm text-gray-500">Provides policy framework, subsidies, and infrastructure access</p>
            </div>
            <div className="text-center p-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileCheck className="h-8 w-8 text-primary" />
              </div>
              <h4 className="font-medium mb-2">Our Platform</h4>
              <p className="text-sm text-gray-500">Delivers technology, financing solutions, and quality assurance</p>
            </div>
            <div className="text-center p-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h4 className="font-medium mb-2">Community</h4>
              <p className="text-sm text-gray-500">Participates through local health workers and feedback mechanisms</p>
            </div>
          </div>
          <div className="mt-6 text-center">
            <Button className="group">
              <span>Learn More About Our Government Partnerships</span>
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

