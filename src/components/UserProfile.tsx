"use client"

import type React from "react"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  CalendarIcon,
  Edit,
  User,
  FileText,
  Pill,
  Syringe,
  CalendarDays,
  Bell,
  Star,
  Phone,
  Upload,
} from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import BasicInfo from "./user-profile/BasicInfo"
import SubscriptionInfo from "./user-profile/SubscriptionInfo"
import MedicalHistory from "./user-profile/MedicalHistory"
import Medications from "./user-profile/Medications"
import Vaccinations from "./user-profile/Vaccination"
import Appointments from "./user-profile/Appointments"
import GovernmentBenefits from "./user-profile/GovernmentBenefits"
import EmergencyContacts from "./user-profile/EmergencyContacts"
import Notifications from "./user-profile/Notification"
import Feedback from "./user-profile/Feedback"

export default function UserProfile() {
  const [coverPhoto, setCoverPhoto] = useState("/placeholder.svg?height=300&width=1200")
  const [profilePhoto, setProfilePhoto] = useState("/placeholder.svg?height=150&width=150")

  const handleCoverPhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader()
      reader.onload = (event) => {
        if (event.target?.result) {
          setCoverPhoto(event.target.result as string)
        }
      }
      reader.readAsDataURL(e.target.files[0])
    }
  }

  const handleProfilePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader()
      reader.onload = (event) => {
        if (event.target?.result) {
          setProfilePhoto(event.target.result as string)
        }
      }
      reader.readAsDataURL(e.target.files[0])
    }
  }

  return (
    <div className="flex flex-col w-full">
      {/* Cover Photo */}
      <div className="relative h-[200px] md:h-[300px] w-full">
        <img src={coverPhoto || "/placeholder.svg"} alt="Cover" className="w-full h-full object-cover" />
        <label
          htmlFor="cover-upload"
          className="absolute bottom-4 right-4 bg-white p-2 rounded-full cursor-pointer shadow-md hover:bg-gray-100"
        >
          <Upload className="h-5 w-5 text-[#0070f3]" />
          <input id="cover-upload" type="file" className="hidden" onChange={handleCoverPhotoChange} accept="image/*" />
        </label>
      </div>

      {/* Profile Header */}
      <div className="bg-white px-4 md:px-8 py-6 flex flex-col md:flex-row items-start md:items-end gap-4 relative">
        <div className="absolute -top-16 left-8 rounded-full border-4 border-white shadow-lg">
          <Avatar className="h-32 w-32">
            <AvatarImage src={profilePhoto} alt="Profile" />
            <AvatarFallback className="bg-[#43C6B8] text-white text-2xl">RK</AvatarFallback>
          </Avatar>
          <label
            htmlFor="profile-upload"
            className="absolute bottom-0 right-0 bg-white p-2 rounded-full cursor-pointer shadow-md hover:bg-gray-100"
          >
            <Edit className="h-4 w-4 text-[#0070f3]" />
            <input
              id="profile-upload"
              type="file"
              className="hidden"
              onChange={handleProfilePhotoChange}
              accept="image/*"
            />
          </label>
        </div>

        <div className="mt-16 md:mt-0 md:ml-40">
          <h1 className="text-2xl font-bold">Rahul Kumar</h1>
          <div className="flex flex-wrap gap-2 mt-1">
            <Badge className="bg-[#0070f3]">ID: HLTH-12345</Badge>
            <Badge className="bg-[#F97316]">Ayushman Bharat</Badge>
            <Badge className="bg-[#43C6B8]">Diabetes Care</Badge>
          </div>
        </div>

        <div className="flex gap-2 md:ml-auto mt-4 md:mt-0">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-[#0070f3] hover:bg-[#0060d3]">
                <Edit className="h-4 w-4 mr-2" /> Edit Profile
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Edit Profile</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <BasicInfo isEditing={true} />
              </div>
            </DialogContent>
          </Dialog>

          <Button variant="outline" className="border-[#43C6B8] text-[#43C6B8] hover:bg-[#43C6B8] hover:text-white">
            <Phone className="h-4 w-4 mr-2" /> Emergency Contact
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4 md:p-8 bg-gray-50">
        <Tabs defaultValue="basic-info" className="w-full">
          <TabsList className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-10 mb-8">
            <TabsTrigger value="basic-info" className="data-[state=active]:bg-[#0070f3] data-[state=active]:text-white">
              <User className="h-4 w-4 mr-2" /> Basic Info
            </TabsTrigger>
            <TabsTrigger
              value="subscription"
              className="data-[state=active]:bg-[#0070f3] data-[state=active]:text-white"
            >
              <FileText className="h-4 w-4 mr-2" /> Subscription
            </TabsTrigger>
            <TabsTrigger
              value="medical-history"
              className="data-[state=active]:bg-[#0070f3] data-[state=active]:text-white"
            >
              <FileText className="h-4 w-4 mr-2" /> Medical History
            </TabsTrigger>
            <TabsTrigger
              value="medications"
              className="data-[state=active]:bg-[#0070f3] data-[state=active]:text-white"
            >
              <Pill className="h-4 w-4 mr-2" /> Medications
            </TabsTrigger>
            <TabsTrigger
              value="vaccinations"
              className="data-[state=active]:bg-[#0070f3] data-[state=active]:text-white"
            >
              <Syringe className="h-4 w-4 mr-2" /> Vaccinations
            </TabsTrigger>
            <TabsTrigger
              value="appointments"
              className="data-[state=active]:bg-[#0070f3] data-[state=active]:text-white"
            >
              <CalendarDays className="h-4 w-4 mr-2" /> Appointments
            </TabsTrigger>
            <TabsTrigger
              value="government-benefits"
              className="data-[state=active]:bg-[#0070f3] data-[state=active]:text-white"
            >
              <FileText className="h-4 w-4 mr-2" /> Gov. Benefits
            </TabsTrigger>
            <TabsTrigger
              value="emergency-contacts"
              className="data-[state=active]:bg-[#0070f3] data-[state=active]:text-white"
            >
              <Phone className="h-4 w-4 mr-2" /> Emergency
            </TabsTrigger>
            <TabsTrigger
              value="notifications"
              className="data-[state=active]:bg-[#0070f3] data-[state=active]:text-white"
            >
              <Bell className="h-4 w-4 mr-2" /> Notifications
            </TabsTrigger>
            <TabsTrigger value="feedback" className="data-[state=active]:bg-[#0070f3] data-[state=active]:text-white">
              <Star className="h-4 w-4 mr-2" /> Feedback
            </TabsTrigger>
          </TabsList>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <TabsContent value="basic-info">
                <Card>
                  <CardContent className="pt-6">
                    <BasicInfo />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="subscription">
                <Card>
                  <CardContent className="pt-6">
                    <SubscriptionInfo />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="medical-history">
                <Card>
                  <CardContent className="pt-6">
                    <MedicalHistory />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="medications">
                <Card>
                  <CardContent className="pt-6">
                    <Medications />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="vaccinations">
                <Card>
                  <CardContent className="pt-6">
                    <Vaccinations />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="appointments">
                <Card>
                  <CardContent className="pt-6">
                    <Appointments />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="government-benefits">
                <Card>
                  <CardContent className="pt-6">
                    <GovernmentBenefits />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="emergency-contacts">
                <Card>
                  <CardContent className="pt-6">
                    <EmergencyContacts />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="notifications">
                <Card>
                  <CardContent className="pt-6">
                    <Notifications />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="feedback">
                <Card>
                  <CardContent className="pt-6">
                    <Feedback />
                  </CardContent>
                </Card>
              </TabsContent>
            </div>

            <div className="space-y-6">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <CalendarIcon className="mr-2 h-5 w-5 text-[#0070f3]" />
                    Upcoming Events
                  </h3>
                  <Calendar mode="single" className="rounded-md border" selected={new Date()} initialFocus />
                  <div className="mt-4 space-y-3">
                    <div className="p-3 border rounded-md bg-blue-50 border-blue-200">
                      <div className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-[#0070f3] mr-2"></div>
                        <p className="text-sm font-medium">Doctor Appointment</p>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">May 15, 2025 - 10:30 AM</p>
                      <p className="text-xs text-gray-700 mt-1">Dr. Sharma (Cardiologist)</p>
                    </div>
                    <div className="p-3 border rounded-md bg-orange-50 border-orange-200">
                      <div className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-[#F97316] mr-2"></div>
                        <p className="text-sm font-medium">Medicine Refill</p>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">May 10, 2025</p>
                      <p className="text-xs text-gray-700 mt-1">Diabetes Medication</p>
                    </div>
                    <div className="p-3 border rounded-md bg-teal-50 border-teal-200">
                      <div className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-[#43C6B8] mr-2"></div>
                        <p className="text-sm font-medium">Blood Test</p>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">May 20, 2025 - 9:00 AM</p>
                      <p className="text-xs text-gray-700 mt-1">Fasting Blood Sugar</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <Bell className="mr-2 h-5 w-5 text-[#F97316]" />
                    Recent Notifications
                  </h3>
                  <div className="space-y-3">
                    <div className="p-3 border rounded-md">
                      <p className="text-sm font-medium">Medicine Reminder</p>
                      <p className="text-xs text-gray-500 mt-1">Take Metformin 500mg after breakfast</p>
                      <p className="text-xs text-gray-400 mt-1">2 hours ago</p>
                    </div>
                    <div className="p-3 border rounded-md">
                      <p className="text-sm font-medium">Appointment Confirmed</p>
                      <p className="text-xs text-gray-500 mt-1">Your appointment with Dr. Sharma is confirmed</p>
                      <p className="text-xs text-gray-400 mt-1">Yesterday</p>
                    </div>
                    <div className="p-3 border rounded-md">
                      <p className="text-sm font-medium">Government Health Camp</p>
                      <p className="text-xs text-gray-500 mt-1">Free health checkup camp in your village on May 25</p>
                      <p className="text-xs text-gray-400 mt-1">2 days ago</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </Tabs>
      </div>
    </div>
  )
}

