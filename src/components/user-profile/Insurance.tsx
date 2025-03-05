import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { mockUserData } from "@/library/mock-data/MockData"
import { Check, CreditCard, FileText, HelpCircle, Info, Shield } from 'lucide-react'


interface InsuranceProps {
  userData: typeof mockUserData
}

export function Insurance({ userData }: InsuranceProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Healthcare Subscription & Insurance</h2>
        <Button>
          <Shield className="h-4 w-4 mr-2" />
          Explore Plans
        </Button>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Subscription Plan</CardTitle>
            <CardDescription>Your active healthcare subscription details</CardDescription>
          </CardHeader>
          <CardContent>
            {userData.subscriptionPlan ? (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-2xl font-bold">{userData.subscriptionPlan}</div>
                    <div className="text-muted-foreground">₹{userData.subscriptionAmount}/month</div>
                  </div>
                  <Badge className="bg-[#0070f3]">Active</Badge>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Billing Period</span>
                    <span>June 1 - July 1, 2023</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Next Payment</span>
                    <span>July 1, 2023</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Payment Method</span>
                    <span className="flex items-center">
                      <CreditCard className="h-3 w-3 mr-1" />
                      UPI - xxxx@upi
                    </span>
                  </div>
                </div>
                
                <div className="space-y-2 pt-2 border-t">
                  <div className="text-sm font-medium">Plan Benefits</div>
                  <div className="space-y-1">
                    {userData.subscriptionBenefits.map((benefit, index) => (
                      <div key={index} className="flex text-sm">
                        <Check className="h-4 w-4 mr-2 text-[#43C6B8]" />
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="flex gap-2 pt-2">
                  <Button variant="outline" size="sm">Change Plan</Button>
                  <Button variant="outline" size="sm">Billing History</Button>
                </div>
              </div>
            ) : (
              <div className="text-center py-10 space-y-4">
                <div className="text-muted-foreground">
                  You don&apos;t have an active subscription plan
                </div>
                <Button>Subscribe Now</Button>
              </div>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Insurance Coverage</CardTitle>
            <CardDescription>Your health insurance details</CardDescription>
          </CardHeader>
          <CardContent>
            {userData.insuranceCoverage ? (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-2xl font-bold">{userData.insuranceProvider}</div>
                    <div className="text-muted-foreground">Policy #{userData.insurancePolicyNumber}</div>
                  </div>
                  <Badge className="bg-[#43C6B8]">Active</Badge>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Coverage Amount</span>
                    <span>₹{userData.insuranceCoverageAmount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Valid Until</span>
                    <span>{userData.insuranceValidUntil}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Type</span>
                    <span>{userData.insuranceType}</span>
                  </div>
                </div>
                
                <div className="space-y-3 pt-2">
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>Coverage Used</span>
                      <span>₹{userData.insuranceUsed.toLocaleString()} of ₹{userData.insuranceCoverageAmount.toLocaleString()}</span>
                    </div>
                    <Progress 
                      value={(userData.insuranceUsed / userData.insuranceCoverageAmount) * 100} 
                      className="h-2" 
                    />
                  </div>
                  
                  <div className="p-3 bg-blue-50 rounded-md text-sm flex">
                    <Info className="h-4 w-4 mr-2 text-[#0070f3] flex-shrink-0 mt-0.5" />
                    <div className="text-[#0070f3]">
                      You have ₹{(userData.insuranceCoverageAmount - userData.insuranceUsed).toLocaleString()} remaining coverage for this policy period.
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-2 pt-2">
                  <Button variant="outline" size="sm">View Policy</Button>
                  <Button variant="outline" size="sm">Claim History</Button>
                </div>
              </div>
            ) : (
              <div className="text-center py-10 space-y-4">
                <div className="text-muted-foreground">
                  You don&apos;t have active insurance coverage
                </div>
                <Button>Explore Insurance Options</Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div className="space-y-1">
            <CardTitle>Government Health Schemes</CardTitle>
            <CardDescription>Your eligibility and enrollment in government healthcare programs</CardDescription>
          </div>
          <Button variant="outline" size="sm">
            <HelpCircle className="h-4 w-4 mr-2" />
            Check Eligibility
          </Button>
        </CardHeader>
        <CardContent>
          {userData.govtSchemes.length > 0 ? (
            <div className="space-y-4">
              {userData.govtSchemes.map((scheme, index) => (
                <div key={index} className="border rounded-md overflow-hidden">
                  <div className="bg-slate-50 p-3 border-b flex justify-between items-center">
                    <div className="font-medium">{scheme.name}</div>
                    <Badge className={scheme.status === 'Active' ? 'bg-[#43C6B8]' : 'bg-[#F97316]'}>
                      {scheme.status}
                    </Badge>
                  </div>
                  <div className="p-3 grid gap-4 md:grid-cols-2">
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">Coverage Details</div>
                      <div className="text-sm">
                        {scheme.coverageDetails}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">Card Number & Validity</div>
                      <div className="text-sm font-medium">
                        {scheme.cardNumber} • Valid till {scheme.validUntil}
                      </div>
                      
                      <div className="text-sm text-muted-foreground mt-3 mb-1">Eligible Facilities</div>
                      <div className="text-sm">
                        {scheme.eligibleFacilities}
                      </div>
                    </div>
                  </div>
                  <div className="border-t p-3 flex justify-end gap-2">
                    <Button variant="ghost" size="sm" className="h-8 flex items-center text-[#0070f3]">
                      <FileText className="h-4 w-4 mr-1" />
                      View Card
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              No government schemes enrolled or eligible
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
