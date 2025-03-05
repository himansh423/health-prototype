import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, Download, TrendingUp } from "lucide-react"

export default function MedicalHistory() {
  const medicalData = {
    conditions: [
      { name: "Type 2 Diabetes", diagnosedDate: "10 Jan, 2020", status: "Active", severity: "Moderate" },
      { name: "Hypertension", diagnosedDate: "15 Mar, 2021", status: "Active", severity: "Mild" },
      { name: "Hyperlipidemia", diagnosedDate: "22 Jun, 2021", status: "Active", severity: "Mild" },
    ],
    surgeries: [
      { name: "Appendectomy", date: "05 May, 2015", hospital: "District Hospital, Varanasi", doctor: "Dr. Patel" },
    ],
    allergies: [
      { type: "Medicine", name: "Penicillin", reaction: "Skin rash, itching", severity: "Moderate" },
      { type: "Food", name: "Peanuts", reaction: "Swelling, difficulty breathing", severity: "Severe" },
    ],
    hospitalVisits: [
      {
        hospital: "City Hospital",
        date: "12 Apr, 2023",
        reason: "Diabetes follow-up",
        diagnosis: "Uncontrolled blood sugar",
        doctor: "Dr. Sharma",
        specialization: "Endocrinologist",
      },
      {
        hospital: "District Hospital",
        date: "03 Jan, 2023",
        reason: "Fever and cough",
        diagnosis: "Viral infection",
        doctor: "Dr. Gupta",
        specialization: "General Physician",
      },
      {
        hospital: "City Hospital",
        date: "15 Oct, 2022",
        reason: "Diabetes follow-up",
        diagnosis: "Stable condition",
        doctor: "Dr. Sharma",
        specialization: "Endocrinologist",
      },
    ],
    diagnosticTests: [
      {
        name: "HbA1c",
        date: "10 Apr, 2023",
        result: "7.2%",
        normalRange: "< 5.7%",
        status: "High",
        location: "City Diagnostics",
      },
      {
        name: "Lipid Profile",
        date: "10 Apr, 2023",
        result: "LDL: 130 mg/dL",
        normalRange: "< 100 mg/dL",
        status: "High",
        location: "City Diagnostics",
      },
      {
        name: "Blood Pressure",
        date: "12 Apr, 2023",
        result: "138/88 mmHg",
        normalRange: "< 120/80 mmHg",
        status: "Elevated",
        location: "City Hospital",
      },
      {
        name: "Fasting Blood Sugar",
        date: "10 Apr, 2023",
        result: "142 mg/dL",
        normalRange: "70-100 mg/dL",
        status: "High",
        location: "City Diagnostics",
      },
    ],
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="conditions">
        <TabsList className="mb-4">
          <TabsTrigger value="conditions" className="data-[state=active]:bg-[#0070f3] data-[state=active]:text-white">
            Medical Conditions
          </TabsTrigger>
          <TabsTrigger value="visits" className="data-[state=active]:bg-[#0070f3] data-[state=active]:text-white">
            Hospital Visits
          </TabsTrigger>
          <TabsTrigger value="tests" className="data-[state=active]:bg-[#0070f3] data-[state=active]:text-white">
            Diagnostic Tests
          </TabsTrigger>
          <TabsTrigger value="allergies" className="data-[state=active]:bg-[#0070f3] data-[state=active]:text-white">
            Allergies
          </TabsTrigger>
        </TabsList>

        <TabsContent value="conditions">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Chronic Conditions</h3>
              <Button variant="outline" size="sm" className="text-[#0070f3]">
                <FileText className="h-4 w-4 mr-2" />
                Add Condition
              </Button>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Condition</TableHead>
                  <TableHead>Diagnosed Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Severity</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {medicalData.conditions.map((condition, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{condition.name}</TableCell>
                    <TableCell>{condition.diagnosedDate}</TableCell>
                    <TableCell>
                      <Badge className="bg-[#F97316]">{condition.status}</Badge>
                    </TableCell>
                    <TableCell>{condition.severity}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-4">Past Surgeries</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Surgery</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Hospital</TableHead>
                    <TableHead>Doctor</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {medicalData.surgeries.map((surgery, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{surgery.name}</TableCell>
                      <TableCell>{surgery.date}</TableCell>
                      <TableCell>{surgery.hospital}</TableCell>
                      <TableCell>{surgery.doctor}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="visits">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Hospital Visits & Treatments</h3>
              <Button variant="outline" size="sm" className="text-[#0070f3]">
                <Download className="h-4 w-4 mr-2" />
                Export Records
              </Button>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Hospital</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Reason</TableHead>
                  <TableHead>Diagnosis</TableHead>
                  <TableHead>Doctor</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {medicalData.hospitalVisits.map((visit, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{visit.hospital}</TableCell>
                    <TableCell>{visit.date}</TableCell>
                    <TableCell>{visit.reason}</TableCell>
                    <TableCell>{visit.diagnosis}</TableCell>
                    <TableCell>
                      {visit.doctor}
                      <div className="text-xs text-gray-500">{visit.specialization}</div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        <TabsContent value="tests">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Diagnostic Tests</h3>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="text-[#0070f3]">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  View Trends
                </Button>
                <Button variant="outline" size="sm" className="text-[#0070f3]">
                  <Download className="h-4 w-4 mr-2" />
                  Export Results
                </Button>
              </div>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Test Name</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Result</TableHead>
                  <TableHead>Normal Range</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Location</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {medicalData.diagnosticTests.map((test, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{test.name}</TableCell>
                    <TableCell>{test.date}</TableCell>
                    <TableCell>{test.result}</TableCell>
                    <TableCell>{test.normalRange}</TableCell>
                    <TableCell>
                      <Badge
                        className={
                          test.status === "Normal"
                            ? "bg-green-500"
                            : test.status === "High"
                              ? "bg-red-500"
                              : "bg-yellow-500"
                        }
                      >
                        {test.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{test.location}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        <TabsContent value="allergies">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Allergies</h3>
              <Button variant="outline" size="sm" className="text-[#0070f3]">
                <FileText className="h-4 w-4 mr-2" />
                Add Allergy
              </Button>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Type</TableHead>
                  <TableHead>Allergen</TableHead>
                  <TableHead>Reaction</TableHead>
                  <TableHead>Severity</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {medicalData.allergies.map((allergy, index) => (
                  <TableRow key={index}>
                    <TableCell>{allergy.type}</TableCell>
                    <TableCell className="font-medium">{allergy.name}</TableCell>
                    <TableCell>{allergy.reaction}</TableCell>
                    <TableCell>
                      <Badge
                        className={
                          allergy.severity === "Mild"
                            ? "bg-yellow-500"
                            : allergy.severity === "Moderate"
                              ? "bg-orange-500"
                              : "bg-red-500"
                        }
                      >
                        {allergy.severity}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

