import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Wifi, WifiOff, Languages, Phone, Smartphone } from "lucide-react"

export default function RuralAccessibilitySection() {
  return (
    <section className="py-16 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-2 bg-[#0070f3]/10 rounded-full mb-4">
            <MapPin className="h-6 w-6 text-[#0070f3]" />
          </div>
          <h2 className="text-3xl font-bold text-[#0070f3] mb-4">Rural Accessibility Features</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Our platform is specifically designed to overcome connectivity and accessibility challenges faced by rural
            communities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <WifiOff className="h-5 w-5 text-[#0070f3]" />
                    Offline Mode
                  </CardTitle>
                  <CardDescription>Access healthcare without internet</CardDescription>
                </div>
                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                  Essential
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Our app works seamlessly in areas with limited or no internet connectivity, ensuring rural users can
                access their health information anytime.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start text-sm">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#0070f3] mt-1.5 mr-2"></span>
                  <span>Pre-downloaded medical records and prescriptions</span>
                </li>
                <li className="flex items-start text-sm">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#0070f3] mt-1.5 mr-2"></span>
                  <span>Offline medication reminders and dosage information</span>
                </li>
                <li className="flex items-start text-sm">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#0070f3] mt-1.5 mr-2"></span>
                  <span>Automatic sync when connectivity is restored</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Languages className="h-5 w-5 text-[#0070f3]" />
                    Multilingual Support
                  </CardTitle>
                  <CardDescription>Content in local languages</CardDescription>
                </div>
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  Inclusive
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Our platform supports multiple regional languages, making healthcare information accessible to
                non-English speaking rural populations.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start text-sm">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#0070f3] mt-1.5 mr-2"></span>
                  <span>Interface available in 12 Indian languages</span>
                </li>
                <li className="flex items-start text-sm">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#0070f3] mt-1.5 mr-2"></span>
                  <span>Voice-based navigation for low literacy users</span>
                </li>
                <li className="flex items-start text-sm">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#0070f3] mt-1.5 mr-2"></span>
                  <span>Pictorial guides for medication and health instructions</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Phone className="h-5 w-5 text-[#0070f3]" />
                    Basic Phone Access
                  </CardTitle>
                  <CardDescription>Works on feature phones via SMS</CardDescription>
                </div>
                <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                  Universal
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Not everyone has a smartphone. Our SMS-based service ensures even basic phone users can access essential
                healthcare services.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start text-sm">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#0070f3] mt-1.5 mr-2"></span>
                  <span>SMS reminders for medication and appointments</span>
                </li>
                <li className="flex items-start text-sm">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#0070f3] mt-1.5 mr-2"></span>
                  <span>USSD codes for checking medicine availability</span>
                </li>
                <li className="flex items-start text-sm">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#0070f3] mt-1.5 mr-2"></span>
                  <span>IVR system for health queries and emergencies</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Smartphone className="h-5 w-5 text-[#0070f3]" />
                    Low-Resource App
                  </CardTitle>
                  <CardDescription>Works on entry-level smartphones</CardDescription>
                </div>
                <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                  Optimized
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Our app is optimized to work on entry-level smartphones with minimal storage and processing power.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start text-sm">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#0070f3] mt-1.5 mr-2"></span>
                  <span>Less than 10MB app size with progressive loading</span>
                </li>
                <li className="flex items-start text-sm">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#0070f3] mt-1.5 mr-2"></span>
                  <span>Minimal battery consumption for all-day use</span>
                </li>
                <li className="flex items-start text-sm">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#0070f3] mt-1.5 mr-2"></span>
                  <span>Works on 2G networks with minimal data usage</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Wifi className="h-5 w-5 text-[#0070f3]" />
                    Community Hotspots
                  </CardTitle>
                  <CardDescription>Village-level access points</CardDescription>
                </div>
                <Badge variant="outline" className="bg-indigo-50 text-indigo-700 border-indigo-200">
                  Community
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                We establish community digital access points in villages where users can sync their data and access
                additional services.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start text-sm">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#0070f3] mt-1.5 mr-2"></span>
                  <span>Solar-powered Wi-Fi hotspots at village centers</span>
                </li>
                <li className="flex items-start text-sm">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#0070f3] mt-1.5 mr-2"></span>
                  <span>Trained local facilitators to assist with technology</span>
                </li>
                <li className="flex items-start text-sm">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#0070f3] mt-1.5 mr-2"></span>
                  <span>Periodic health camps with digital registration</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="mt-12 bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto">
          <h3 className="text-xl font-semibold mb-4 text-[#0070f3]">Our Rural Coverage</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <p className="text-3xl font-bold text-[#0070f3]">1,200+</p>
              <p className="text-gray-600">Villages Covered</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-[#0070f3]">42</p>
              <p className="text-gray-600">Districts</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-[#0070f3]">8</p>
              <p className="text-gray-600">States</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-[#0070f3]">250,000+</p>
              <p className="text-gray-600">Rural Users</p>
            </div>
          </div>
          <div className="mt-6 text-center ">
            <Button className="bg-[#0070f3]">Check Coverage In Your Area</Button>
          </div>
        </div>
      </div>
    </section>
  )
}

