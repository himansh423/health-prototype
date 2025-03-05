import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CrossIcon as MedicalCross, Stethoscope, Pill, Activity, ArrowRight } from "lucide-react"

const bundledPackages = [
  {
    id: 1,
    name: "Diabetes Care Bundle",
    price: "₹450",
    period: "per month",
    description: "Complete diabetes management package with tests and medications",
    image: "/placeholder.svg?height=200&width=300",
    includes: [
      "Monthly blood glucose monitoring kit (50 strips)",
      "Metformin 500mg (60 tablets)",
      "Glimepiride 1mg (30 tablets)",
      "Quarterly HbA1c test",
      "Diet consultation (monthly)",
    ],
    savings: "30%",
    icon: <Activity className="h-10 w-10 text-[#0070f3]" />,
  },
  {
    id: 2,
    name: "Hypertension Care Bundle",
    price: "₹350",
    period: "per month",
    description: "Essential monitoring and medication for blood pressure management",
    image: "/placeholder.svg?height=200&width=300",
    includes: [
      "Digital BP monitor (one-time)",
      "Amlodipine 5mg (30 tablets)",
      "Telmisartan 40mg (30 tablets)",
      "Quarterly lipid profile test",
      "ECG test (bi-annual)",
    ],
    savings: "25%",
    icon: <Stethoscope className="h-10 w-10 text-[#0070f3]" />,
  },
  {
    id: 3,
    name: "Maternal Care Bundle",
    price: "₹500",
    period: "per month",
    description: "Comprehensive prenatal and postnatal care package",
    image: "/placeholder.svg?height=200&width=300",
    includes: [
      "Monthly prenatal check-up",
      "Folic acid & iron supplements",
      "Calcium supplements",
      "Two ultrasound scans",
      "Postnatal care visits (3)",
    ],
    savings: "35%",
    icon: <MedicalCross className="h-10 w-10 text-[#0070f3]" />,
  },
  {
    id: 4,
    name: "General Wellness Bundle",
    price: "₹400",
    period: "per month",
    description: "Preventive healthcare package for overall wellbeing",
    image: "/placeholder.svg?height=200&width=300",
    includes: [
      "Annual comprehensive health check-up",
      "Multivitamin supplements",
      "Quarterly basic blood tests",
      "Preventive health consultation",
      "Immunity booster supplements",
    ],
    savings: "20%",
    icon: <Pill className="h-10 w-10 text-[#0070f3]" />,
  },
]

export default function BundledPackagesSection() {
  return (
    <section id="bundles" className="py-16 bg-gradient-to-b from-white to-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold  mb-4 text-[#0070f3]">Bundled Healthcare Packages</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Save on healthcare costs with our AI-recommended bundled packages that combine diagnostic tests and
            medications for specific health conditions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {bundledPackages.map((bundle) => (
            <Card
              key={bundle.id}
              className="overflow-hidden hover:shadow-lg transition-all duration-300 border-t-4 border-t-[#0070f3]"
            >
              <div className="p-6 bg-primary/5 flex justify-center ">{bundle.icon}</div>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl">{bundle.name}</CardTitle>
                    <CardDescription>{bundle.description}</CardDescription>
                  </div>
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    Save {bundle.savings}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <span className="text-2xl font-bold text-[#0070f3]">{bundle.price}</span>
                  <span className="text-gray-500 ml-1">{bundle.period}</span>
                </div>
                <ul className="space-y-2">
                  {bundle.includes.map((item, idx) => (
                    <li key={idx} className="flex items-start text-sm">
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#0070f3] mt-1.5 mr-2 flex-shrink-0"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full group bg-[#14b8a6]">
                  <span>Subscribe Now</span>
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-12 bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto">
          <h3 className="text-xl font-semibold mb-4 text-[#0070f3]">How Our AI-Powered Bundling Works</h3>
          <p className="text-gray-600 mb-4">
            Our artificial intelligence system analyzes thousands of healthcare data points to create optimized bundles
            that:
          </p>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <li className="flex items-start">
              <div className="h-8 w-8 rounded-full bg-[#0070f3]/10 flex items-center justify-center mr-3 flex-shrink-0">
                <span className="text-[#0070f3] font-medium">1</span>
              </div>
              <div>
                <h4 className="font-medium">Personalized Recommendations</h4>
                <p className="text-sm text-gray-500">Tailored to your specific health profile and needs</p>
              </div>
            </li>
            <li className="flex items-start">
              <div className="h-8 w-8 rounded-full bg-[#0070f3]/10 flex items-center justify-center mr-3 flex-shrink-0">
                <span className="text-[#0070f3] font-medium">2</span>
              </div>
              <div>
                <h4 className="font-medium">Cost Optimization</h4>
                <p className="text-sm text-gray-500">Reduces expenses by 20-35% compared to individual purchases</p>
              </div>
            </li>
            <li className="flex items-start">
              <div className="h-8 w-8 rounded-full bg-[#0070f3]/10 flex items-center justify-center mr-3 flex-shrink-0">
                <span className="text-[#0070f3] font-medium">3</span>
              </div>
              <div>
                <h4 className="font-medium">Adherence Tracking</h4>
                <p className="text-sm text-gray-500">Monitors your medication and testing schedule</p>
              </div>
            </li>
            <li className="flex items-start">
              <div className="h-8 w-8 rounded-full bg-[#0070f3]/10 flex items-center justify-center mr-3 flex-shrink-0">
                <span className="text-[#0070f3] font-medium">4</span>
              </div>
              <div>
                <h4 className="font-medium">Outcome Prediction</h4>
                <p className="text-sm text-gray-500">Forecasts health improvements based on bundle adherence</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}

