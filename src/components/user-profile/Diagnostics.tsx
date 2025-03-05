import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "@/components/ui/table"
import { mockUserData } from "@/library/mock-data/MockData"
import { CalendarPlus, ChevronDown, Clock, Eye, FileText, Plus, TrendingUpIcon as Trending } from 'lucide-react'


interface DiagnosticsProps {
  userData: typeof mockUserData
}

export function Diagnostics({ userData }: DiagnosticsProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Diagnostic Tests & Reports</h2>
        <div className="flex gap-2">
          <Button variant="outline">
            <CalendarPlus className="h-4 w-4 mr-2" />
            Schedule Test
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Upload Report
          </Button>
        </div>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Tests</CardTitle>
            <CardDescription>Tests that are scheduled or due soon</CardDescription>
          </CardHeader>
          <CardContent>
            {userData.upcomingDiagnosticTests.length > 0 ? (
              <div className="space-y-4">
                {userData.upcomingDiagnosticTests.map((test, index) => (
                  <div key={index} className="border rounded-md overflow-hidden">
                    <div className="bg-slate-50 p-3 border-b flex justify-between items-center">
                      <div className="font-medium">{test.testName}</div>
                      <Badge className={test.isDue ? 'bg-[#F97316]' : 'bg-[#0070f3]'}>
                        {test.isDue ? 'Due Now' : 'Scheduled'}
                      </Badge>
                    </div>
                    <div className="p-3 space-y-3">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <div className="text-sm text-muted-foreground">Date & Time</div>
                          <div className="text-sm flex items-center">
                            <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                            {test.scheduledDate || 'Due now'}
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">Location</div>
                          <div className="text-sm">{test.location}</div>
                        </div>
                      </div>
                      
                      <div className="text-sm text-muted-foreground">
                        <div>Notes:</div>
                        <div>{test.notes || 'No special instructions'}</div>
                      </div>
                      
                      {test.freeUnderGovtScheme && (
                        <div className="bg-[#43C6B8]/10 p-2 rounded-md text-sm text-[#43C6B8]">
                          This test is covered under government scheme
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-10 text-muted-foreground">
                No upcoming diagnostic tests scheduled
              </div>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Test Trends</CardTitle>
            <CardDescription>Changes in your test results over time</CardDescription>
          </CardHeader>
          <CardContent>
            {userData.diagnosticTrends.length > 0 ? (
              <div className="space-y-4">
                {userData.diagnosticTrends.map((trend, index) => (
                  <div key={index} className="border rounded-md overflow-hidden">
                    <div className="bg-slate-50 p-3 border-b flex justify-between items-center">
                      <div className="font-medium">{trend.testName}</div>
                      <Badge className={
                        trend.trend === 'Improving' 
                          ? 'bg-[#43C6B8]' 
                          : trend.trend === 'Stable' 
                            ? 'bg-[#0070f3]' 
                            : 'bg-[#F97316]'
                      }>
                        {trend.trend}
                      </Badge>
                    </div>
                    <div className="p-3">
                      <div className="h-20 bg-slate-100 rounded-md flex items-center justify-center text-muted-foreground mb-3">
                        Graph visualization will appear here
                      </div>
                      
                      <div className="grid grid-cols-3 gap-2 text-sm">
                        <div className="border rounded-md p-2">
                          <div className="text-xs text-muted-foreground">Latest</div>
                          <div className="font-medium">{trend.latestValue}</div>
                          <div className="text-xs text-muted-foreground">{trend.latestDate}</div>
                        </div>
                        <div className="border rounded-md p-2">
                          <div className="text-xs text-muted-foreground">Previous</div>
                          <div className="font-medium">{trend.previousValue}</div>
                          <div className="text-xs text-muted-foreground">{trend.previousDate}</div>
                        </div>
                        <div className="border rounded-md p-2">
                          <div className="text-xs text-muted-foreground">Change</div>
                          <div className={
                            trend.trend === 'Improving' 
                              ? 'text-[#43C6B8] font-medium' 
                              : trend.trend === 'Worsening' 
                                ? 'text-[#F97316] font-medium' 
                                : 'font-medium'
                          }>
                            {trend.changeValue}
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-3 flex justify-between items-center">
                        <div className="text-sm text-muted-foreground">
                          {trend.interpretation}
                        </div>
                        <Button variant="ghost" size="sm" className="flex items-center text-[#0070f3]">
                          <Trending className="h-4 w-4 mr-1" />
                          Full Trend
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-10 text-muted-foreground">
                No diagnostic trends available
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div className="space-y-1">
            <CardTitle>Test History</CardTitle>
            <CardDescription>All your past diagnostic tests and results</CardDescription>
          </div>
          <Button variant="outline" size="sm">
            Filter
            <ChevronDown className="h-4 w-4 ml-1" />
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Test Name</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Lab/Hospital</TableHead>
                <TableHead>Result Summary</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {userData.pastDiagnosticTests.map((test, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <div className="font-medium">{test.testName}</div>
                    <div className="text-xs text-muted-foreground">{test.testType}</div>
                  </TableCell>
                  <TableCell>{test.date}</TableCell>
                  <TableCell>{test.labName}</TableCell>
                  <TableCell>
                    <div className="max-w-[200px] truncate">{test.resultSummary}</div>
                  </TableCell>
                  <TableCell>
                    <Badge className={
                      test.status === 'Normal' 
                        ? 'bg-[#43C6B8]' 
                        : test.status === 'Abnormal' 
                          ? 'bg-[#F97316]' 
                          : 'bg-red-500'
                    }>
                      {test.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex gap-1 justify-end">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <FileText className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
