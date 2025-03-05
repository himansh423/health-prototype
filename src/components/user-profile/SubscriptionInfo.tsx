import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function SubscriptionInfo() {
  const subscriptionData = {
    plan: "Diabetes Care Package",
    price: "₹499",
    billingCycle: "Monthly",
    nextBillingDate: "15 June, 2025",
    insurance: {
      status: true,
      provider: "National Health Insurance",
      coverage: "₹5,00,000",
      validUntil: "31 December, 2025",
    },
    govtSchemes: [
      {
        name: "Ayushman Bharat",
        id: "AB-123456789",
        coverage: "₹5,00,000",
        validUntil: "31 March, 2026",
      },
      {
        name: "State Health Card",
        id: "SHC-987654321",
        coverage: "₹2,00,000",
        validUntil: "31 December, 2025",
      },
    ],
    financialAid: {
      eligible: true,
      type: "Subsidized Treatment",
      details: "Eligible for 50% subsidy on all treatments",
    },
    usageStats: {
      insuranceUsed: 120000,
      insuranceTotal: 500000,
      govtSchemeUsed: 25000,
      govtSchemeTotal: 500000,
    },
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h3 className="text-lg font-semibold">Current Subscription</h3>
          <div className="flex items-center mt-2">
            <Badge className="bg-[#43C6B8] mr-2">{subscriptionData.plan}</Badge>
            <span className="text-lg font-bold">{subscriptionData.price}</span>
            <span className="text-sm text-gray-500 ml-1">
              / {subscriptionData.billingCycle}
            </span>
          </div>
        </div>
        <Button className="mt-4 md:mt-0 bg-[#0070f3] hover:bg-[#0060d3]">
          Upgrade Plan
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
        <div className="space-y-4">
          <h4 className="font-medium">Billing Information</h4>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Billing Cycle</span>
              <span className="text-sm">{subscriptionData.billingCycle}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Next Billing Date</span>
              <span className="text-sm">
                {subscriptionData.nextBillingDate}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Payment Method</span>
              <span className="text-sm">UPI - rahul@upi</span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="font-medium">Package Benefits</h4>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start">
              <div className="h-5 w-5 rounded-full bg-[#43C6B8] flex items-center justify-center text-white text-xs mr-2 mt-0.5">
                ✓
              </div>
              <span>Monthly doctor consultation</span>
            </li>
            <li className="flex items-start">
              <div className="h-5 w-5 rounded-full bg-[#43C6B8] flex items-center justify-center text-white text-xs mr-2 mt-0.5">
                ✓
              </div>
              <span>Quarterly blood tests</span>
            </li>
            <li className="flex items-start">
              <div className="h-5 w-5 rounded-full bg-[#43C6B8] flex items-center justify-center text-white text-xs mr-2 mt-0.5">
                ✓
              </div>
              <span>Discounted medicines</span>
            </li>
            <li className="flex items-start">
              <div className="h-5 w-5 rounded-full bg-[#43C6B8] flex items-center justify-center text-white text-xs mr-2 mt-0.5">
                ✓
              </div>
              <span>24/7 teleconsultation</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="pt-6">
        <h3 className="text-lg font-semibold mb-4">Insurance Coverage</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border rounded-lg p-4">
            <div className="flex justify-between items-center">
              <h4 className="font-medium">
                {subscriptionData.insurance.provider}
              </h4>
              <Badge className="bg-green-500">Active</Badge>
            </div>
            <div className="mt-4 space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Coverage Amount</span>
                <span className="text-sm">
                  {subscriptionData.insurance.coverage}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Valid Until</span>
                <span className="text-sm">
                  {subscriptionData.insurance.validUntil}
                </span>
              </div>
            </div>
            <div className="mt-4">
              <div className="flex justify-between text-sm mb-1">
                <span>Used</span>
                <span>
                  {Math.round(
                    (subscriptionData.usageStats.insuranceUsed /
                      subscriptionData.usageStats.insuranceTotal) *
                      100
                  )}
                  %
                </span>
              </div>
              <Progress
                value={
                  (subscriptionData.usageStats.insuranceUsed /
                    subscriptionData.usageStats.insuranceTotal) *
                  100
                }
                className="h-2 bg-gray-200"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>
                  ₹
                  {(subscriptionData.usageStats.insuranceUsed / 1000).toFixed(
                    0
                  )}
                  K
                </span>
                <span>
                  ₹
                  {(subscriptionData.usageStats.insuranceTotal / 1000).toFixed(
                    0
                  )}
                  K
                </span>
              </div>
            </div>
          </div>

          <div className="border rounded-lg p-4">
            <div className="flex justify-between items-center">
              <h4 className="font-medium">Ayushman Bharat</h4>
              <Badge className="bg-green-500">Active</Badge>
            </div>
            <div className="mt-4 space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">ID</span>
                <span className="text-sm">
                  {subscriptionData.govtSchemes[0].id}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Coverage Amount</span>
                <span className="text-sm">
                  {subscriptionData.govtSchemes[0].coverage}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Valid Until</span>
                <span className="text-sm">
                  {subscriptionData.govtSchemes[0].validUntil}
                </span>
              </div>
            </div>
            <div className="mt-4">
              <div className="flex justify-between text-sm mb-1">
                <span>Used</span>
                <span>
                  {Math.round(
                    (subscriptionData.usageStats.govtSchemeUsed /
                      subscriptionData.usageStats.govtSchemeTotal) *
                      100
                  )}
                  %
                </span>
              </div>
              <Progress
                value={
                  (subscriptionData.usageStats.govtSchemeUsed /
                    subscriptionData.usageStats.govtSchemeTotal) *
                  100
                }
                className="h-2 bg-gray-200"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>
                  ₹
                  {(subscriptionData.usageStats.govtSchemeUsed / 1000).toFixed(
                    0
                  )}
                  K
                </span>
                <span>
                  ₹
                  {(subscriptionData.usageStats.govtSchemeTotal / 1000).toFixed(
                    0
                  )}
                  K
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-6">
        <h3 className="text-lg font-semibold mb-4">Financial Aid</h3>
        <div className="border rounded-lg p-4 bg-green-50">
          <div className="flex items-start">
            <div className="h-6 w-6 rounded-full bg-green-500 flex items-center justify-center text-white text-xs mr-3 mt-0.5">
              ✓
            </div>
            <div>
              <h4 className="font-medium">Eligible for Financial Aid</h4>
              <p className="text-sm mt-1">
                {subscriptionData.financialAid.details}
              </p>
              <Button variant="link" className="text-[#0070f3] p-0 h-auto mt-2">
                View Details
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
