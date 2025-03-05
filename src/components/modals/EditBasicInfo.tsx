"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { mockUserData } from "@/library/mock-data/MockData"


interface EditBasicInfoModalProps {
  isOpen: boolean
  onClose: () => void
  userData: typeof mockUserData
  onUpdate: (data: typeof mockUserData) => void
}

export function EditBasicInfoModal({ isOpen, onClose, userData, onUpdate }: EditBasicInfoModalProps) {
  const [formData, setFormData] = useState({ ...userData })
  const [activeTab, setActiveTab] = useState("personal")
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.')
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof typeof prev] as object,
          [child]: value
        }
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }))
    }
  }
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onUpdate(formData)
    onClose()
  }
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Profile Information</DialogTitle>
          <DialogDescription>
            Update your personal and healthcare information
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="personal" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="personal">Personal Info</TabsTrigger>
            <TabsTrigger value="contact">Contact Details</TabsTrigger>
            <TabsTrigger value="profile-image">Profile & Cover Photos</TabsTrigger>
          </TabsList>
          
          <form onSubmit={handleSubmit}>
            <TabsContent value="personal" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input 
                    id="fullName" 
                    name="fullName" 
                    value={formData.fullName}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dateOfBirth">Date of Birth</Label>
                  <Input 
                    id="dateOfBirth" 
                    name="dateOfBirth" 
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="gender">Gender</Label>
                  <Input 
                    id="gender" 
                    name="gender" 
                    value={formData.gender}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bloodGroup">Blood Group</Label>
                  <Input 
                    id="bloodGroup" 
                    name="bloodGroup" 
                    value={formData.bloodGroup}
                    onChange={handleChange}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="governmentId">Aadhaar / Government ID</Label>
                <Input 
                  id="governmentId" 
                  name="governmentId" 
                  value={formData.governmentId}
                  onChange={handleChange}
                />
              </div>
            </TabsContent>
            
            <TabsContent value="contact" className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="contactDetails.phone">Phone Number</Label>
                  <Input 
                    id="contactDetails.phone" 
                    name="contactDetails.phone" 
                    value={formData.contactDetails.phone}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contactDetails.email">Email</Label>
                  <Input 
                    id="contactDetails.email" 
                    name="contactDetails.email" 
                    value={formData.contactDetails.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contactDetails.emergencyContact">Emergency Contact</Label>
                  <Input 
                    id="contactDetails.emergencyContact" 
                    name="contactDetails.emergencyContact" 
                    value={formData.contactDetails.emergencyContact}
                    onChange={handleChange}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Address</Label>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="address.village">Village/Town</Label>
                    <Input 
                      id="address.village" 
                      name="address.village" 
                      value={formData.address.village}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address.district">District</Label>
                    <Input 
                      id="address.district" 
                      name="address.district" 
                      value={formData.address.district}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="address.state">State</Label>
                    <Input 
                      id="address.state" 
                      name="address.state" 
                      value={formData.address.state}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address.pincode">Pincode</Label>
                    <Input 
                      id="address.pincode" 
                      name="address.pincode" 
                      value={formData.address.pincode}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="profile-image" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="profilePicture">Profile Picture URL</Label>
                <Input 
                  id="profilePicture" 
                  name="profilePicture" 
                  value={formData.profilePicture}
                  onChange={handleChange}
                  placeholder="https://example.com/profile.jpg"
                />
                <p className="text-sm text-muted-foreground">Enter the URL of your profile picture</p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="coverPhoto">Cover Photo URL</Label>
                <Input 
                  id="coverPhoto" 
                  name="coverPhoto" 
                  value={formData.coverPhoto}
                  onChange={handleChange}
                  placeholder="https://example.com/cover.jpg"
                />
                <p className="text-sm text-muted-foreground">Enter the URL of your cover photo</p>
              </div>
              
              <div className="bg-slate-100 p-4 rounded-md">
                <p className="text-sm text-muted-foreground">
                  For the demonstration purpose, use image URLs. In a real application, this would be replaced with an image upload component.
                </p>
              </div>
            </TabsContent>
            
            <DialogFooter className="mt-6 gap-2">
              <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
              <Button type="submit">Save Changes</Button>
            </DialogFooter>
          </form>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
