
import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Download, 
  TrendingUp, 
  Clock, 
  AlertTriangle,
  TrendingDown,
  Check,
  BarChart3,
  Timer,
  Truck
} from "lucide-react";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from "@/components/ui/chart";
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from "recharts";
import { useToast } from "@/components/ui/use-toast";

// Sample data for supplier performance
const supplierPerformanceData = [
  {
    id: "SUP001",
    name: "Tata Auto Parts",
    onTimeDelivery: 95,
    orderAccuracy: 98,
    responseTime: 4.2,
    qualityRating: 4.8,
    costTrend: "stable",
    totalOrders: 156,
    returnRate: 1.2
  },
  {
    id: "SUP002",
    name: "Ashok Leyland Spares",
    onTimeDelivery: 88,
    orderAccuracy: 94,
    responseTime: 6.5,
    qualityRating: 4.5,
    costTrend: "increasing",
    totalOrders: 102,
    returnRate: 2.1
  },
  {
    id: "SUP003",
    name: "Mahindra Components",
    onTimeDelivery: 92,
    orderAccuracy: 96,
    responseTime: 5.1,
    qualityRating: 4.6,
    costTrend: "decreasing",
    totalOrders: 143,
    returnRate: 1.8
  },
  {
    id: "SUP004",
    name: "Maruti Genuine Parts",
    onTimeDelivery: 96,
    orderAccuracy: 99,
    responseTime: 3.8,
    qualityRating: 4.9,
    costTrend: "stable",
    totalOrders: 188,
    returnRate: 0.9
  },
  {
    id: "SUP005",
    name: "Bosch India",
    onTimeDelivery: 94,
    orderAccuracy: 97,
    responseTime: 4.0,
    qualityRating: 4.7,
    costTrend: "stable",
    totalOrders: 176,
    returnRate: 1.1
  },
  {
    id: "SUP006",
    name: "Apollo Tyres",
    onTimeDelivery: 91,
    orderAccuracy: 95,
    responseTime: 5.3,
    qualityRating: 4.4,
    costTrend: "increasing",
    totalOrders: 89,
    returnRate: 1.7
  },
  {
    id: "SUP007",
    name: "JK Tyres",
    onTimeDelivery: 87,
    orderAccuracy: 93,
    responseTime: 6.2,
    qualityRating: 4.2,
    costTrend: "increasing",
    totalOrders: 72,
    returnRate: 2.3
  },
  {
    id: "SUP008",
    name: "Exide Batteries",
    onTimeDelivery: 93,
    orderAccuracy: 96,
    responseTime: 4.8,
    qualityRating: 4.6,
    costTrend: "stable",
    totalOrders: 124,
    returnRate: 1.5
  }
];

// Sample data for time period analysis
const timeFrames = {
  "1month": { label: "1 Month" },
  "3months": { label: "3 Months" },
  "6months": { label: "6 Months" },
  "12months": { label: "12 Months" }
};

