import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { FileText, MapPin, Phone, ExternalLink } from "lucide-react";

export default function GovernmentBenefits() {
  const benefitsData = {
    schemes: [
      {
        name: "Ayushman Bharat",
        id: "AB-123456789",
        coverage: "₹5,00,000",
        validUntil: "31 March, 2026",
        status: "Active",
        usedAmount: 25000,
        totalAmount: 500000,
      },
      {
        name: "State Health Card",
        id: "SHC-987654321",
        coverage: "₹2,00,000",
        validUntil: "31 December, 2025",
        status: "Active",
        usedAmount: 15000,
        totalAmount: 200000,
      },
    ],
    freeCheckups: [
      {
        name: "Annual Health Checkup",
        eligibility: "All Ayushman Bharat beneficiaries",
        location: "Any government hospital",
        nextDue: "15 January, 2024",
      },
      {
        name: "Diabetes Screening",
        eligibility: "All adults above 40 years",
        location: "Primary Health Centers",
        nextDue: "10 June, 2023",
      },
    ],
    subsidizedMedicines: [
      {
        name: "Diabetes Medication",
        subsidy: "70% off on Metformin",
        location: "Jan Aushadhi Stores",
        status: "Enrolled",
      },
      {
        name: "Hypertension Medication",
        subsidy: "80% off on Amlodipine",
        location: "Government Hospitals",
        status: "Enrolled",
      },
    ],
    nearbyFacilities: [
      {
        name: "District Hospital",
        distance: "5 km",
        address: "Main Road, Varanasi",
        phone: "0542-1234567",
        services: [
          "Emergency Care",
          "General Medicine",
          "Surgery",
          "Pediatrics",
        ],
      },
      {
        name: "Primary Health Center",
        distance: "2 km",
        address: "Village Road, Rampur",
        phone: "0542-7654321",
        services: [
          "Basic Healthcare",
          "Maternal Care",
          "Immunization",
          "First Aid",
        ],
      },
    ],
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">
          Government Schemes Eligibility
        </h3>
        <Button variant="outline" size="sm" className="text-[#0070f3]">
          <FileText className="h-4 w-4 mr-2" />
          Check Eligibility
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Scheme Name</TableHead>
            <TableHead>ID</TableHead>
            <TableHead>Coverage</TableHead>
            <TableHead>Valid Until</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Usage</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {benefitsData.schemes.map((scheme, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{scheme.name}</TableCell>
              <TableCell>{scheme.id}</TableCell>
              <TableCell>{scheme.coverage}</TableCell>
              <TableCell>{scheme.validUntil}</TableCell>
              <TableCell>
                <Badge className="bg-green-500">{scheme.status}</Badge>
              </TableCell>
              <TableCell>
                <div className="w-32">
                  <div className="flex justify-between text-xs mb-1">
                    <span>Used: ₹{(scheme.usedAmount / 1000).toFixed(0)}K</span>
                    <span>
                      {Math.round(
                        (scheme.usedAmount / scheme.totalAmount) * 100
                      )}
                      %
                    </span>
                  </div>
                  <Progress
                    value={(scheme.usedAmount / scheme.totalAmount) * 100}
                    className="h-2 bg-gray-200"
                  />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="pt-6">
        <h3 className="text-lg font-semibold mb-4">
          Free Health Checkup Eligibility
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {benefitsData.freeCheckups.map((checkup, index) => (
            <div key={index} className="border rounded-lg p-4">
              <h4 className="font-medium">{checkup.name}</h4>
              <div className="mt-2 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Eligibility</span>
                  <span>{checkup.eligibility}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Location</span>
                  <span>{checkup.location}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Next Due</span>
                  <span className="font-medium">{checkup.nextDue}</span>
                </div>
              </div>
              <Button className="w-full mt-4 bg-[#0070f3] hover:bg-[#0060d3]">
                Schedule Checkup
              </Button>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-6">
        <h3 className="text-lg font-semibold mb-4">
          Subsidized Medicine Program
        </h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Medicine Type</TableHead>
              <TableHead>Subsidy</TableHead>
              <TableHead>Available At</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {benefitsData.subsidizedMedicines.map((medicine, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{medicine.name}</TableCell>
                <TableCell>{medicine.subsidy}</TableCell>
                <TableCell>{medicine.location}</TableCell>
                <TableCell>
                  <Badge className="bg-green-500">{medicine.status}</Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="pt-6">
        <h3 className="text-lg font-semibold mb-4">
          Nearest Government Facilities
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {benefitsData.nearbyFacilities.map((facility, index) => (
            <div key={index} className="border rounded-lg p-4">
              <div className="flex justify-between items-start">
                <h4 className="font-medium">{facility.name}</h4>
                <Badge className="bg-[#43C6B8]">{facility.distance}</Badge>
              </div>
              <div className="mt-3 space-y-2">
                <div className="flex items-start">
                  <MapPin className="h-4 w-4 mr-2 text-[#F97316] mt-0.5" />
                  <span className="text-sm">{facility.address}</span>
                </div>
                <div className="flex items-start">
                  <Phone className="h-4 w-4 mr-2 text-[#F97316] mt-0.5" />
                  <span className="text-sm">{facility.phone}</span>
                </div>
              </div>
              <div className="mt-3">
                <h5 className="text-sm font-medium mb-2">
                  Available Services:
                </h5>
                <div className="flex flex-wrap gap-2">
                  {facility.services.map((service, idx) => (
                    <Badge key={idx} variant="outline" className="bg-gray-100">
                      {service}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="mt-4 flex justify-between">
                <Button variant="outline" size="sm">
                  <Phone className="h-4 w-4 mr-2" />
                  Call
                </Button>
                <Button variant="outline" size="sm">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Directions
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
