"use client";

import { CardFooter } from "@/components/ui/card";
import { useState } from "react";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  Building2,
  Phone,
  Mail,
  Globe,
  MapPin,
  Bed,
  Activity,
  ShipWheelIcon as Wheelchair,
  Stethoscope,
  UserPlus,
  Star,
  Clock,
  ShieldAlert,
  Banknote,
  FileText,
  Users,
  Sparkles,
  HeartPulse,
  Syringe,
  Brain,
  Microscope,
  AlertCircle,
  Check,
  Award,
} from "lucide-react";

const hospitalData = {
  basicDetails: {
    name: "City General Hospital",
    type: "Government",
    id: "CGH001",
    profilePicture: "/hospital-profile.jpg",
    coverPhoto: "/hospital-cover.jpg",
    location: {
      address: "123 Healthcare Avenue, Medical District",
      city: "Metropolis",
      state: "Health State",
      pincode: "100001",
    },
    contact: {
      phone: "+91 1234567890",
      email: "info@citygeneralhospital.gov.in",
      website: "www.citygeneralhospital.gov.in",
      helpline: "1800-123-4567",
    },
    mapsLink: "https://goo.gl/maps/example",
  },
  generalInfo: {
    totalBeds: 500,
    currentAvailableBeds: 75,
    icuBeds: 50,
    icuAvailableBeds: 5,
    ventilators: 30,
    availableVentilators: 8,
    emergencyWard: true,
    opdTimings: "Mon-Sat: 9:00 AM - 5:00 PM",
    emergencyServices: "24/7",
    ambulanceAvailable: true,
    bloodBankAvailable: true,
    pharmacyAvailable: true,
    disabledFacilities: [
      "Wheelchair Access",
      "Special Assistance",
      "Braille Signage",
    ],
  },
  departments: [
    { name: "General Medicine", icon: <Stethoscope className="h-5 w-5" /> },
    { name: "Pediatrics", icon: <UserPlus className="h-5 w-5" /> },
    { name: "Orthopedics", icon: <Activity className="h-5 w-5" /> },
    { name: "Gynecology & Obstetrics", icon: <UserPlus className="h-5 w-5" /> },
    { name: "Surgery", icon: <Syringe className="h-5 w-5" /> },
    { name: "Cardiology", icon: <HeartPulse className="h-5 w-5" /> },
    { name: "Neurology", icon: <Brain className="h-5 w-5" /> },
    { name: "Oncology", icon: <Microscope className="h-5 w-5" /> },
    { name: "Nephrology", icon: <Activity className="h-5 w-5" /> },
    { name: "Radiology", icon: <Syringe className="h-5 w-5" /> },
    { name: "ENT", icon: <Stethoscope className="h-5 w-5" /> },
    { name: "Ophthalmology", icon: <Activity className="h-5 w-5" /> },
    { name: "Dental Services", icon: <Stethoscope className="h-5 w-5" /> },
    {
      name: "Physiotherapy & Rehabilitation",
      icon: <Activity className="h-5 w-5" />,
    },
    { name: "Psychiatry", icon: <Brain className="h-5 w-5" /> },
    { name: "HIV/AIDS Treatment", icon: <Microscope className="h-5 w-5" /> },
    { name: "COVID-19 Unit", icon: <AlertCircle className="h-5 w-5" /> },
  ],
  doctors: [
    {
      name: "Dr. Aisha Patel",
      qualification: "MD, DM (Cardiology)",
      specialization: "Cardiology",
      position: "Chief Cardiologist",
      experience: 15,
      availability: "Full-time",
      opdTimings: "Mon, Wed, Fri: 10:00 AM - 2:00 PM",
      emergencyAvailable: true,
      photo: "/doctor-aisha.jpg",
    },
    {
      name: "Dr. Rajesh Kumar",
      qualification: "MS, MCh (Neurosurgery)",
      specialization: "Neurosurgery",
      position: "Senior Neurosurgeon",
      experience: 12,
      availability: "Full-time",
      opdTimings: "Tue, Thu, Sat: 11:00 AM - 3:00 PM",
      emergencyAvailable: true,
      photo: "/doctor-rajesh.jpg",
    },
    // Add more doctors here
  ],
  performance: {
    rating: 4.2,
    totalReviews: 1500,
    successfulSurgeries: 5000,
    mortalityRate: "2.1%",
    averagePatients: {
      daily: 500,
      monthly: 15000,
    },
    achievements: [
      "Best Government Hospital Award 2022",
      "COVID-19 Excellence Recognition",
      "National Quality Assurance Standards Certification",
    ],
  },
  emergencyCare: {
    traumaCenter: true,
    burnUnit: true,
    neonatalICU: true,
    dialysisCenter: true,
    organTransplant: false,
    mentalHealthHelpline: true,
  },
  pharmacy: {
    freeMedicineScheme: true,
    genericMedicineAvailable: true,
    onlineBooking: true,
    homeDelivery: true,
    essentialMedicines: [
      "Antibiotics",
      "Painkillers",
      "Cardiovascular drugs",
      "Diabetes medication",
    ],
  },
  costAndInsurance: {
    generalConsultation: "Free",
    averageSurgeryCost: "₹20,000 - ₹1,00,000",
    ayushmanBharat: true,
    esic: true,
    cghs: true,
    stateSchemes: ["State Health Insurance", "Chief Minister's Health Program"],
    financialAid: "Available for BPL patients",
  },
  facilities: {
    waitingArea: true,
    canteen: true,
    parking: "Free",
    wards: ["General", "Private", "Deluxe"],
    attachedMedicalCollege: true,
    researchFacilities: true,
    telemedicine: true,
    ambulanceServices: "24/7",
  },
  staff: {
    doctors: 150,
    nurses: 300,
    supportStaff: 200,
    sanitationRating: "4.5/5",
  },
  announcements: [
    "Free Health Camp on 15th August",
    "COVID-19 Vaccination Drive: Register Now",
    "New Cardiology Wing Opening Next Month",
  ],
  nearbyHospitals: [
    { name: "Metro City Hospital", distance: "5 km" },
    { name: "Rural Health Center", distance: "12 km" },
  ],
};

