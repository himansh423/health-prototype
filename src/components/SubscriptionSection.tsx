import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"

const subscriptionPlans = [
  {
    id: 1,
    name: "Basic Plan",
    price: "₹499",
    period: "per month",
    description: "Essential healthcare coverage for individuals",
    features: [
      "Basic diagnostic tests (Blood sugar, BP)",
      "Generic medications for common conditions",
      "1 teleconsultation per month",
      "Health QR profile access",
      "24/7 helpline support",
    ],
    recommended: false,
    buttonText: "Get Started",
  },
  {
    id: 2,
    name: "Family Plan",
    price: "₹999",
    period: "per month",
    description: "Comprehensive coverage for families up to 4 members",
    features: [
      "All Basic Plan features",
      "Extended diagnostic tests",
      "Medications for chronic conditions",
      "3 teleconsultations per month",
      "Health QR profiles for all members",
      "Priority appointment booking",
    ],
    recommended: true,
    buttonText: "Choose Plan",
  },
  {
    id: 3,
    name: "Premium Plan",
    price: "₹1499",
    period: "per month",
    description: "Complete healthcare solution with premium benefits",
    features: [
      "All Family Plan features",
      "Comprehensive diagnostic packages",
      "Unlimited teleconsultations",
      "Specialist consultations included",
      "Home sample collection",
      "Medication delivery within 24 hours",
      "Annual health check-up",
    ],
    recommended: false,
    buttonText: "Choose Plan",
  },
]

export default function SubscriptionSection() {
  return (
    <section id="subscriptions" className="py-16 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-primary mb-4">Affordable Subscription Plans</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Choose a subscription plan that fits your needs. All plans include access to essential healthcare services
            at affordable rates.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {subscriptionPlans.map((plan) => (
            <Card
              key={plan.id}
              className={`relative overflow-hidden ${plan.recommended ? "border-primary shadow-lg" : ""}`}
            >
              {plan.recommended && (
                <div className="absolute top-0 right-0 bg-primary text-white px-4 py-1 text-sm font-medium">
                  Recommended
                </div>
              )}
              <CardHeader>
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <span className="text-3xl font-bold">{plan.price}</span>
                  <span className="text-gray-500 ml-1">{plan.period}</span>
                </div>
                <ul className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button
                  className={`w-full ${plan.recommended ? "bg-primary" : ""}`}
                  variant={plan.recommended ? "default" : "outline"}
                >
                  {plan.buttonText}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="text-center mt-10 text-gray-600">
          <p className="max-w-2xl mx-auto">
            All plans include access to our network of hospitals and clinics. Subscription can be canceled anytime.
            Additional family members can be added to Family and Premium plans for ₹250 per member.
          </p>
        </div>
      </div>
    </section>
  )
}

