import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Bell, Calendar, Pill, Syringe } from "lucide-react"

export default function Notifications() {
  const notificationData = {
    recentNotifications: [
      {
        title: "Medicine Reminder",
        message: "Take Metformin 500mg after breakfast",
        time: "2 hours ago",
        type: "Medicine",
        read: true,
      },
      {
        title: "Appointment Confirmed",
        message: "Your appointment with Dr. Sharma is confirmed for May 15, 10:30 AM",
        time: "Yesterday",
        type: "Appointment",
        read: true,
      },
      {
        title: "Government Health Camp",
        message: "Free health checkup camp in your village on May 25",
        time: "2 days ago",
        type: "Government",
        read: false,
      },
      {
        title: "Medicine Refill Required",
        message: "Your Amlodipine prescription needs to be refilled in 5 days",
        time: "3 days ago",
        type: "Medicine",
        read: false,
      },
    ],
    upcomingReminders: [
      {
        title: "Take Metformin 500mg",
        time: "Today, 2:00 PM",
        type: "Medicine",
      },
      {
        title: "Take Amlodipine 5mg",
        time: "Today, 9:00 PM",
        type: "Medicine",
      },
      {
        title: "Doctor Appointment",
        time: "May 15, 10:30 AM",
        type: "Appointment",
      },
      {
        title: "Blood Test",
        time: "May 10, 8:00 AM",
        type: "Test",
      },
    ],
    notificationSettings: [
      {
        category: "Medicine Reminders",
        description: "Reminders to take your medicines on time",
        enabled: true,
        sms: true,
        email: false,
      },
      {
        category: "Appointment Reminders",
        description: "Reminders for upcoming doctor appointments",
        enabled: true,
        sms: true,
        email: true,
      },
      {
        category: "Test Reminders",
        description: "Reminders for upcoming diagnostic tests",
        enabled: true,
        sms: true,
        email: false,
      },
      {
        category: "Refill Alerts",
        description: "Alerts when your medicines need to be refilled",
        enabled: true,
        sms: true,
        email: true,
      },
      {
        category: "Government Schemes",
        description: "Updates about government health schemes and camps",
        enabled: true,
        sms: true,
        email: false,
      },
    ],
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Recent Notifications</h3>
        <Button variant="outline" size="sm" className="text-[#0070f3]">
          Mark All as Read
        </Button>
      </div>

      <div className="space-y-3">
        {notificationData.recentNotifications.map((notification, index) => (
          <div key={index} className={`border rounded-lg p-4 ${notification.read ? "" : "bg-blue-50 border-blue-200"}`}>
            <div className="flex items-start">
              <div
                className={`h-8 w-8 rounded-full flex items-center justify-center mr-3 ${
                  notification.type === "Medicine"
                    ? "bg-[#F97316] text-white"
                    : notification.type === "Appointment"
                      ? "bg-[#0070f3] text-white"
                      : "bg-[#43C6B8] text-white"
                }`}
              >
                {notification.type === "Medicine" ? (
                  <Pill className="h-4 w-4" />
                ) : notification.type === "Appointment" ? (
                  <Calendar className="h-4 w-4" />
                ) : (
                  <Bell className="h-4 w-4" />
                )}
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <h4 className="font-medium">{notification.title}</h4>
                  <span className="text-xs text-gray-500">{notification.time}</span>
                </div>
                <p className="text-sm mt-1">{notification.message}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="pt-6">
        <h3 className="text-lg font-semibold mb-4">Upcoming Reminders</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Reminder</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Type</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {notificationData.upcomingReminders.map((reminder, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">
                  <div className="flex items-center">
                    {reminder.type === "Medicine" ? (
                      <Pill className="h-4 w-4 mr-2 text-[#F97316]" />
                    ) : reminder.type === "Appointment" ? (
                      <Calendar className="h-4 w-4 mr-2 text-[#0070f3]" />
                    ) : reminder.type === "Test" ? (
                      <Syringe className="h-4 w-4 mr-2 text-[#43C6B8]" />
                    ) : (
                      <Bell className="h-4 w-4 mr-2 text-gray-500" />
                    )}
                    {reminder.title}
                  </div>
                </TableCell>
                <TableCell>{reminder.time}</TableCell>
                <TableCell>
                  <Badge
                    className={
                      reminder.type === "Medicine"
                        ? "bg-[#F97316]"
                        : reminder.type === "Appointment"
                          ? "bg-[#0070f3]"
                          : reminder.type === "Test"
                            ? "bg-[#43C6B8]"
                            : "bg-gray-500"
                    }
                  >
                    {reminder.type}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="pt-6">
        <h3 className="text-lg font-semibold mb-4">Notification Settings</h3>
        <div className="space-y-4">
          {notificationData.notificationSettings.map((setting, index) => (
            <div key={index} className="border rounded-lg p-4">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-medium">{setting.category}</h4>
                  <p className="text-sm text-gray-500 mt-1">{setting.description}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id={`enable-${index}`} checked={setting.enabled} />
                  <Label htmlFor={`enable-${index}`} className="sr-only">
                    Enable
                  </Label>
                </div>
              </div>
              {setting.enabled && (
                <div className="mt-4 pt-4 border-t grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <Switch id={`sms-${index}`} checked={setting.sms} />
                    <Label htmlFor={`sms-${index}`}>SMS Notifications</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id={`email-${index}`} checked={setting.email} />
                    <Label htmlFor={`email-${index}`}>Email Notifications</Label>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

