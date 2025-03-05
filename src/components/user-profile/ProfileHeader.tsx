import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Edit, Calendar, Bell } from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card"
import { mockUserData } from "@/library/mock-data/MockData"


interface ProfileHeaderProps {
  userData: typeof mockUserData
  onEdit: () => void
}

export function ProfileHeader({ userData, onEdit }: ProfileHeaderProps) {
  return (
    <div className="relative">
      {/* Cover Photo */}
      <div 
        className="h-48 md:h-64 w-full bg-gradient-to-r from-[#0070f3]/80 to-[#43C6B8]/80 relative"
        style={{
          backgroundImage: userData.coverPhoto ? `url(${userData.coverPhoto})` : undefined,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <Button 
          variant="outline" 
          size="sm" 
          className="absolute right-4 top-4 bg-white/80 hover:bg-white"
          onClick={onEdit}
        >
          <Edit className="h-4 w-4 mr-2" />
          Edit Cover
        </Button>
      </div>
      
      {/* Profile Card */}
      <Card className="max-w-4xl mx-auto -mt-24 relative z-10 border-none shadow-lg">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row">
            <div className="relative -mt-16 mb-4 md:mb-0">
              <Avatar className="h-32 w-32 border-4 border-white shadow-md">
                <AvatarImage src={userData.profilePicture || undefined} alt={userData.fullName} />
                <AvatarFallback className="text-4xl bg-[#0070f3] text-white">
                  {userData.fullName.split(' ').map(name => name[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <Button 
                variant="outline" 
                size="icon" 
                className="absolute bottom-0 right-0 rounded-full bg-white hover:bg-gray-100"
                onClick={onEdit}
              >
                <Edit className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="md:ml-6 flex-1">
              <div className="flex flex-col md:flex-row md:items-center justify-between">
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold">{userData.fullName}</h1>
                  <div className="flex items-center gap-2 mt-1 text-muted-foreground">
                    <span>ID: {userData.userId}</span>
                    <span>•</span>
                    <span>{userData.age} years</span>
                    <span>•</span>
                    <span>{userData.gender}</span>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {userData.subscriptionPlan && (
                      <Badge className="bg-[#0070f3]">{userData.subscriptionPlan}</Badge>
                    )}
                    {userData.insuranceCoverage && (
                      <Badge className="bg-[#43C6B8]">Insured</Badge>
                    )}
                    {userData.govtSchemes.length > 0 && (
                      <Badge className="bg-[#F97316]">Govt. Schemes</Badge>
                    )}
                  </div>
                </div>
                
                <div className="flex mt-4 md:mt-0 gap-2">
                  <Button variant="outline" size="sm">
                    <Calendar className="h-4 w-4 mr-2" />
                    Upcoming
                  </Button>
                  <Button variant="outline" size="sm">
                    <Bell className="h-4 w-4 mr-2" />
                    Reminders
                  </Button>
                  <Button onClick={onEdit}>
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Profile
                  </Button>
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                <div className="bg-slate-50 p-3 rounded-md">
                  <div className="text-sm text-muted-foreground">Blood Group</div>
                  <div className="font-medium">{userData.bloodGroup || 'Not set'}</div>
                </div>
                <div className="bg-slate-50 p-3 rounded-md">
                  <div className="text-sm text-muted-foreground">Allergies</div>
                  <div className="font-medium">{userData.allergies.length ? `${userData.allergies.length} Known` : 'None'}</div>
                </div>
                <div className="bg-slate-50 p-3 rounded-md">
                  <div className="text-sm text-muted-foreground">Chronic Conditions</div>
                  <div className="font-medium">{userData.chronicConditions.length ? `${userData.chronicConditions.length} Conditions` : 'None'}</div>
                </div>
                <div className="bg-slate-50 p-3 rounded-md">
                  <div className="text-sm text-muted-foreground">Next Appointment</div>
                  <div className="font-medium">
                    {userData.upcomingAppointments.length > 0
                      ? new Date(userData.upcomingAppointments[0].date).toLocaleDateString()
                      : 'None scheduled'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
