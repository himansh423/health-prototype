import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

export function ProfileFeedback() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Feedback & Suggestions</CardTitle>
        <CardDescription>Help us improve your healthcare experience</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="font-medium">How would you rate your overall healthcare experience?</div>
            <RadioGroup defaultValue="satisfied" className="flex space-x-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="very-satisfied" id="very-satisfied" />
                <Label htmlFor="very-satisfied">Very Satisfied</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="satisfied" id="satisfied" />
                <Label htmlFor="satisfied">Satisfied</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="neutral" id="neutral" />
                <Label htmlFor="neutral">Neutral</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="dissatisfied" id="dissatisfied" />
                <Label htmlFor="dissatisfied">Dissatisfied</Label>
              </div>
            </RadioGroup>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="feedback">Do you have any suggestions for improving your healthcare service?</Label>
            <Textarea id="feedback" placeholder="Share your thoughts and suggestions..." className="min-h-[100px]" />
          </div>
          
          <div className="flex justify-end">
            <Button>Submit Feedback</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
