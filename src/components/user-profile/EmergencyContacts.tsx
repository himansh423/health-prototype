import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Phone, MapPin, Ambulance, Plus, Edit, Trash } from "lucide-react"

export default function EmergencyContacts() {
  const emergencyData = {
    contacts: [
      {
        name: "Sunita Kumar",
        relation: "Wife",
        phone: "+91 8765432109",
        address: "Same as patient",
      },
      {
        name: "Amit Kumar",
        relation: "Son",
        phone: "+91 9876543210",
        address: "Delhi",
      },
    ],
    nearbyHospitals: [
      {
        name: "District Hospital",
        distance: "5 km",
        address: "Main Road, Varanasi",
        phone: "0542-1234567",
        emergency: true,
      },
      {
        name: "City Hospital",
        distance: "8 km",
        address: "MG Road, Varanasi",
        phone: "0542-7654321",
        emergency: true,
      },
    ],
    ambulanceServices: [
      {
        name: "Government Ambulance",
        phone: "108",
        freeService: true,
      },
      {
        name: "City Hospital Ambulance",
        phone: "0542-7654322",
        freeService: false,
      },
    ],
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Emergency Contacts</h3>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-[#0070f3] hover:bg-[#0060d3]">
              <Plus className="h-4 w-4 mr-2" />
              Add Contact
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add Emergency Contact</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" placeholder="Enter name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="relation">Relation</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select relation" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="spouse">Spouse</SelectItem>
                    <SelectItem value="parent">Parent</SelectItem>
                    <SelectItem value="child">Child</SelectItem>
                    <SelectItem value="sibling">Sibling</SelectItem>
                    <SelectItem value="friend">Friend</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" placeholder="Enter phone number" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input id="address" placeholder="Enter address" />
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <Button variant="outline">Cancel</Button>
                <Button className="bg-[#0070f3] hover:bg-[#0060d3]">Save Contact</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Relation</TableHead>
            <TableHead>Phone Number</TableHead>
            <TableHead>Address</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {emergencyData.contacts.map((contact, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{contact.name}</TableCell>
              <TableCell>{contact.relation}</TableCell>
              <TableCell>
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-2 text-[#0070f3]" />
                  {contact.phone}
                </div>
              </TableCell>
              <TableCell>{contact.address}</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 w-8 p-0 text-red-500 border-red-200 hover:bg-red-50"
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="pt-6">
        <h3 className="text-lg font-semibold mb-4">Nearest Hospitals for Emergency</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {emergencyData.nearbyHospitals.map((hospital, index) => (
            <div key={index} className="border rounded-lg p-4">
              <div className="flex justify-between items-start">
                <h4 className="font-medium">{hospital.name}</h4>
                <Badge className="bg-[#43C6B8]">{hospital.distance}</Badge>
              </div>
              <div className="mt-3 space-y-2">
                <div className="flex items-start">
                  <MapPin className="h-4 w-4 mr-2 text-[#F97316] mt-0.5" />
                  <span className="text-sm">{hospital.address}</span>
                </div>
                <div className="flex items-start">
                  <Phone className="h-4 w-4 mr-2 text-[#F97316] mt-0.5" />
                  <span className="text-sm">{hospital.phone}</span>
                </div>
              </div>
              {hospital.emergency && (
                <div className="mt-3 bg-green-50 p-2 rounded-md text-sm flex items-center">
                  <div className="h-4 w-4 rounded-full bg-green-500 flex items-center justify-center text-white text-xs mr-2">
                    ✓
                  </div>
                  24/7 Emergency Services Available
                </div>
              )}
              <div className="mt-4 flex justify-between">
                <Button variant="outline" size="sm">
                  <Phone className="h-4 w-4 mr-2" />
                  Call
                </Button>
                <Button variant="outline" size="sm">
                  <MapPin className="h-4 w-4 mr-2" />
                  Directions
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-6">
        <h3 className="text-lg font-semibold mb-4">Ambulance Services</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {emergencyData.ambulanceServices.map((service, index) => (
            <div key={index} className="border rounded-lg p-4 flex items-center">
              <div className="h-10 w-10 rounded-full bg-red-500 flex items-center justify-center text-white mr-4">
                <Ambulance className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-medium">{service.name}</h4>
                <div className="flex items-center mt-1">
                  <Phone className="h-4 w-4 mr-2 text-red-500" />
                  <span className="text-lg font-bold">{service.phone}</span>
                </div>
                {service.freeService && <Badge className="mt-2 bg-green-500">Free Service</Badge>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

