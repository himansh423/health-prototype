import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, MapPin, Plus } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function Appointments() {
  const appointmentData = {
    upcomingAppointments: [
      {
        doctor: "Dr. Sharma",
        specialization: "Endocrinologist",
        hospital: "City Hospital",
        date: "15 May, 2023",
        time: "10:30 AM",
        reason: "Diabetes Follow-up",
        status: "Confirmed",
      },
      {
        doctor: "Dr. Patel",
        specialization: "Cardiologist",
        hospital: "Heart Care Center",
        date: "22 May, 2023",
        time: "11:00 AM",
        reason: "Annual Heart Checkup",
        status: "Pending",
      },
    ],
    pastAppointments: [
      {
        doctor: "Dr. Sharma",
        specialization: "Endocrinologist",
        hospital: "City Hospital",
        date: "15 Feb, 2023",
        time: "10:30 AM",
        reason: "Diabetes Follow-up",
        status: "Completed",
        notes: "Blood sugar levels improved. Continue with current medication.",
      },
      {
        doctor: "Dr. Gupta",
        specialization: "General Physician",
        hospital: "District Hospital",
        date: "03 Jan, 2023",
        time: "09:00 AM",
        reason: "Fever and cough",
        status: "Completed",
        notes: "Viral infection. Prescribed antibiotics and rest.",
      },
    ],
    upcomingTests: [
      {
        name: "HbA1c",
        type: "Blood Test",
        location: "City Diagnostics",
        date: "10 May, 2023",
        time: "08:00 AM",
        fasting: "Yes (8 hours)",
        status: "Scheduled",
      },
      {
        name: "Lipid Profile",
        type: "Blood Test",
        location: "City Diagnostics",
        date: "10 May, 2023",
        time: "08:00 AM",
        fasting: "Yes (12 hours)",
        status: "Scheduled",
      },
    ],
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Upcoming Doctor Appointments</h3>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-[#0070f3] hover:bg-[#0060d3]">
              <Plus className="h-4 w-4 mr-2" />
              Book Appointment
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Book New Appointment</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="doctor">Doctor</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select doctor" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dr-sharma">Dr. Sharma (Endocrinologist)</SelectItem>
                    <SelectItem value="dr-patel">Dr. Patel (Cardiologist)</SelectItem>
                    <SelectItem value="dr-gupta">Dr. Gupta (General Physician)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="hospital">Hospital</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select hospital" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="city-hospital">City Hospital</SelectItem>
                    <SelectItem value="district-hospital">District Hospital</SelectItem>
                    <SelectItem value="heart-care">Heart Care Center</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <Input id="date" type="date" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="time">Time</Label>
                <Input id="time" type="time" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="reason">Reason for Visit</Label>
                <Input id="reason" placeholder="Enter reason" />
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <Button variant="outline">Cancel</Button>
                <Button className="bg-[#0070f3] hover:bg-[#0060d3]">Book Appointment</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Doctor</TableHead>
            <TableHead>Hospital</TableHead>
            <TableHead>Date & Time</TableHead>
            <TableHead>Reason</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {appointmentData.upcomingAppointments.map((appointment, index) => (
            <TableRow key={index}>
              <TableCell>
                <div className="font-medium">{appointment.doctor}</div>
                <div className="text-xs text-gray-500">{appointment.specialization}</div>
              </TableCell>
              <TableCell>{appointment.hospital}</TableCell>
              <TableCell>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-[#0070f3]" />
                  <span>{appointment.date}</span>
                </div>
                <div className="flex items-center mt-1">
                  <Clock className="h-4 w-4 mr-2 text-[#0070f3]" />
                  <span>{appointment.time}</span>
                </div>
              </TableCell>
              <TableCell>{appointment.reason}</TableCell>
              <TableCell>
                <Badge
                  className={
                    appointment.status === "Confirmed"
                      ? "bg-green-500"
                      : appointment.status === "Pending"
                        ? "bg-yellow-500"
                        : "bg-red-500"
                  }
                >
                  {appointment.status}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    Reschedule
                  </Button>
                  <Button variant="outline" size="sm" className="text-red-500 border-red-200 hover:bg-red-50">
                    Cancel
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="pt-6">
        <h3 className="text-lg font-semibold mb-4">Upcoming Lab Tests & Scans</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Test Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Date & Time</TableHead>
              <TableHead>Fasting Required</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {appointmentData.upcomingTests.map((test, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{test.name}</TableCell>
                <TableCell>{test.type}</TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-2 text-[#F97316]" />
                    {test.location}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-[#0070f3]" />
                    <span>{test.date}</span>
                  </div>
                  <div className="flex items-center mt-1">
                    <Clock className="h-4 w-4 mr-2 text-[#0070f3]" />
                    <span>{test.time}</span>
                  </div>
                </TableCell>
                <TableCell>{test.fasting}</TableCell>
                <TableCell>
                  <Badge
                    className={
                      test.status === "Scheduled"
                        ? "bg-green-500"
                        : test.status === "Pending"
                          ? "bg-yellow-500"
                          : "bg-red-500"
                    }
                  >
                    {test.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="pt-6">
        <h3 className="text-lg font-semibold mb-4">Past Appointments</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Doctor</TableHead>
              <TableHead>Hospital</TableHead>
              <TableHead>Date & Time</TableHead>
              <TableHead>Reason</TableHead>
              <TableHead>Notes</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {appointmentData.pastAppointments.map((appointment, index) => (
              <TableRow key={index}>
                <TableCell>
                  <div className="font-medium">{appointment.doctor}</div>
                  <div className="text-xs text-gray-500">{appointment.specialization}</div>
                </TableCell>
                <TableCell>{appointment.hospital}</TableCell>
                <TableCell>
                  <div>{appointment.date}</div>
                  <div className="text-xs text-gray-500">{appointment.time}</div>
                </TableCell>
                <TableCell>{appointment.reason}</TableCell>
                <TableCell>
                  <p className="text-sm">{appointment.notes}</p>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

