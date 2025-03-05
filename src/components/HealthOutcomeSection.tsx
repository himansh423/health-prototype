"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Activity, TrendingUp, BarChart3, LineChart, PieChart } from "lucide-react"

export default function HealthOutcomesSection() {
  

  return (
    <section id="outcomes" className="py-16 bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-2 bg-[#0070f3]/10 rounded-full mb-4">
            <Activity className="h-6 w-6 text-[#0070f3]" />
          </div>
          <h2 className="text-3xl font-bold text-[#0070f3] mb-4">Measurable Health Outcomes</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Our AI-powered platform doesn&apos;t just provide affordable healthcare—it delivers measurable improvements in
            health outcomes for rural communities.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <Tabs defaultValue="diabetes">
            <div className="flex justify-center mb-8">
              <TabsList className="grid grid-cols-3 w-full max-w-md">
                <TabsTrigger value="diabetes">Diabetes</TabsTrigger>
                <TabsTrigger value="hypertension">Hypertension</TabsTrigger>
                <TabsTrigger value="maternal">Maternal Care</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="diabetes" className="mt-0">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <Card className="lg:col-span-1">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-[#0070f3]" />
                      Diabetes Management
                    </CardTitle>
                    <CardDescription>Impact of our diabetes care bundle on patient outcomes</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <h4 className="text-sm font-medium text-gray-500 mb-1">Average HbA1c Reduction</h4>
                        <div className="flex items-end">
                          <span className="text-3xl font-bold text-[#0070f3]">1.8%</span>
                          <span className="text-sm text-green-600 ml-2">↓ 28%</span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">After 6 months on the program</p>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium text-gray-500 mb-1">Medication Adherence</h4>
                        <div className="flex items-end">
                          <span className="text-3xl font-bold text-[#0070f3]">87%</span>
                          <span className="text-sm text-green-600 ml-2">↑ 42%</span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">Compared to pre-program baseline</p>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium text-gray-500 mb-1">Hospitalization Reduction</h4>
                        <div className="flex items-end">
                          <span className="text-3xl font-bold text-[#0070f3]">63%</span>
                          <span className="text-sm text-green-600 ml-2">↓ 63%</span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">Fewer diabetes-related hospitalizations</p>
                      </div>

                      <div className="pt-4 border-t">
                        <h4 className="font-medium mb-2">Key Factors</h4>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-start">
                            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#0070f3] mt-1.5 mr-2"></span>
                            <span>Regular blood glucose monitoring</span>
                          </li>
                          <li className="flex items-start">
                            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#0070f3] mt-1.5 mr-2"></span>
                            <span>Consistent medication access</span>
                          </li>
                          <li className="flex items-start">
                            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#0070f3] mt-1.5 mr-2"></span>
                            <span>Dietary guidance and follow-up</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle>Diabetes Outcomes Data</CardTitle>
                    <CardDescription>
                      Results from 5,000+ rural patients enrolled in our diabetes program
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="aspect-[16/9] bg-slate-50 rounded-lg flex items-center justify-center mb-6">
                      <div className="text-center p-8">
                        <LineChart className="h-16 w-16 mx-auto text-[#0070f3] mb-4" />
                        <p className="text-gray-500">Interactive chart showing HbA1c trends over time</p>
                        <p className="text-xs text-gray-400 mt-2">
                          (Visualization would appear here in the actual implementation)
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-green-50 p-4 rounded-lg">
                        <h4 className="font-medium text-green-800 mb-1">Cost Savings</h4>
                        <p className="text-2xl font-bold text-green-700">₹12,500</p>
                        <p className="text-xs text-green-600">Average annual savings per patient</p>
                      </div>
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <h4 className="font-medium text-blue-800 mb-1">Quality of Life</h4>
                        <p className="text-2xl font-bold text-blue-700">+42%</p>
                        <p className="text-xs text-blue-600">Improvement in quality of life scores</p>
                      </div>
                      <div className="bg-purple-50 p-4 rounded-lg">
                        <h4 className="font-medium text-purple-800 mb-1">Productivity</h4>
                        <p className="text-2xl font-bold text-purple-700">+18</p>
                        <p className="text-xs text-purple-600">Additional workdays per year</p>
                      </div>
                    </div>

                    <div className="mt-6 bg-slate-50 p-4 rounded-lg">
                      <h4 className="font-medium mb-2">Patient Testimonial</h4>
                      <blockquote className="text-gray-600 italic">
                        &quot;Before joining this program, I couldn&apos;t afford regular testing or medications. My blood sugar
                        was always high, and I felt terrible. Now, I can manage my diabetes for just ₹450 per month, and
                        I feel better than I have in years.&quot;
                      </blockquote>
                      <p className="text-sm font-medium mt-2">— Ramesh K., Farmer from Uttarakhand</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="hypertension" className="mt-0">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <Card className="lg:col-span-1">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-[#0070f3]" />
                      Hypertension Management
                    </CardTitle>
                    <CardDescription>Impact of our hypertension care bundle on patient outcomes</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <h4 className="text-sm font-medium text-gray-500 mb-1">BP Control Achievement</h4>
                        <div className="flex items-end">
                          <span className="text-3xl font-bold text-[#0070f3]">72%</span>
                          <span className="text-sm text-green-600 ml-2">↑ 58%</span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">Patients achieving BP control</p>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium text-gray-500 mb-1">Medication Adherence</h4>
                        <div className="flex items-end">
                          <span className="text-3xl font-bold text-[#0070f3]">91%</span>
                          <span className="text-sm text-green-600 ml-2">↑ 47%</span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">Compared to pre-program baseline</p>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium text-gray-500 mb-1">Stroke Risk Reduction</h4>
                        <div className="flex items-end">
                          <span className="text-3xl font-bold text-[#0070f3]">38%</span>
                          <span className="text-sm text-green-600 ml-2">↓ 38%</span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">Estimated reduction in stroke risk</p>
                      </div>

                      <div className="pt-4 border-t">
                        <h4 className="font-medium mb-2">Key Factors</h4>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-start">
                            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#0070f3] mt-1.5 mr-2"></span>
                            <span>Home BP monitoring</span>
                          </li>
                          <li className="flex items-start">
                            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#0070f3] mt-1.5 mr-2"></span>
                            <span>Consistent medication access</span>
                          </li>
                          <li className="flex items-start">
                            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#0070f3] mt-1.5 mr-2"></span>
                            <span>Lifestyle modification support</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle>Hypertension Outcomes Data</CardTitle>
                    <CardDescription>
                      Results from 7,200+ rural patients enrolled in our hypertension program
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="aspect-[16/9] bg-slate-50 rounded-lg flex items-center justify-center mb-6">
                      <div className="text-center p-8">
                        <BarChart3 className="h-16 w-16 mx-auto text-[#0070f3] mb-4" />
                        <p className="text-gray-500">Interactive chart showing blood pressure control rates</p>
                        <p className="text-xs text-gray-400 mt-2">
                          (Visualization would appear here in the actual implementation)
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-green-50 p-4 rounded-lg">
                        <h4 className="font-medium text-green-800 mb-1">Cost Savings</h4>
                        <p className="text-2xl font-bold text-green-700">₹9,800</p>
                        <p className="text-xs text-green-600">Average annual savings per patient</p>
                      </div>
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <h4 className="font-medium text-blue-800 mb-1">Quality of Life</h4>
                        <p className="text-2xl font-bold text-blue-700">+36%</p>
                        <p className="text-xs text-blue-600">Improvement in quality of life scores</p>
                      </div>
                      <div className="bg-purple-50 p-4 rounded-lg">
                        <h4 className="font-medium text-purple-800 mb-1">Productivity</h4>
                        <p className="text-2xl font-bold text-purple-700">+22</p>
                        <p className="text-xs text-purple-600">Additional workdays per year</p>
                      </div>
                    </div>

                    <div className="mt-6 bg-slate-50 p-4 rounded-lg">
                      <h4 className="font-medium mb-2">Patient Testimonial</h4>
                      <blockquote className="text-gray-600 italic">
                        &quot;I used to get my BP checked only when I felt dizzy. Now I can monitor it at home and take my
                        medicines regularly. My headaches are gone, and I can work in the fields all day without feeling
                        exhausted.&quot;
                      </blockquote>
                      <p className="text-sm font-medium mt-2">— Sunita D., Homemaker from Haridwar</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="maternal" className="mt-0">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <Card className="lg:col-span-1">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-[#0070f3]" />
                      Maternal Care Outcomes
                    </CardTitle>
                    <CardDescription>Impact of our maternal care bundle on mother and child health</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <h4 className="text-sm font-medium text-gray-500 mb-1">Prenatal Visit Completion</h4>
                        <div className="flex items-end">
                          <span className="text-3xl font-bold text-[#0070f3]">94%</span>
                          <span className="text-sm text-green-600 ml-2">↑ 62%</span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">Mothers completing all recommended visits</p>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium text-gray-500 mb-1">Institutional Deliveries</h4>
                        <div className="flex items-end">
                          <span className="text-3xl font-bold text-[#0070f3]">89%</span>
                          <span className="text-sm text-green-600 ml-2">↑ 53%</span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">Compared to regional average</p>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium text-gray-500 mb-1">Anemia Reduction</h4>
                        <div className="flex items-end">
                          <span className="text-3xl font-bold text-[#0070f3]">68%</span>
                          <span className="text-sm text-green-600 ml-2">↓ 68%</span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">Reduction in maternal anemia cases</p>
                      </div>

                      <div className="pt-4 border-t">
                        <h4 className="font-medium mb-2">Key Factors</h4>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-start">
                            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#0070f3] mt-1.5 mr-2"></span>
                            <span>Regular prenatal check-ups</span>
                          </li>
                          <li className="flex items-start">
                            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#0070f3] mt-1.5 mr-2"></span>
                            <span>Nutritional supplements</span>
                          </li>
                          <li className="flex items-start">
                            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#0070f3] mt-1.5 mr-2"></span>
                            <span>Birth preparedness counseling</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle>Maternal Care Outcomes Data</CardTitle>
                    <CardDescription>
                      Results from 3,800+ rural mothers enrolled in our maternal care program
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="aspect-[16/9] bg-slate-50 rounded-lg flex items-center justify-center mb-6">
                      <div className="text-center p-8">
                        <PieChart className="h-16 w-16 mx-auto text-[#0070f3] mb-4" />
                        <p className="text-gray-500">Interactive chart showing maternal and infant health outcomes</p>
                        <p className="text-xs text-gray-400 mt-2">
                          (Visualization would appear here in the actual implementation)
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-green-50 p-4 rounded-lg">
                        <h4 className="font-medium text-green-800 mb-1">Healthy Births</h4>
                        <p className="text-2xl font-bold text-green-700">97.8%</p>
                        <p className="text-xs text-green-600">Healthy birth rate in program</p>
                      </div>
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <h4 className="font-medium text-blue-800 mb-1">Birth Weight</h4>
                        <p className="text-2xl font-bold text-blue-700">+18%</p>
                        <p className="text-xs text-blue-600">Increase in healthy birth weight</p>
                      </div>
                      <div className="bg-purple-50 p-4 rounded-lg">
                        <h4 className="font-medium text-purple-800 mb-1">Breastfeeding</h4>
                        <p className="text-2xl font-bold text-purple-700">92%</p>
                        <p className="text-xs text-purple-600">Exclusive breastfeeding at 6 months</p>
                      </div>
                    </div>

                    <div className="mt-6 bg-slate-50 p-4 rounded-lg">
                      <h4 className="font-medium mb-2">Patient Testimonial</h4>
                      <blockquote className="text-gray-600 italic">
                        &quot;During my first pregnancy, I had many complications. With this program, I received regular
                        check-ups, proper nutrition, and all the care I needed. My baby was born healthy, and I
                        recovered quickly.&quot;
                      </blockquote>
                      <p className="text-sm font-medium mt-2">— Priya S., Teacher from Rishikesh</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>

          <div className="mt-12 text-center">
            <Button size="lg" className="bg-[#0070f3]">
              View All Health Outcome Reports
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

