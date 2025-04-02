
import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Download, 
  Search, 
  TrendingUp, 
  TrendingDown, 
  AlertCircle, 
  CheckCircle, 
  Truck, 
  Clock, 
  DollarSign 
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Sample data for supplier performance
const supplierPerformanceData = [
  {
    id: 1,
    name: "Auto Parts Inc.",
    deliveryRating: 92,
    qualityRating: 90,
    pricingRating: 85,
    onTimeDelivery: "93%",
    defectRate: "2.1%",
    responseTime: "24h",
    lastOrder: "2023-12-10",
    totalOrders: 24,
    returnRate: "1.8%",
    priceTrend: "stable",
    status: "Excellent"
  },
  {
    id: 2,
    name: "Brake Systems Ltd.",
    deliveryRating: 84,
    qualityRating: 88,
    pricingRating: 80,
    onTimeDelivery: "85%",
    defectRate: "3.0%",
    responseTime: "36h",
    lastOrder: "2023-12-05",
    totalOrders: 18,
    returnRate: "2.5%",
    priceTrend: "increasing",
    status: "Good"
  },
  {
    id: 3,
    name: "Engine Components Co.",
    deliveryRating: 75,
    qualityRating: 80,
    pricingRating: 90,
    onTimeDelivery: "78%",
    defectRate: "4.2%",
    responseTime: "48h",
    lastOrder: "2023-11-28",
    totalOrders: 15,
    returnRate: "3.1%",
    priceTrend: "decreasing",
    status: "Average"
  },
  {
    id: 4,
    name: "Electrical Parts Suppliers",
    deliveryRating: 88,
    qualityRating: 85,
    pricingRating: 78,
    onTimeDelivery: "90%",
    defectRate: "2.8%",
    responseTime: "24h",
    lastOrder: "2023-12-08",
    totalOrders: 20,
    returnRate: "2.3%",
    priceTrend: "stable",
    status: "Good"
  },
  {
    id: 5,
    name: "Filter Manufacturers",
    deliveryRating: 94,
    qualityRating: 92,
    pricingRating: 82,
    onTimeDelivery: "96%",
    defectRate: "1.5%",
    responseTime: "12h",
    lastOrder: "2023-12-12",
    totalOrders: 22,
    returnRate: "1.2%",
    priceTrend: "stable",
    status: "Excellent"
  },
  {
    id: 6,
    name: "Auto Lighting Solutions",
    deliveryRating: 78,
    qualityRating: 82,
    pricingRating: 88,
    onTimeDelivery: "80%",
    defectRate: "3.5%",
    responseTime: "36h",
    lastOrder: "2023-12-02",
    totalOrders: 16,
    returnRate: "2.7%",
    priceTrend: "increasing",
    status: "Average"
  },
  {
    id: 7,
    name: "Glass & Mirrors Co.",
    deliveryRating: 72,
    qualityRating: 75,
    pricingRating: 92,
    onTimeDelivery: "70%",
    defectRate: "4.8%",
    responseTime: "72h",
    lastOrder: "2023-11-25",
    totalOrders: 10,
    returnRate: "3.9%",
    priceTrend: "decreasing",
    status: "Needs Improvement"
  }
];

