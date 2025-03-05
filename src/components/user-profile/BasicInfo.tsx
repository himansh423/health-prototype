import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface BasicInfoProps {
  isEditing?: boolean
}

export default function BasicInfo({ isEditing = false }: BasicInfoProps) {
  const userData = {
    fullName: "Rahul Kumar",
    userId: "HLTH-12345",
    gender: "Male",
    dob: "15/08/1985",
    age: "39",
    address: {
      village: "Rampur",
      district: "Varanasi",
      state: "Uttar Pradesh",
      pincode: "221005",
    },
    contact: {
      phone: "+91 9876543210",
      email: "rahul.kumar@example.com",
      emergency: "+91 8765432109",
    },
    govtId: {
      aadhaar: "1234 5678 9012",
      other: "ABCDE1234F",
    },
    family: {
      members: 4,
      details: "Wife, Son (12), Daughter (8)",
    },
  }

  if (isEditing) {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name</Label>
            <Input id="fullName" defaultValue={userData.fullName} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="gender">Gender</Label>
            <Select defaultValue={userData.gender.toLowerCase()}>
              <SelectTrigger>
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="dob">Date of Birth</Label>
            <Input id="dob" defaultValue={userData.dob} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input id="phone" defaultValue={userData.contact.phone} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" defaultValue={userData.contact.email} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="emergency">Emergency Contact</Label>
            <Input id="emergency" defaultValue={userData.contact.emergency} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="aadhaar">Aadhaar Number</Label>
            <Input id="aadhaar" defaultValue={userData.govtId.aadhaar} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="village">Village</Label>
            <Input id="village" defaultValue={userData.address.village} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="district">District</Label>
            <Input id="district" defaultValue={userData.address.district} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="state">State</Label>
            <Input id="state" defaultValue={userData.address.state} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="pincode">Pincode</Label>
            <Input id="pincode" defaultValue={userData.address.pincode} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="family">Family Members</Label>
            <Input id="family" defaultValue={userData.family.members.toString()} />
          </div>
        </div>
        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline">Cancel</Button>
          <Button className="bg-[#0070f3] hover:bg-[#0060d3]">Save Changes</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Personal Information</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
        <div>
          <p className="text-sm font-medium text-gray-500">Full Name</p>
          <p className="text-base">{userData.fullName}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">User ID</p>
          <p className="text-base">{userData.userId}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">Gender</p>
          <p className="text-base">{userData.gender}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">Date of Birth</p>
          <p className="text-base">
            {userData.dob} (Age: {userData.age})
          </p>
        </div>
      </div>

      <h3 className="text-lg font-semibold pt-4">Contact Information</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
        <div>
          <p className="text-sm font-medium text-gray-500">Phone Number</p>
          <p className="text-base">{userData.contact.phone}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">Email</p>
          <p className="text-base">{userData.contact.email}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">Emergency Contact</p>
          <p className="text-base">{userData.contact.emergency}</p>
        </div>
      </div>

      <h3 className="text-lg font-semibold pt-4">Address</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
        <div>
          <p className="text-sm font-medium text-gray-500">Village</p>
          <p className="text-base">{userData.address.village}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">District</p>
          <p className="text-base">{userData.address.district}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">State</p>
          <p className="text-base">{userData.address.state}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">Pincode</p>
          <p className="text-base">{userData.address.pincode}</p>
        </div>
      </div>

      <h3 className="text-lg font-semibold pt-4">Government ID</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
        <div>
          <p className="text-sm font-medium text-gray-500">Aadhaar Number</p>
          <p className="text-base">{userData.govtId.aadhaar}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">PAN Number</p>
          <p className="text-base">{userData.govtId.other}</p>
        </div>
      </div>

      <h3 className="text-lg font-semibold pt-4">Family Details</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
        <div>
          <p className="text-sm font-medium text-gray-500">Number of Family Members</p>
          <p className="text-base">{userData.family.members}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">Family Details</p>
          <p className="text-base">{userData.family.details}</p>
        </div>
      </div>
    </div>
  )
}

