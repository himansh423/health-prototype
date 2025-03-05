import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Star, ThumbsUp, ThumbsDown, Send } from "lucide-react"

export default function Feedback() {
  const feedbackData = {
    hospitalVisits: [
      {
        hospital: "City Hospital",
        date: "12 Apr, 2023",
        doctor: "Dr. Sharma",
        rating: 4,
        feedback: "Good experience overall. Doctor was knowledgeable and staff was helpful.",
        submitted: true,
      },
      {
        hospital: "District Hospital",
        date: "03 Jan, 2023",
        doctor: "Dr. Gupta",
        rating: 3,
        feedback: "Long waiting time, but the doctor was good.",
        submitted: true,
      },
    ],
    pendingFeedback: [
      {
        hospital: "City Hospital",
        date: "15 May, 2023",
        doctor: "Dr. Sharma",
        type: "Appointment",
      },
    ],
    suggestions: [
      {
        title: "App Improvement",
        date: "10 Mar, 2023",
        message: "It would be helpful to have a feature to track blood sugar levels over time.",
        status: "Under Review",
      },
    ],
  }

  const StarRating = ({ rating }: { rating: number }) => {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-5 w-5 ${star <= rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
          />
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Hospital Visit Feedback</h3>
        <div className="space-y-4">
          {feedbackData.hospitalVisits.map((visit, index) => (
            <Card key={index}>
              <CardContent className="pt-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <h4 className="font-medium">{visit.hospital}</h4>
                    <p className="text-sm text-gray-500 mt-1">Visit Date: {visit.date}</p>
                    <p className="text-sm text-gray-500">Doctor: {visit.doctor}</p>
                  </div>
                  <div className="mt-4 md:mt-0">
                    <StarRating rating={visit.rating} />
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t">
                  <h5 className="text-sm font-medium mb-2">Your Feedback:</h5>
                  <p className="text-sm">{visit.feedback}</p>
                </div>
                <div className="mt-4 flex justify-end">
                  <Badge className="bg-green-500">Submitted</Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="pt-6">
        <h3 className="text-lg font-semibold mb-4">Pending Feedback</h3>
        {feedbackData.pendingFeedback.length > 0 ? (
          <div className="space-y-4">
            {feedbackData.pendingFeedback.map((feedback, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div>
                      <h4 className="font-medium">{feedback.hospital}</h4>
                      <p className="text-sm text-gray-500 mt-1">Visit Date: {feedback.date}</p>
                      <p className="text-sm text-gray-500">Doctor: {feedback.doctor}</p>
                    </div>
                    <Badge className="mt-2 md:mt-0 w-fit bg-yellow-500">{feedback.type}</Badge>
                  </div>
                  <div className="mt-4 pt-4 border-t">
                    <h5 className="text-sm font-medium mb-2">Rate your experience:</h5>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          className="h-8 w-8 rounded-full border flex items-center justify-center hover:bg-gray-100"
                        >
                          <Star className="h-5 w-5 text-gray-400" />
                        </button>
                      ))}
                    </div>
                    <div className="mt-4">
                      <h5 className="text-sm font-medium mb-2">Your Feedback:</h5>
                      <Textarea placeholder="Share your experience..." className="min-h-[100px]" />
                    </div>
                    <div className="mt-4 flex justify-between items-center">
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="flex items-center">
                          <ThumbsUp className="h-4 w-4 mr-2" />
                          Helpful
                        </Button>
                        <Button variant="outline" size="sm" className="flex items-center">
                          <ThumbsDown className="h-4 w-4 mr-2" />
                          Not Helpful
                        </Button>
                      </div>
                      <Button className="bg-[#0070f3] hover:bg-[#0060d3]">
                        <Send className="h-4 w-4 mr-2" />
                        Submit Feedback
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="pt-6 text-center py-8">
              <p className="text-gray-500">No pending feedback requests.</p>
            </CardContent>
          </Card>
        )}
      </div>

      <div className="pt-6">
        <h3 className="text-lg font-semibold mb-4">Your Suggestions</h3>
        <div className="space-y-4">
          {feedbackData.suggestions.map((suggestion, index) => (
            <Card key={index}>
              <CardContent className="pt-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium">{suggestion.title}</h4>
                    <p className="text-sm text-gray-500 mt-1">Submitted on: {suggestion.date}</p>
                  </div>
                  <Badge className="bg-[#0070f3]">{suggestion.status}</Badge>
                </div>
                <div className="mt-4 pt-4 border-t">
                  <p className="text-sm">{suggestion.message}</p>
                </div>
              </CardContent>
            </Card>
          ))}

          <Card>
            <CardContent className="pt-6">
              <h4 className="font-medium">Submit a New Suggestion</h4>
              <div className="mt-4">
                <Textarea
                  placeholder="Share your ideas on how we can improve our healthcare services..."
                  className="min-h-[100px]"
                />
              </div>
              <div className="mt-4 flex justify-end">
                <Button className="bg-[#0070f3] hover:bg-[#0060d3]">
                  <Send className="h-4 w-4 mr-2" />
                  Submit Suggestion
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