export default function SupplierPerformance() {
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("deliveryRating");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  
  const handleSort = (column: string) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortOrder("desc");
    }
  };
  
  const filteredSuppliers = supplierPerformanceData
    .filter(supplier => {
      const matchesSearch = supplier.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === "all" || supplier.status.toLowerCase() === statusFilter.toLowerCase();
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      const aValue = a[sortBy as keyof typeof a];
      const bValue = b[sortBy as keyof typeof b];
      
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
      } else if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortOrder === 'asc' 
          ? aValue.localeCompare(bValue) 
          : bValue.localeCompare(aValue);
      }
      return 0;
    });
  
  const getStatusBadgeClass = (status: string) => {
    switch (status.toLowerCase()) {
      case "excellent":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300";
      case "good":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300";
      case "average":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300";
      case "needs improvement":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300";
    }
  };
  
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Supplier Performance</h1>
            <p className="text-muted-foreground">
              Evaluate and track supplier metrics for better inventory management
            </p>
          </div>
          <Button className="gap-2">
            <Download className="h-4 w-4" />
            Export Report
          </Button>
        </div>
        
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Top Performer
              </CardTitle>
              <CheckCircle className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="font-bold">Filter Manufacturers</div>
              <div className="text-xs text-muted-foreground mt-1">
                94% delivery rating, 1.5% defect rate
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Needs Improvement
              </CardTitle>
              <AlertCircle className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="font-bold">Glass & Mirrors Co.</div>
              <div className="text-xs text-muted-foreground mt-1">
                70% on-time delivery, 4.8% defect rate
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Average Response Time
              </CardTitle>
              <Clock className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="font-bold">36 hours</div>
              <div className="text-xs text-muted-foreground mt-1">
                Average supplier response time to inquiries
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Truck className="h-5 w-5" />
              Supplier Performance Analysis
            </CardTitle>
            <CardDescription className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <div className="flex gap-2">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Suppliers</SelectItem>
                    <SelectItem value="excellent">Excellent</SelectItem>
                    <SelectItem value="good">Good</SelectItem>
                    <SelectItem value="average">Average</SelectItem>
                    <SelectItem value="needs improvement">Needs Improvement</SelectItem>
                  </SelectContent>
                </Select>
                
                <div className="relative flex items-center">
                  <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search suppliers..." 
                    className="pl-8 h-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="text-sm mt-2 sm:mt-0">
                {filteredSuppliers.length} suppliers found
              </div>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="cursor-pointer" onClick={() => handleSort("name")}>
                    Supplier {sortBy === "name" && (sortOrder === "asc" ? "↑" : "↓")}
                  </TableHead>
                  <TableHead className="cursor-pointer" onClick={() => handleSort("deliveryRating")}>
                    Delivery {sortBy === "deliveryRating" && (sortOrder === "asc" ? "↑" : "↓")}
                  </TableHead>
                  <TableHead className="cursor-pointer" onClick={() => handleSort("qualityRating")}>
                    Quality {sortBy === "qualityRating" && (sortOrder === "asc" ? "↑" : "↓")}
                  </TableHead>
                  <TableHead className="cursor-pointer" onClick={() => handleSort("pricingRating")}>
                    Pricing {sortBy === "pricingRating" && (sortOrder === "asc" ? "↑" : "↓")}
                  </TableHead>
                  <TableHead>On-Time</TableHead>
                  <TableHead>Defect Rate</TableHead>
                  <TableHead>Price Trend</TableHead>
                  <TableHead className="cursor-pointer" onClick={() => handleSort("status")}>
                    Status {sortBy === "status" && (sortOrder === "asc" ? "↑" : "↓")}
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSuppliers.map((supplier) => (
                  <TableRow key={supplier.id}>
                    <TableCell className="font-medium">{supplier.name}</TableCell>
                    <TableCell>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div className="flex items-center gap-2">
                              <div className="bg-gray-200 dark:bg-gray-700 h-2 w-24 rounded-full overflow-hidden">
                                <div 
                                  className={`h-full ${
                                    supplier.deliveryRating >= 90 ? 'bg-green-500' :
                                    supplier.deliveryRating >= 80 ? 'bg-blue-500' :
                                    supplier.deliveryRating >= 70 ? 'bg-yellow-500' :
                                    'bg-red-500'
                                  }`} 
                                  style={{ width: `${supplier.deliveryRating}%` }}
                                />
                              </div>
                              <span>{supplier.deliveryRating}%</span>
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>On-time delivery: {supplier.onTimeDelivery}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </TableCell>
                    <TableCell>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div className="flex items-center gap-2">
                              <div className="bg-gray-200 dark:bg-gray-700 h-2 w-24 rounded-full overflow-hidden">
                                <div 
                                  className={`h-full ${
                                    supplier.qualityRating >= 90 ? 'bg-green-500' :
                                    supplier.qualityRating >= 80 ? 'bg-blue-500' :
                                    supplier.qualityRating >= 70 ? 'bg-yellow-500' :
                                    'bg-red-500'
                                  }`} 
                                  style={{ width: `${supplier.qualityRating}%` }}
                                />
                              </div>
                              <span>{supplier.qualityRating}%</span>
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Defect rate: {supplier.defectRate}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </TableCell>
                    <TableCell>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div className="flex items-center gap-2">
                              <div className="bg-gray-200 dark:bg-gray-700 h-2 w-24 rounded-full overflow-hidden">
                                <div 
                                  className={`h-full ${
                                    supplier.pricingRating >= 90 ? 'bg-green-500' :
                                    supplier.pricingRating >= 80 ? 'bg-blue-500' :
                                    supplier.pricingRating >= 70 ? 'bg-yellow-500' :
                                    'bg-red-500'
                                  }`} 
                                  style={{ width: `${supplier.pricingRating}%` }}
                                />
                              </div>
                              <span>{supplier.pricingRating}%</span>
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Pricing competitiveness rating</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </TableCell>
                    <TableCell>{supplier.onTimeDelivery}</TableCell>
                    <TableCell>{supplier.defectRate}</TableCell>
                    <TableCell>
                      {supplier.priceTrend === "increasing" ? (
                        <div className="flex items-center text-red-500">
                          <TrendingUp className="h-4 w-4 mr-1" />
                          Increasing
                        </div>
                      ) : supplier.priceTrend === "decreasing" ? (
                        <div className="flex items-center text-green-500">
                          <TrendingDown className="h-4 w-4 mr-1" />
                          Decreasing
                        </div>
                      ) : (
                        <div className="flex items-center text-blue-500">
                          <DollarSign className="h-4 w-4 mr-1" />
                          Stable
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusBadgeClass(supplier.status)}`}>
                        {supplier.status}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
                {filteredSuppliers.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={8} className="h-24 text-center">
                      No suppliers found matching your criteria
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
