import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Syringe, Calendar, Download } from "lucide-react"

export default function Vaccinations() {
  const vaccinationData = {
    vaccinationRecords: [
      {
        name: "COVID-19 (Covishield)",
        date: "10 Jun, 2021",
        dose: "1st Dose",
        hospital: "District Hospital, Varanasi",
        doctor: "Dr. Verma",
        certificate: true,
      },
      {
        name: "COVID-19 (Covishield)",
        date: "15 Sep, 2021",
        dose: "2nd Dose",
        hospital: "District Hospital, Varanasi",
        doctor: "Dr. Verma",
        certificate: true,
      },
      {
        name: "COVID-19 (Covishield)",
        date: "20 Jan, 2022",
        dose: "Booster",
        hospital: "City Hospital",
        doctor: "Dr. Gupta",
        certificate: true,
      },
      {
        name: "Influenza",
        date: "05 Nov, 2022",
        dose: "Annual",
        hospital: "City Hospital",
        doctor: "Dr. Gupta",
        certificate: false,
      },
    ],
    upcomingVaccinations: [
      {
        name: "Influenza",
        dueDate: "05 Nov, 2023",
        type: "Annual",
        location: "City Hospital",
        status: "Scheduled",
        appointmentDate: "01 Nov, 2023",
      },
      {
        name: "Pneumococcal",
        dueDate: "15 Jun, 2023",
        type: "One-time (for diabetics)",
        location: "Not scheduled",
        status: "Due",
        appointmentDate: null,
      },
    ],
    governmentVaccines: [
      {
        name: "Hepatitis B",
        eligibility: "All adults",
        location: "Government Health Center",
        cost: "Free",
      },
      {
        name: "Tetanus",
        eligibility: "Every 10 years",
        location: "Government Health Center",
        cost: "Free",
      },
    ],
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Vaccination Records</h3>
        <Button variant="outline" size="sm" className="text-[#0070f3]">
          <Download className="h-4 w-4 mr-2" />
          Export Records
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Vaccine</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Dose</TableHead>
            <TableHead>Hospital</TableHead>
            <TableHead>Doctor</TableHead>
            <TableHead>Certificate</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {vaccinationData.vaccinationRecords.map((vaccine, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{vaccine.name}</TableCell>
              <TableCell>{vaccine.date}</TableCell>
              <TableCell>{vaccine.dose}</TableCell>
              <TableCell>{vaccine.hospital}</TableCell>
              <TableCell>{vaccine.doctor}</TableCell>
              <TableCell>
                {vaccine.certificate ? (
                  <Button variant="link" size="sm" className="h-8 p-0 text-[#0070f3]">
                    Download
                  </Button>
                ) : (
                  <span className="text-gray-500 text-sm">N/A</span>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="pt-6">
        <h3 className="text-lg font-semibold mb-4">Upcoming Vaccinations</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Vaccine</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {vaccinationData.upcomingVaccinations.map((vaccine, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{vaccine.name}</TableCell>
                <TableCell>{vaccine.dueDate}</TableCell>
                <TableCell>{vaccine.type}</TableCell>
                <TableCell>{vaccine.location}</TableCell>
                <TableCell>
                  <Badge
                    className={
                      vaccine.status === "Scheduled"
                        ? "bg-green-500"
                        : vaccine.status === "Due"
                          ? "bg-yellow-500"
                          : "bg-red-500"
                    }
                  >
                    {vaccine.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  {vaccine.status === "Scheduled" ? (
                    <div className="flex items-center text-xs text-gray-500">
                      <Calendar className="h-3 w-3 mr-1" />
                      {vaccine.appointmentDate}
                    </div>
                  ) : (
                    <Button size="sm" className="bg-[#0070f3] hover:bg-[#0060d3]">
                      <Calendar className="h-4 w-4 mr-2" />
                      Schedule
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="pt-6">
        <h3 className="text-lg font-semibold mb-4">Government-Sponsored Free Vaccines</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {vaccinationData.governmentVaccines.map((vaccine, index) => (
            <div key={index} className="border rounded-lg p-4 flex items-start">
              <div className="h-8 w-8 rounded-full bg-[#43C6B8] flex items-center justify-center text-white mr-3">
                <Syringe className="h-4 w-4" />
              </div>
              <div>
                <h4 className="font-medium">{vaccine.name}</h4>
                <p className="text-sm text-gray-500 mt-1">Eligibility: {vaccine.eligibility}</p>
                <p className="text-sm text-gray-500">Location: {vaccine.location}</p>
                <Badge className="mt-2 bg-green-500">{vaccine.cost}</Badge>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