export default function SupplierPerformance() {
  const [searchTerm, setSearchTerm] = useState("");
  const [supplierFilter, setSupplierFilter] = useState("all");
  const [timeFrame, setTimeFrame] = useState("6months");
  const [activeTab, setActiveTab] = useState("all");
  const { toast } = useToast();
  
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];
  
  // Filtered data based on search and filters
  const filteredData = supplierPerformanceData.filter(supplier => {
    const matchesSearch = 
      supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supplier.id.toLowerCase().includes(searchTerm.toLowerCase());
      
    return matchesSearch;
  });
  
  // Sample performance breakdown for pie chart
  const performanceBreakdown = [
    { name: "Excellent (>95%)", value: 3 },
    { name: "Good (90-95%)", value: 2 },
    { name: "Average (85-90%)", value: 2 },
    { name: "Below Average (<85%)", value: 1 }
  ];
  
  // Sample data for time trend analysis
  const deliveryTrendData = [
    { month: 'Jan', Tata: 92, Maruti: 95, Bosch: 90 },
    { month: 'Feb', Tata: 93, Maruti: 96, Bosch: 91 },
    { month: 'Mar', Tata: 94, Maruti: 94, Bosch: 93 },
    { month: 'Apr', Tata: 91, Maruti: 95, Bosch: 92 },
    { month: 'May', Tata: 95, Maruti: 97, Bosch: 94 },
    { month: 'Jun', Tata: 96, Maruti: 98, Bosch: 95 },
  ];
  
  // Get sales quantity breakdown by time period
  const getSalesBreakdown = () => {
    // This would normally come from an API call
    return [
      { name: "Engine Parts", "1month": 120, "3months": 350, "6months": 720, "12months": 1450 },
      { name: "Electrical", "1month": 85, "3months": 260, "6months": 540, "12months": 1100 },
      { name: "Body Parts", "1month": 65, "3months": 200, "6months": 420, "12months": 850 },
      { name: "Fluids & Oils", "1month": 45, "3months": 135, "6months": 270, "12months": 550 },
      { name: "Other", "1month": 25, "3months": 80, "6months": 160, "12months": 320 }
    ];
  };
  
  const handleExportReport = () => {
    toast({
      title: "Exporting Report",
      description: "The supplier performance report is being exported to CSV.",
    });
    
    // Simulating download process
    setTimeout(() => {
      toast({
        title: "Export Complete",
        description: "Your report has been successfully exported.",
      });
    }, 1500);
  };
  
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Supplier Performance</h1>
            <p className="text-muted-foreground">
              Analyze supplier delivery times, order accuracy, and cost trends
            </p>
          </div>
          <Button onClick={handleExportReport} className="gap-2">
            <Download className="h-4 w-4" />
            Export Report
          </Button>
        </div>
        
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Average On-Time Delivery</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">92.8%</div>
              <p className="text-xs text-muted-foreground mt-1">
                Across all suppliers
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Average Response Time</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5.0 hrs</div>
              <p className="text-xs text-muted-foreground mt-1">
                For quote requests
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Average Return Rate</CardTitle>
              <AlertTriangle className="h-4 w-4 text-amber-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1.6%</div>
              <p className="text-xs text-muted-foreground mt-1">
                For all shipped items
              </p>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Performance Breakdown
              </CardTitle>
              <CardDescription>
                Supplier performance by category
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ChartContainer config={{
                  'Excellent (>95%)': { color: COLORS[0] },
                  'Good (90-95%)': { color: COLORS[1] },
                  'Average (85-90%)': { color: COLORS[2] },
                  'Below Average (<85%)': { color: COLORS[3] },
                }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={performanceBreakdown}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {performanceBreakdown.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Legend />
                      <ChartTooltip content={<ChartTooltipContent />} />
                    </PieChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Delivery Trends
              </CardTitle>
              <CardDescription>
                On-time delivery percentage over time for top suppliers
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={deliveryTrendData}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis domain={[85, 100]} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="Tata" fill="#8884d8" />
                    <Bar dataKey="Maruti" fill="#82ca9d" />
                    <Bar dataKey="Bosch" fill="#ffc658" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Truck className="h-5 w-5" />
              Sales Quantity Breakdown
            </CardTitle>
            <CardDescription>
              Parts sales quantity by category and time period
            </CardDescription>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mt-4">
              <Select value={timeFrame} onValueChange={setTimeFrame}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select Time Period" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(timeFrames).map(([key, { label }]) => (
                    <SelectItem key={key} value={key}>{label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <div className="relative w-full max-w-sm">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search suppliers..." 
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Category</TableHead>
                  <TableHead className="text-right">1 Month</TableHead>
                  <TableHead className="text-right">3 Months</TableHead>
                  <TableHead className="text-right">6 Months</TableHead>
                  <TableHead className="text-right">12 Months</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {getSalesBreakdown().map((row) => (
                  <TableRow key={row.name}>
                    <TableCell>{row.name}</TableCell>
                    <TableCell className="text-right">{row["1month"].toLocaleString()}</TableCell>
                    <TableCell className="text-right">{row["3months"].toLocaleString()}</TableCell>
                    <TableCell className="text-right">{row["6months"].toLocaleString()}</TableCell>
                    <TableCell className="text-right">{row["12months"].toLocaleString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        
        <Tabs defaultValue="all" onValueChange={setActiveTab} value={activeTab}>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-4">
            <TabsList className="h-9">
              <TabsTrigger value="all" className="text-xs sm:text-sm">All Suppliers</TabsTrigger>
              <TabsTrigger value="top" className="text-xs sm:text-sm">Top Performers</TabsTrigger>
              <TabsTrigger value="poor" className="text-xs sm:text-sm">Needs Improvement</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="all" className="mt-0">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Supplier Performance Metrics
                </CardTitle>
                <CardDescription>
                  Detailed evaluation of all suppliers
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Supplier</TableHead>
                      <TableHead className="text-right">On-Time Delivery</TableHead>
                      <TableHead className="text-right">Order Accuracy</TableHead>
                      <TableHead className="text-right">Response Time (hrs)</TableHead>
                      <TableHead className="text-right">Quality Rating</TableHead>
                      <TableHead>Cost Trend</TableHead>
                      <TableHead className="text-right">Return Rate</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredData.map((supplier) => (
                      <TableRow key={supplier.id}>
                        <TableCell className="font-medium">{supplier.name}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            {supplier.onTimeDelivery >= 95 ? (
                              <Check className="h-4 w-4 text-green-500" />
                            ) : supplier.onTimeDelivery >= 90 ? (
                              <Check className="h-4 w-4 text-amber-500" />
                            ) : (
                              <AlertTriangle className="h-4 w-4 text-red-500" />
                            )}
                            {supplier.onTimeDelivery}%
                          </div>
                        </TableCell>
                        <TableCell className="text-right">{supplier.orderAccuracy}%</TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Timer className="h-4 w-4 text-muted-foreground" />
                            {supplier.responseTime}
                          </div>
                        </TableCell>
                        <TableCell className="text-right">{supplier.qualityRating}/5.0</TableCell>
                        <TableCell>
                          <Badge variant="outline" className={
                            supplier.costTrend === "decreasing" 
                              ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 dark:border-green-500"
                              : supplier.costTrend === "increasing" 
                                ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 dark:border-red-500"
                                : "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-500"
                          }>
                            <div className="flex items-center gap-1">
                              {supplier.costTrend === "decreasing" ? (
                                <TrendingDown className="h-3 w-3" />
                              ) : supplier.costTrend === "increasing" ? (
                                <TrendingUp className="h-3 w-3" />
                              ) : (
                                <span className="h-3 w-3">―</span>
                              )}
                              {supplier.costTrend.charAt(0).toUpperCase() + supplier.costTrend.slice(1)}
                            </div>
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">{supplier.returnRate}%</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter className="flex justify-between">
                <p className="text-sm text-muted-foreground">
                  Showing {filteredData.length} of {supplierPerformanceData.length} suppliers
                </p>
                <Button variant="outline" onClick={handleExportReport}>
                  <Download className="h-4 w-4 mr-2" />
                  Export Data
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="top" className="mt-0">
            <Card>
              <CardContent className="pt-6">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Supplier</TableHead>
                      <TableHead className="text-right">On-Time Delivery</TableHead>
                      <TableHead className="text-right">Order Accuracy</TableHead>
                      <TableHead className="text-right">Quality Rating</TableHead>
                      <TableHead className="text-right">Total Orders</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredData
                      .filter(s => s.onTimeDelivery >= 93)
                      .sort((a, b) => b.onTimeDelivery - a.onTimeDelivery)
                      .map((supplier) => (
                      <TableRow key={supplier.id}>
                        <TableCell className="font-medium">{supplier.name}</TableCell>
                        <TableCell className="text-right">{supplier.onTimeDelivery}%</TableCell>
                        <TableCell className="text-right">{supplier.orderAccuracy}%</TableCell>
                        <TableCell className="text-right">{supplier.qualityRating}/5.0</TableCell>
                        <TableCell className="text-right">{supplier.totalOrders}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="poor" className="mt-0">
            <Card>
              <CardContent className="pt-6">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Supplier</TableHead>
                      <TableHead className="text-right">On-Time Delivery</TableHead>
                      <TableHead className="text-right">Return Rate</TableHead>
                      <TableHead>Cost Trend</TableHead>
                      <TableHead className="text-right">Response Time</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredData
                      .filter(s => s.onTimeDelivery < 93)
                      .sort((a, b) => a.onTimeDelivery - b.onTimeDelivery)
                      .map((supplier) => (
                      <TableRow key={supplier.id}>
                        <TableCell className="font-medium">{supplier.name}</TableCell>
                        <TableCell className="text-right">{supplier.onTimeDelivery}%</TableCell>
                        <TableCell className="text-right">{supplier.returnRate}%</TableCell>
                        <TableCell>
                          <Badge variant="outline" className={
                            supplier.costTrend === "decreasing" 
                              ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 dark:border-green-500"
                              : supplier.costTrend === "increasing" 
                                ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 dark:border-red-500"
                                : "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-500"
                          }>
                            {supplier.costTrend}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">{supplier.responseTime} hrs</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
