import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Star, Clock } from "lucide-react";

const specialistTypes = [
  {
    id: 1,
    type: "Dermatologists",
    description: "Skin specialists for various skin conditions and treatments",
    image: "/placeholder.svg?height=200&width=300",
    rating: 4.8,
    hospitals: [
      {
        name: "Skin Care Clinic",
        location: "Rajpur, Uttarakhand",
        distance: "3.2 km",
        openHours: "9:00 AM - 6:00 PM",
      },
    ],
  },
  {
    id: 2,
    type: "Gynecologists",
    description:
      "Women's health specialists for reproductive and maternal care",
    image: "/placeholder.svg?height=200&width=300",
    rating: 4.9,
    hospitals: [
      {
        name: "Women's Health Center",
        location: "Dehradun, Uttarakhand",
        distance: "5.1 km",
        openHours: "8:30 AM - 7:00 PM",
      },
    ],
  },
  {
    id: 3,
    type: "Diabetic Specialists",
    description: "Endocrinologists specializing in diabetes management",
    image: "/placeholder.svg?height=200&width=300",
    rating: 4.7,
    hospitals: [
      {
        name: "Diabetes Care Institute",
        location: "Mussoorie Road, Uttarakhand",
        distance: "4.5 km",
        openHours: "9:00 AM - 5:00 PM",
      },
    ],
  },
  {
    id: 4,
    type: "Cardiologists",
    description: "Heart specialists for cardiovascular health and treatment",
    image: "/placeholder.svg?height=200&width=300",
    rating: 4.9,
    hospitals: [
      {
        name: "Heart Care Hospital",
        location: "Clement Town, Uttarakhand",
        distance: "6.3 km",
        openHours: "24 Hours",
      },
    ],
  },
];

export default function HospitalAndClinicSection() {
  return (
    <section id="hospitals" className="py-16 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold  mb-4 text-[#0070f3]">
            Hospitals & Specialist Clinics
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Connect with specialized healthcare providers in your area. Our
            network includes top-rated specialists to address your specific
            health needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {specialistTypes.map((specialist) => (
            <Card
              key={specialist.id}
              className="overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="relative h-48">
                <img
                  src={specialist.image || "/placeholder.svg"}
                  alt={specialist.type}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 right-3 bg-white rounded-full px-2 py-1 flex items-center text-sm font-medium text-amber-500">
                  <Star className="h-4 w-4 fill-amber-500 text-amber-500 mr-1" />
                  {specialist.rating}
                </div>
              </div>
              <CardHeader>
                <CardTitle>{specialist.type}</CardTitle>
                <CardDescription>{specialist.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {specialist.hospitals.map((hospital, idx) => (
                    <div
                      key={idx}
                      className="border-b pb-3 last:border-0 last:pb-0"
                    >
                      <h4 className="font-semibold text-[#0070f3]">
                        {hospital.name}
                      </h4>
                      <div className="flex items-center text-sm text-gray-500 mt-1">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span>{hospital.location}</span>
                        <span className="mx-2">•</span>
                        <span>{hospital.distance}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-500 mt-1">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>{hospital.openHours}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-[#0070f3]">Book Appointment</Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="text-center mt-10">
          <Button variant="outline" className="mr-4">
            View All Specialists
          </Button>
          <Button className="bg-[#0070f3]">Find Nearest Clinic</Button>
        </div>
      </div>
    </section>
  );
}
