import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Pill, AlertCircle, RefreshCw } from "lucide-react"

export default function Medications() {
  const medicationData = {
    currentMedications: [
      {
        name: "Metformin",
        dosage: "500mg",
        frequency: "Twice daily",
        prescribedBy: "Dr. Sharma",
        hospital: "City Hospital",
        startDate: "15 Jan, 2023",
        endDate: "15 Jan, 2024",
        source: "Generic Store",
        remainingDays: 45,
        totalDays: 365,
      },
      {
        name: "Amlodipine",
        dosage: "5mg",
        frequency: "Once daily",
        prescribedBy: "Dr. Sharma",
        hospital: "City Hospital",
        startDate: "15 Jan, 2023",
        endDate: "15 Jan, 2024",
        source: "Government Supply",
        remainingDays: 45,
        totalDays: 365,
      },
      {
        name: "Atorvastatin",
        dosage: "10mg",
        frequency: "Once daily at night",
        prescribedBy: "Dr. Sharma",
        hospital: "City Hospital",
        startDate: "15 Jan, 2023",
        endDate: "15 Jan, 2024",
        source: "Pharmacy",
        remainingDays: 15,
        totalDays: 365,
      },
    ],
    medicationPackages: [
      {
        name: "Diabetes Care Package",
        includes: ["Metformin", "Blood Sugar Testing Strips", "Vitamin B Complex"],
        price: "₹899",
        duration: "Monthly",
        nextRefill: "15 May, 2023",
        autoRefill: true,
      },
    ],
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Current Medications</h3>
        <Button variant="outline" size="sm" className="text-[#0070f3]">
          <Pill className="h-4 w-4 mr-2" />
          Add Medication
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Medication</TableHead>
            <TableHead>Dosage</TableHead>
            <TableHead>Frequency</TableHead>
            <TableHead>Prescribed By</TableHead>
            <TableHead>Source</TableHead>
            <TableHead>Remaining</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {medicationData.currentMedications.map((medication, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{medication.name}</TableCell>
              <TableCell>{medication.dosage}</TableCell>
              <TableCell>{medication.frequency}</TableCell>
              <TableCell>
                {medication.prescribedBy}
                <div className="text-xs text-gray-500">{medication.hospital}</div>
              </TableCell>
              <TableCell>
                <Badge
                  className={
                    medication.source === "Government Supply"
                      ? "bg-green-500"
                      : medication.source === "Generic Store"
                        ? "bg-[#43C6B8]"
                        : "bg-[#F97316]"
                  }
                >
                  {medication.source}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="w-32">
                  <div className="flex justify-between text-xs mb-1">
                    <span>{medication.remainingDays} days left</span>
                    <span>{Math.round((medication.remainingDays / medication.totalDays) * 100)}%</span>
                  </div>
                  <Progress
                    value={(medication.remainingDays / medication.totalDays) * 100}
                    className="h-2 bg-gray-200"
                    
                  />
                </div>
                {medication.remainingDays < 30 && (
                  <div className="flex items-center mt-1 text-xs text-red-500">
                    <AlertCircle className="h-3 w-3 mr-1" />
                    Refill soon
                  </div>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="pt-6">
        <h3 className="text-lg font-semibold mb-4">Medication Packages</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {medicationData.medicationPackages.map((pkg, index) => (
            <div key={index} className="border rounded-lg p-4">
              <div className="flex justify-between items-center">
                <h4 className="font-medium">{pkg.name}</h4>
                <Badge className="bg-[#43C6B8]">
                  {pkg.price} / {pkg.duration}
                </Badge>
              </div>
              <div className="mt-4">
                <h5 className="text-sm font-medium mb-2">Includes:</h5>
                <ul className="space-y-1">
                  {pkg.includes.map((item, idx) => (
                    <li key={idx} className="text-sm flex items-center">
                      <div className="h-4 w-4 rounded-full bg-[#43C6B8] flex items-center justify-center text-white text-xs mr-2">
                        ✓
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-4 pt-4 border-t flex justify-between items-center">
                <div>
                  <div className="text-sm">
                    Next Refill: <span className="font-medium">{pkg.nextRefill}</span>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {pkg.autoRefill ? "Auto-refill enabled" : "Auto-refill disabled"}
                  </div>
                </div>
                <Button size="sm" className="bg-[#0070f3] hover:bg-[#0060d3]">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Refill Now
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