export default function HospitalProfile() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="container mx-auto px-4 py-8">
      
      <div className="relative h-64 rounded-xl overflow-hidden mb-8">
        <Image
          src={hospitalData.basicDetails.coverPhoto || "/placeholder.svg"}
          alt={`${hospitalData.basicDetails.name} cover`}
          layout="fill"
          objectFit="cover"
        />
      </div>

      {/* Hospital Name and Basic Info */}
      <div className="flex flex-col md:flex-row items-start md:items-end mb-8">
        <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg mb-4 md:mb-0 md:mr-6">
          <Image
            src={hospitalData.basicDetails.profilePicture || "/placeholder.svg"}
            alt={hospitalData.basicDetails.name}
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div>
          <h1 className="text-4xl font-bold text-[#0070f3] mb-2">
            {hospitalData.basicDetails.name}
          </h1>
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <Badge variant="secondary" className="bg-[#43C6B8] text-white">{hospitalData.basicDetails.type}</Badge>
            <Badge variant="outline">ID: {hospitalData.basicDetails.id}</Badge>
            <span className="text-gray-600 flex items-center">
              <MapPin className="h-4 w-4 mr-1" />
              {hospitalData.basicDetails.location.city},{" "}
              {hospitalData.basicDetails.location.state}
            </span>
          </div>
        </div>
      </div>

      {/* Quick Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <QuickInfoCard
          icon={<Bed className="h-6 w-6 text-[#0070f3]" />}
          title="Available Beds"
          value={`${hospitalData.generalInfo.currentAvailableBeds}/${hospitalData.generalInfo.totalBeds}`}
        />
        <QuickInfoCard
          icon={<Activity className="h-6 w-6 text-[#0070f3]" />}
          title="ICU Beds"
          value={`${hospitalData.generalInfo.icuAvailableBeds}/${hospitalData.generalInfo.icuBeds}`}
        />
        <QuickInfoCard
          icon={<Syringe className="h-6 w-6 text-[#0070f3]" />}
          title="Ventilators"
          value={`${hospitalData.generalInfo.availableVentilators}/${hospitalData.generalInfo.ventilators}`}
        />
        <QuickInfoCard
          icon={<Clock className="h-6 w-6 text-[#0070f3]" />}
          title="OPD Timings"
          value={hospitalData.generalInfo.opdTimings}
        />
      </div>

      {/* Main Content Tabs */}
      <Tabs
        defaultValue={activeTab}
        onValueChange={setActiveTab}
        className="space-y-8"
      >
        <TabsList className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="departments">Departments</TabsTrigger>
          <TabsTrigger value="doctors">Doctors</TabsTrigger>
          <TabsTrigger value="facilities">Facilities</TabsTrigger>
          <TabsTrigger value="costs">Costs & Insurance</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-[#0070f3] flex items-center">
                  <Building2 className="h-5 w-5 mr-2" />
                  General Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <dl className="space-y-2">
                  <div className="flex justify-between">
                    <dt className="font-medium">Emergency Services</dt>
                    <dd>{hospitalData.generalInfo.emergencyServices}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="font-medium">Ambulance</dt>
                    <dd>
                      {hospitalData.generalInfo.ambulanceAvailable
                        ? "Available"
                        : "Not Available"}
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="font-medium">Blood Bank</dt>
                    <dd>
                      {hospitalData.generalInfo.bloodBankAvailable
                        ? "Available"
                        : "Not Available"}
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="font-medium">Pharmacy</dt>
                    <dd>
                      {hospitalData.generalInfo.pharmacyAvailable
                        ? "Available"
                        : "Not Available"}
                    </dd>
                  </div>
                </dl>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-[#0070f3] flex items-center">
                  <Wheelchair className="h-5 w-5 mr-2" />
                  Accessibility
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {hospitalData.generalInfo.disabledFacilities.map(
                    (facility, index) => (
                      <li key={index} className="flex items-center">
                        <Check className="h-5 w-5 mr-2 text-green-500" />
                        {facility}
                      </li>
                    )
                  )}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-[#0070f3] flex items-center">
                  <Sparkles className="h-5 w-5 mr-2" />
                  Announcements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {hospitalData.announcements.map((announcement, index) => (
                    <li key={index} className="flex items-start">
                      <AlertCircle className="h-5 w-5 mr-2 text-[#F97316] flex-shrink-0 mt-0.5" />
                      <span>{announcement}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-[#0070f3] flex items-center">
                  <MapPin className="h-5 w-5 mr-2" />
                  Location & Contact
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-2">
                  {hospitalData.basicDetails.location.address},{" "}
                  {hospitalData.basicDetails.location.city},{" "}
                  {hospitalData.basicDetails.location.state} -{" "}
                  {hospitalData.basicDetails.location.pincode}
                </p>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <Globe className="h-5 w-5 mr-2 text-[#F97316]" />
                    <a
                      href={hospitalData.basicDetails.contact.website}
                      className="text-[#0070f3] hover:underline"
                    >
                      {hospitalData.basicDetails.contact.website}
                    </a>
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-5 w-5 mr-2 text-[#F97316]" />
                    <span>{hospitalData.basicDetails.contact.phone}</span>
                  </div>
                  <div className="flex items-center">
                    <Mail className="h-5 w-5 mr-2 text-[#F97316]" />
                    <a
                      href={`mailto:${hospitalData.basicDetails.contact.email}`}
                      className="text-[#0070f3] hover:underline"
                    >
                      {hospitalData.basicDetails.contact.email}
                    </a>
                  </div>
                  <div className="flex items-center">
                    <ShieldAlert className="h-5 w-5 mr-2 text-[#F97316]" />
                    <span>
                      Helpline: {hospitalData.basicDetails.contact.helpline}
                    </span>
                  </div>
                </div>
                <Button className="mt-4 hover:bg-accent/90 bg-[#F97316] text-white w-full">
                  <MapPin className="h-4 w-4 mr-2" />
                  Get Directions
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="departments">
          <Card>
            <CardHeader>
              <CardTitle className="text-[#0070f3]">
                Departments & Services
              </CardTitle>
              <CardDescription>
                Specialized care units available at{" "}
                {hospitalData.basicDetails.name}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {hospitalData.departments.map((department, index) => (
                  <div
                    key={index}
                    className="flex items-center p-3 bg-secondary/5 rounded-lg"
                  >
                    {department.icon}
                    <span className="ml-2">{department.name}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="doctors">
          <Card>
            <CardHeader>
              <CardTitle className="text-[#0070f3]">Our Doctors</CardTitle>
              <CardDescription>
                Experienced medical professionals at your service
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {hospitalData.doctors.map((doctor, index) => (
                  <Card key={index} className="bg-white shadow">
                    <CardHeader className="pb-0">
                      <div className="flex items-center space-x-4">
                        <div className="relative w-16 h-16 rounded-full overflow-hidden">
                          <Image
                            src={doctor.photo || "/placeholder.svg"}
                            alt={doctor.name}
                            layout="fill"
                            objectFit="cover"
                          />
                        </div>
                        <div>
                          <CardTitle className="text-lg">
                            {doctor.name}
                          </CardTitle>
                          <CardDescription>
                            {doctor.qualification}
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="font-medium">Specialization:</span>
                          <span>{doctor.specialization}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-medium">Position:</span>
                          <span>{doctor.position}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-medium">Experience:</span>
                          <span>{doctor.experience} years</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-medium">Availability:</span>
                          <span>{doctor.availability}</span>
                        </div>
                        <div>
                          <span className="font-medium">OPD Timings:</span>
                          <p className="mt-1">{doctor.opdTimings}</p>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full bg-[#0070f3] hover:bg-[#0070f3]/90 text-white">
                        Book Appointment
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="facilities">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-[#0070f3] flex items-center">
                  <Building2 className="h-5 w-5 mr-2" />
                  Hospital Facilities
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {Object.entries(hospitalData.facilities).map(
                    ([key, value]) => (
                      <li key={key} className="flex items-center">
                        <Check className="h-5 w-5 mr-2 text-green-500" />
                        <span className="capitalize">
                          {key.replace(/([A-Z])/g, " $1").trim()}:{" "}
                        </span>
                        <span className="ml-1 font-medium">
                          {typeof value === "boolean"
                            ? value
                              ? "Yes"
                              : "No"
                            : value}
                        </span>
                      </li>
                    )
                  )}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-[#0070f3] flex items-center">
                  <Users className="h-5 w-5 mr-2" />
                  Staff Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="font-medium">Doctors</span>
                      <span>{hospitalData.staff.doctors}</span>
                    </div>
                    <Progress
                      value={
                        (hospitalData.staff.doctors /
                          (hospitalData.staff.doctors +
                            hospitalData.staff.nurses +
                            hospitalData.staff.supportStaff)) *
                        100
                      }
                      className="h-2"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="font-medium">Nurses</span>
                      <span>{hospitalData.staff.nurses}</span>
                    </div>
                    <Progress
                      value={
                        (hospitalData.staff.nurses /
                          (hospitalData.staff.doctors +
                            hospitalData.staff.nurses +
                            hospitalData.staff.supportStaff)) *
                        100
                      }
                      className="h-2"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="font-medium">Support Staff</span>
                      <span>{hospitalData.staff.supportStaff}</span>
                    </div>
                    <Progress
                      value={
                        (hospitalData.staff.supportStaff /
                          (hospitalData.staff.doctors +
                            hospitalData.staff.nurses +
                            hospitalData.staff.supportStaff)) *
                        100
                      }
                      className="h-2"
                    />
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t">
                    <span className="font-medium">Sanitation Rating</span>
                    <Badge variant="secondary">
                      {hospitalData.staff.sanitationRating}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="costs">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-[#0070f3] flex items-center">
                  <Banknote className="h-5 w-5 mr-2" />
                  Treatment Costs
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium">General Consultation</span>
                    <span className="text-green-600">
                      {hospitalData.costAndInsurance.generalConsultation}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Average Surgery Cost</span>
                    <span>
                      {hospitalData.costAndInsurance.averageSurgeryCost}
                    </span>
                  </div>
                  <Separator className="my-4" />
                  <p className="text-sm text-gray-600">
                    Note: Costs may vary based on specific treatments and
                    patient conditions. Please consult with the hospital for
                    detailed pricing.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-[#0070f3] flex items-center">
                  <FileText className="h-5 w-5 mr-2" />
                  Accepted Insurance & Schemes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <Badge variant="secondary" className="mr-2 bg-[#43C6B8] text-white">
                      Ayushman Bharat
                    </Badge>
                    <span>
                      {hospitalData.costAndInsurance.ayushmanBharat
                        ? "Accepted"
                        : "Not Accepted"}
                    </span>
                  </li>
                  <li className="flex items-center">
                    <Badge variant="secondary" className="mr-2 bg-[#43C6B8] text-white">
                      ESIC
                    </Badge>
                    <span>
                      {hospitalData.costAndInsurance.esic
                        ? "Accepted"
                        : "Not Accepted"}
                    </span>
                  </li>
                  <li className="flex items-center">
                    <Badge variant="secondary" className="mr-2 bg-[#43C6B8] text-white">
                      CGHS
                    </Badge>
                    <span>
                      {hospitalData.costAndInsurance.cghs
                        ? "Accepted"
                        : "Not Accepted"}
                    </span>
                  </li>
                  {hospitalData.costAndInsurance.stateSchemes.map(
                    (scheme, index) => (
                      <li key={index} className="flex items-center">
                        <Badge variant="outline" className="mr-2">
                          State Scheme
                        </Badge>
                        <span>{scheme}</span>
                      </li>
                    )
                  )}
                </ul>
                <Separator className="my-4" />
                <div className="mt-4">
                  <span className="font-medium">Financial Aid: </span>
                  <span>{hospitalData.costAndInsurance.financialAid}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="performance">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-[#0070f3] flex items-center">
                  <Activity className="h-5 w-5 mr-2" />
                  Hospital Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Star className="h-8 w-8 text-yellow-400 mr-2" />
                    <div>
                      <div className="text-2xl font-bold">
                        {hospitalData.performance.rating}/5
                      </div>
                      <div className="text-sm text-gray-600">
                        Overall Rating ({hospitalData.performance.totalReviews}{" "}
                        reviews)
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="font-medium">Successful Surgeries</div>
                    <div className="text-2xl font-bold text-green-600">
                      {hospitalData.performance.successfulSurgeries}+
                    </div>
                  </div>
                  <div>
                    <div className="font-medium">Mortality Rate</div>
                    <div className="text-2xl font-bold text-[#0070f3]">
                      {hospitalData.performance.mortalityRate}
                    </div>
                  </div>
                  <div>
                    <div className="font-medium">Average Patients</div>
                    <div className="flex justify-between text-sm">
                      <span>
                        Daily: {hospitalData.performance.averagePatients.daily}
                      </span>
                      <span>
                        Monthly:{" "}
                        {hospitalData.performance.averagePatients.monthly}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-[#0070f3] flex items-center">
                  <Award className="h-5 w-5 mr-2" />
                  Achievements & Recognition
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {hospitalData.performance.achievements.map(
                    (achievement, index) => (
                      <li key={index} className="flex items-start">
                        <Sparkles className="h-5 w-5 mr-2 text-yellow-400 flex-shrink-0 mt-0.5" />
                        <span>{achievement}</span>
                      </li>
                    )
                  )}
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      <div className="mt-8 text-center ">
        <Button size="lg" className="bg-[#FA812D] hover:bg-accent/90 text-white">
          <UserPlus className="h-5 w-5 mr-2 " />
          Book an Appointment
        </Button>
      </div>
    </div>
  );
}
interface QuickInfoCardProps {
  icon: React.ReactNode;
  title: string;
  value: string | number;
}
function QuickInfoCard({ icon, title, value }:QuickInfoCardProps) {
  return (
    <Card>
      <CardContent className="flex items-center p-4">
        <div className="mr-4">{icon}</div>
        <div>
          <h3 className="font-medium text-gray-500">{title}</h3>
          <p className="text-xl font-bold">{value}</p>
        </div>
      </CardContent>
    </Card>
  );
}
