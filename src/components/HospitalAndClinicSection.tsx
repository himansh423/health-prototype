"use client";

import Link from "next/link";
import { MapPin, Star } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import AiimsImage from "../../public/AIIMS.jpg"
import sufdarjungImage from "../../public/Sufdarjung.jpeg";
import rmlImage from "../../public/rml.png";
import lnjpImage from "../../public/lnjp.webp";
const specialistTypes = [
  {
    id: "67c949509ddfb1d5d43a51b8",
    name: "AIIMS Delhi",
    image: AiimsImage.src,
    location: "New Delhi, India",
    website: "www.aiims.du",
    type: "Government",
    rating: "4.5",
  },
  {
    id: "67c949a59ddfb1d5d43a51c3",
    name: "Safdarjung Hospital",
    image: sufdarjungImage.src,
    location: "New Delhi, India",
    website: "www.aiims.du",
    type: "Government",
    rating: "4.5",
  },
  {
    id: "67c949e69ddfb1d5d43a51ce",
    name: "Dr. Ram Manohar Lohia Hospital",
    image: rmlImage.src,
    location: "New Delhi, India",
    website: "www.aiims.du",
    type: "Government",
    rating: "4.5",
  },
  {
    id: "67c94a2b9ddfb1d5d43a51d9",
    name: "Lok Nayak Jai Prakash Narayan Hospital",
    image: lnjpImage.src,
    location: "New Delhi, India",
    website: "www.aiims.du",
    type: "Government",
    rating: "4.5",
  },
];

export default function HospitalAndClinicSection() {
  return (
    <section id="hospitals" className="py-16 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-[#0070f3]">
            Hospitals & Specialist Clinics
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Connect with specialized healthcare providers in your area. Our
            network includes top-rated specialists to address your specific
            health needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {specialistTypes.map((hospital) => (
            <Card
              key={hospital.id}
              className="overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="relative h-48">
                <img
                  src={
                    hospital.image === "kc"
                      ? "/placeholder.svg?height=192&width=384"
                      : hospital.image
                  }
                  alt={hospital.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 right-3 bg-white rounded-full px-2 py-1 flex items-center text-sm font-medium text-amber-500">
                  <Star className="h-4 w-4 fill-amber-500 text-amber-500 mr-1" />
                  {hospital.rating}
                </div>
              </div>
              <CardHeader>
                <CardTitle>{hospital.name}</CardTitle>
                <div className="text-sm text-gray-500 flex items-center mt-1">
                  <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                    {hospital.type}
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-gray-500">
                    <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
                    <span>{hospital.location}</span>
                  </div>
                  <div className="text-sm text-gray-500">
                    <span className="font-medium">Website:</span>{" "}
                    <a
                      href={`https://${hospital.website}`}
                      className="text-blue-600 hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {hospital.website}
                    </a>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Link href={`/hospital/${hospital.id}`} className="w-full">
                  <Button className="w-full bg-[#0070f3] hover:bg-blue-600">
                    Book Appointment
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="text-center mt-10">
          <Button variant="outline" className="mr-4">
            View All Specialists
          </Button>
          <Button className="bg-[#0070f3] hover:bg-blue-600">
            Find Nearest Clinic
          </Button>
        </div>
      </div>
    </section>
  );
}
