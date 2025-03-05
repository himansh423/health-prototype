"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Search, Upload, ShoppingCart, Pill } from "lucide-react"

const medicines = [
  {
    id: 1,
    name: "Metformin 500mg",
    category: "Diabetes",
    generic: true,
    price: 120,
    image: "/placeholder.svg?height=150&width=150",
    description: "Oral medication used to treat type 2 diabetes",
  },
  {
    id: 2,
    name: "Amlodipine 5mg",
    category: "Blood Pressure",
    generic: true,
    price: 85,
    image: "/placeholder.svg?height=150&width=150",
    description: "Calcium channel blocker used to treat high blood pressure",
  },
  {
    id: 3,
    name: "Atorvastatin 10mg",
    category: "Cholesterol",
    generic: true,
    price: 110,
    image: "/placeholder.svg?height=150&width=150",
    description: "Statin medication used to lower cholesterol levels",
  },
  {
    id: 4,
    name: "Levothyroxine 50mcg",
    category: "Thyroid",
    generic: true,
    price: 95,
    image: "/placeholder.svg?height=150&width=150",
    description: "Synthetic thyroid hormone for hypothyroidism",
  },
  {
    id: 5,
    name: "Omeprazole 20mg",
    category: "Gastric",
    generic: true,
    price: 75,
    image: "/placeholder.svg?height=150&width=150",
    description: "Proton pump inhibitor for acid reflux and ulcers",
  },
  {
    id: 6,
    name: "Azithromycin 500mg",
    category: "Antibiotic",
    generic: true,
    price: 130,
    image: "/placeholder.svg?height=150&width=150",
    description: "Antibiotic used to treat bacterial infections",
  },
]

export default function MedicineSection() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const filteredMedicines = medicines.filter(
    (medicine) =>
      medicine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      medicine.category.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0])
    }
  }

  return (
    <section id="medicines" className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[#0070f3] mb-4">Affordable Generic Medicines</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Access quality generic medications at affordable prices. Upload your prescription or search for specific
            medicines.
          </p>
        </div>

        <Tabs defaultValue="browse" className="max-w-5xl mx-auto">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="browse">Browse Medicines</TabsTrigger>
            <TabsTrigger value="prescription">Upload Prescription</TabsTrigger>
          </TabsList>

          <TabsContent value="browse">
            <div className="relative mb-8">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder="Search for medicines by name or category..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMedicines.map((medicine) => (
                <Card key={medicine.id} className="overflow-hidden hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2">
                    <div className="flex items-start">
                      <div className="w-20 h-20 mr-4 flex-shrink-0">
                        <img
                          src={medicine.image || "/placeholder.svg"}
                          alt={medicine.name}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{medicine.name}</CardTitle>
                        <div className="flex items-center mt-1">
                          <span className="text-sm text-gray-500">{medicine.category}</span>
                          {medicine.generic && (
                            <span className="ml-2 px-2 py-0.5 bg-green-100 text-green-800 text-xs rounded-full">
                              Generic
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600">{medicine.description}</p>
                    <p className="text-lg font-bold text-[#0070f3] mt-2">₹{medicine.price}</p>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full flex items-center gap-2 bg-[#0070f3]">
                      <ShoppingCart className="h-4 w-4" />
                      Add to Cart
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>

            {filteredMedicines.length === 0 && (
              <div className="text-center py-8">
                <Pill className="h-12 w-12 mx-auto text-gray-400" />
                <p className="mt-4 text-gray-600">No medicines found matching your search.</p>
              </div>
            )}

            <div className="text-center mt-8">
              <Button variant="outline">View All Medicines</Button>
            </div>
          </TabsContent>

          <TabsContent value="prescription">
            <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-lg p-8 text-center">
              <Upload className="h-12 w-12 mx-auto text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Upload Your Prescription</h3>
              <p className="text-gray-600 mb-6">
                Upload a clear image of your prescription. We'll process it and deliver your medicines to your doorstep.
              </p>

              <div className="max-w-sm mx-auto">
                <label className="block">
                  <span className="sr-only">Choose file</span>
                  <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
                  <Button
                    variant="outline"
                    className="w-full mb-4"
                    
                  >
                    Select Prescription
                  </Button>
                </label>

                {selectedFile && (
                  <div className="text-left p-3 bg-white rounded border mb-4">
                    <p className="text-sm font-medium truncate">{selectedFile.name}</p>
                    <p className="text-xs text-gray-500">{(selectedFile.size / 1024).toFixed(2)} KB</p>
                  </div>
                )}

                <Button className="w-full" disabled={!selectedFile}>
                  Upload & Process
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}

