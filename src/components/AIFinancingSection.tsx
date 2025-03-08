"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Progress } from "@/components/ui/progress"
import { BrainCircuit, Landmark, Calculator, BadgePercent, Calendar, Loader2 } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

type RecommendationType = "subscription" | "tiered" | "microinsurance"

interface Recommendation {
  recommendedOption: RecommendationType
  confidenceScore: number
  reasoning: string
  customizedAdvice: string
}

export default function AIFinancingSection() {
  const [incomeRange, setIncomeRange] = useState([15000])
  const [familySize, setFamilySize] = useState([4])
  const [healthCondition, setHealthCondition] = useState("chronic")
  const [recommendation, setRecommendation] = useState<Recommendation | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Fallback recommendation in case API fails
  const getFallbackRecommendation = (): RecommendationType => {
    const income = incomeRange[0]
    const members = familySize[0]

    if (income < 10000 && healthCondition === "chronic") {
      return "microinsurance"
    } else if (income < 20000 || members > 4) {
      return "tiered"
    } else {
      return "subscription"
    }
  }

  const getRecommendation = async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/gemini", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          income: incomeRange[0],
          familySize: familySize[0],
          healthCondition,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to get recommendation")
      }

      const data = await response.json()
      setRecommendation(data)
    } catch (err) {
      console.error("Error fetching recommendation:", err)
      setError("Unable to get AI recommendation. Using fallback logic instead.")
      // Set a fallback recommendation
      setRecommendation({
        recommendedOption: getFallbackRecommendation(),
        confidenceScore: 75,
        reasoning: "Based on your profile, this option seems most suitable.",
        customizedAdvice: "Consider exploring all options to find the best fit for your needs.",
      })
    } finally {
      setLoading(false)
    }
  }

  // Get recommendation when parameters change (with debounce)
  useEffect(() => {
    const timer = setTimeout(() => {
      getRecommendation()
    }, 500)

    return () => clearTimeout(timer)
  }, [incomeRange[0], familySize[0], healthCondition])

  return (
    <section id="financing" className="py-16 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-2 bg-[#0070f3]/10 rounded-full mb-4">
            <BrainCircuit className="h-6 w-6 text-[#0070f3]" />
          </div>
          <h2 className="text-3xl font-bold text-[#0070f3] mb-4">AI-Powered Financing Solutions</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Our intelligent system analyzes your needs and financial situation to recommend the most suitable healthcare
            financing option for you and your family.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Find Your Ideal Plan</CardTitle>
                <CardDescription>Adjust the parameters to see our AI recommendation</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <label className="text-sm font-medium">Monthly Household Income</label>
                    <span className="text-sm font-medium">₹{incomeRange[0].toLocaleString()}</span>
                  </div>
                  <Slider
                    className="bg-[#0070f3]"
                    value={incomeRange}
                    min={5000}
                    max={50000}
                    step={1000}
                    onValueChange={setIncomeRange}
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>₹5,000</span>
                    <span>₹50,000</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <label className="text-sm font-medium">Family Size</label>
                    <span className="text-sm font-medium">{familySize[0]} members</span>
                  </div>
                  <Slider value={familySize} min={1} max={8} step={1} onValueChange={setFamilySize} />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>1</span>
                    <span>8+</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-medium">Health Condition</label>
                  <div className="grid grid-cols-3 gap-2">
                    <Button
                      variant={healthCondition === "healthy" ? "default" : "outline"}
                      className={`h-auto py-2 ${healthCondition === "healthy" ? "bg-[#0070f3] text-white" : "bg-white text-black"}`}
                      onClick={() => setHealthCondition("healthy")}
                    >
                      Healthy
                    </Button>
                    <Button
                      variant={healthCondition === "minor" ? "default" : "outline"}
                      className={`h-auto py-2 ${healthCondition === "minor" ? "bg-[#0070f3] text-white" : "bg-white text-black"}`}
                      onClick={() => setHealthCondition("minor")}
                    >
                      Minor
                    </Button>
                    <Button
                      variant={healthCondition === "chronic" ? "default" : "outline"}
                      className={`h-auto py-2 ${healthCondition === "chronic" ? "bg-[#0070f3] text-white" : "bg-white text-black"}`}
                      onClick={() => setHealthCondition("chronic")}
                    >
                      Chronic
                    </Button>
                  </div>
                </div>

                {loading && (
                  <div className="flex items-center justify-center py-2">
                    <Loader2 className="h-5 w-5 text-[#0070f3] animate-spin mr-2" />
                    <span className="text-sm">Analyzing your profile...</span>
                  </div>
                )}

                {error && (
                  <Alert variant="destructive" className="bg-red-50 border-red-200 text-red-800">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
              </CardContent>
              <CardFooter>
                <div className="w-full">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">AI Confidence Score</span>
                    <span className="text-sm font-medium">{recommendation?.confidenceScore || 92}%</span>
                  </div>
                  <Progress value={recommendation?.confidenceScore || 92} className="h-2" />
                </div>
              </CardFooter>
            </Card>
          </div>

          <div className="lg:col-span-2">
            <Tabs
              defaultValue={recommendation?.recommendedOption || "subscription"}
              value={recommendation?.recommendedOption || "subscription"}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger
                  value="subscription"
                  className="data-[state=active]:bg-[#0070f3] data-[state=active]:text-white"
                >
                  Subscription
                </TabsTrigger>
                <TabsTrigger value="tiered" className="data-[state=active]:bg-[#0070f3] data-[state=active]:text-white">
                  Tiered Pricing
                </TabsTrigger>
                <TabsTrigger
                  value="microinsurance"
                  className="data-[state=active]:bg-[#0070f3] data-[state=active]:text-white"
                >
                  Microinsurance
                </TabsTrigger>
              </TabsList>

              <div className="mt-6 bg-white rounded-lg border p-1">
                {recommendation && (
                  <div className="bg-green-50 text-green-800 px-4 py-2 rounded flex items-center text-sm">
                    <BadgePercent className="h-4 w-4 mr-2" />
                    AI Recommendation:{" "}
                    {recommendation.recommendedOption === "subscription"
                      ? "Subscription model"
                      : recommendation.recommendedOption === "tiered"
                        ? "Tiered pricing"
                        : "Microinsurance"}{" "}
                    is ideal for your profile
                  </div>
                )}
              </div>

              {recommendation && (
                <div className="mt-3 bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-medium text-[#0070f3] mb-2">AI Analysis</h4>
                  <p className="text-sm text-gray-700">{recommendation.reasoning}</p>
                  <p className="text-sm text-gray-700 mt-2 font-medium">{recommendation.customizedAdvice}</p>
                </div>
              )}

              <TabsContent value="subscription" className="mt-4">
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <Calendar className="h-6 w-6 text-[#0070f3]" />
                      <div>
                        <CardTitle>Monthly Subscription Model</CardTitle>
                        <CardDescription>Fixed monthly payments for continuous healthcare access</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p>
                        Our subscription model provides a predictable monthly payment that covers all your essential
                        healthcare needs, including:
                      </p>

                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#0070f3] mt-1.5 mr-2"></span>
                          <span>Unlimited access to generic medications for covered conditions</span>
                        </li>
                        <li className="flex items-start">
                          <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#0070f3] mt-1.5 mr-2"></span>
                          <span>Regular diagnostic tests as per your health plan</span>
                        </li>
                        <li className="flex items-start">
                          <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#0070f3] mt-1.5 mr-2"></span>
                          <span>Teleconsultations with healthcare providers</span>
                        </li>
                        <li className="flex items-start">
                          <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#0070f3] mt-1.5 mr-2"></span>
                          <span>Health monitoring and personalized recommendations</span>
                        </li>
                      </ul>

                      <div className="bg-blue-50 p-4 rounded-lg">
                        <h4 className="font-medium text-[#0070f3] mb-2">Why This Works For You</h4>
                        <p className="text-sm text-gray-700">
                          Based on your income of ₹{incomeRange[0].toLocaleString()}, family size of {familySize[0]},
                          and health condition, a subscription model provides the most cost-effective and comprehensive
                          coverage for your needs.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full bg-[#0070f3]">View Subscription Plans</Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="tiered" className="mt-4">
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <Calculator className="h-6 w-6 text-[#0070f3]" />
                      <div>
                        <CardTitle>Tiered Pricing Model</CardTitle>
                        <CardDescription>Pay based on your income level and healthcare needs</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p>
                        Our tiered pricing model adjusts costs based on your income bracket, ensuring healthcare remains
                        affordable:
                      </p>

                      <div className="grid grid-cols-3 gap-3 mb-4">
                        <div className="border rounded-lg p-3 text-center">
                          <div className="text-xs text-gray-500 mb-1">Tier 1</div>
                          <div className="font-semibold">₹200-300</div>
                          <div className="text-xs text-gray-500 mt-1">Income &lt;₹10k</div>
                        </div>
                        <div className="border rounded-lg p-3 text-center">
                          <div className="text-xs text-gray-500 mb-1">Tier 2</div>
                          <div className="font-semibold">₹300-400</div>
                          <div className="text-xs text-gray-500 mt-1">₹10k-₹20k</div>
                        </div>
                        <div className="border rounded-lg p-3 text-center">
                          <div className="text-xs text-gray-500 mb-1">Tier 3</div>
                          <div className="font-semibold">₹400-500</div>
                          <div className="text-xs text-gray-500 mt-1">₹20k+</div>
                        </div>
                      </div>

                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#0070f3] mt-1.5 mr-2"></span>
                          <span>Same quality healthcare regardless of tier</span>
                        </li>
                        <li className="flex items-start">
                          <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#0070f3] mt-1.5 mr-2"></span>
                          <span>Subsidized rates for lower income households</span>
                        </li>
                        <li className="flex items-start">
                          <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#0070f3] mt-1.5 mr-2"></span>
                          <span>Flexible payment options based on seasonal income</span>
                        </li>
                      </ul>

                      <div className="bg-blue-50 p-4 rounded-lg">
                        <h4 className="font-medium text-[#0070f3] mb-2">Why This Works For You</h4>
                        <p className="text-sm text-gray-700">
                          With your income level and family size, our tiered pricing ensures you pay a fair amount while
                          still receiving comprehensive healthcare coverage for all family members.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full bg-[#0070f3]">Check Your Tier</Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="microinsurance" className="mt-4">
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <Landmark className="h-6 w-6 text-[#0070f3]" />
                      <div>
                        <CardTitle>Microinsurance Model</CardTitle>
                        <CardDescription>Low-cost insurance for essential healthcare needs</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p>Our microinsurance model provides affordable coverage for essential healthcare services:</p>

                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#0070f3] mt-1.5 mr-2"></span>
                          <span>Low premiums starting at just ₹100 per month</span>
                        </li>
                        <li className="flex items-start">
                          <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#0070f3] mt-1.5 mr-2"></span>
                          <span>Coverage for basic medications and diagnostic tests</span>
                        </li>
                        <li className="flex items-start">
                          <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#0070f3] mt-1.5 mr-2"></span>
                          <span>Additional coverage for chronic conditions</span>
                        </li>
                        <li className="flex items-start">
                          <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#0070f3] mt-1.5 mr-2"></span>
                          <span>No paperwork, simple claims process via mobile</span>
                        </li>
                      </ul>

                      <div className="grid grid-cols-2 gap-3 mb-4">
                        <div className="border rounded-lg p-3">
                          <div className="text-xs text-gray-500 mb-1">Basic Coverage</div>
                          <div className="font-semibold">₹100-200/month</div>
                          <div className="text-xs text-gray-500 mt-1">Essential medications</div>
                        </div>
                        <div className="border rounded-lg p-3">
                          <div className="text-xs text-gray-500 mb-1">Extended Coverage</div>
                          <div className="font-semibold">₹200-300/month</div>
                          <div className="text-xs text-gray-500 mt-1">Includes chronic care</div>
                        </div>
                      </div>

                      <div className="bg-blue-50 p-4 rounded-lg">
                        <h4 className="font-medium text-[#0070f3] mb-2">Why This Works For You</h4>
                        <p className="text-sm text-gray-700">
                          With your chronic health condition and income level, microinsurance provides targeted coverage
                          for your specific healthcare needs at the most affordable rate.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full bg-[#0070f3]">Explore Microinsurance</Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </section>
  )
}