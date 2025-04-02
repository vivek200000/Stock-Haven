
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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  Download, 
  Search, 
  AlertCircle, 
  FileX, 
  RefreshCw, 
  BarChart3,
  Calendar
} from "lucide-react";

// Sample data for returned items
const returnedItems = [
  {
    id: "RET-2023-001",
    orderRef: "SO-2023-432",
    customerName: "Raj Automotive",
    date: "2023-12-14",
    item: "Brake Pads",
    quantity: 5,
    price: 180,
    totalValue: 900,
    reason: "Defective",
    status: "Processed",
    action: "Refund",
    notes: "Customer received damaged items. Full refund processed."
  },
  {
    id: "RET-2023-002",
    orderRef: "SO-2023-445",
    customerName: "Sharma Motors",
    date: "2023-12-10",
    item: "Headlight Assembly",
    quantity: 2,
    price: 950,
    totalValue: 1900,
    reason: "Wrong Item",
    status: "Processed",
    action: "Replacement",
    notes: "Wrong model sent. Replacement dispatched on 2023-12-12."
  },
  {
    id: "RET-2023-003",
    orderRef: "SO-2023-448",
    customerName: "Krishna Auto Parts",
    date: "2023-12-09",
    item: "Spark Plugs",
    quantity: 10,
    price: 120,
    totalValue: 1200,
    reason: "Defective",
    status: "Processed",
    action: "Refund",
    notes: "Items did not match quality standards. Refunded in full."
  },
  {
    id: "RET-2023-004",
    orderRef: "SO-2023-455",
    customerName: "Gupta Car Care",
    date: "2023-12-16",
    item: "Timing Belt",
    quantity: 3,
    price: 320,
    totalValue: 960,
    reason: "Customer Changed Mind",
    status: "Pending",
    action: "Refund",
    notes: "Customer requested return due to ordering error. Awaiting receipt of returned items."
  },
  {
    id: "RET-2023-005",
    orderRef: "SO-2023-449",
    customerName: "Singh Mechanics",
    date: "2023-12-08",
    item: "Air Filter",
    quantity: 8,
    price: 250,
    totalValue: 2000,
    reason: "Damaged in Transit",
    status: "Processed",
    action: "Replacement",
    notes: "Package was damaged during shipping. Replacement sent on 2023-12-11."
  },
  {
    id: "RET-2023-006",
    orderRef: "SO-2023-457",
    customerName: "Raj Automotive",
    date: "2023-12-17",
    item: "Alternator",
    quantity: 1,
    price: 450,
    totalValue: 450,
    reason: "Wrong Specifications",
    status: "Pending",
    action: "Replacement",
    notes: "Item doesn't match vehicle specifications. Awaiting return."
  }
];

// Sample data for return reasons and actions
const returnReasons = [
  { reason: "Defective", count: 2, value: 2100 },
  { reason: "Wrong Item", count: 1, value: 1900 },
  { reason: "Damaged in Transit", count: 1, value: 2000 },
  { reason: "Customer Changed Mind", count: 1, value: 960 },
  { reason: "Wrong Specifications", count: 1, value: 450 }
];

const returnActions = [
  { action: "Refund", count: 3, value: 3060 },
  { action: "Replacement", count: 3, value: 4350 }
];

export default function ReturnedItems() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [reasonFilter, setReasonFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [activeTab, setActiveTab] = useState<string>("all");
  
  const filteredReturns = returnedItems.filter(item => {
    const matchesSearch = 
      item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.item.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesReason = 
      reasonFilter === "all" || 
      item.reason.toLowerCase() === reasonFilter.toLowerCase();
      
    const matchesStatus =
      statusFilter === "all" ||
      item.status.toLowerCase() === statusFilter.toLowerCase();
      
    return matchesSearch && matchesReason && matchesStatus;
  });
  
  // Calculate totals
  const totalReturnValue = returnedItems.reduce((sum, item) => sum + item.totalValue, 0);
  const pendingCount = returnedItems.filter(item => item.status === "Pending").length;
  const processedCount = returnedItems.filter(item => item.status === "Processed").length;
  
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Returned Items Report</h1>
            <p className="text-muted-foreground">
              Analyze and manage returned inventory items
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
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Returns</CardTitle>
              <FileX className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{returnedItems.length}</div>
              <p className="text-xs text-muted-foreground mt-1">
                Value: ₹{totalReturnValue.toLocaleString()}
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Pending Returns</CardTitle>
              <RefreshCw className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pendingCount}</div>
              <p className="text-xs text-muted-foreground mt-1">
                Awaiting processing
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Processed Returns</CardTitle>
              <AlertCircle className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{processedCount}</div>
              <p className="text-xs text-muted-foreground mt-1">
                Successfully resolved
              </p>
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileX className="h-5 w-5" />
              Return Analysis
            </CardTitle>
            <CardDescription>
              Breakdown of return reasons and actions taken
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <h3 className="font-medium mb-2 text-sm">Return Reasons</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Reason</TableHead>
                      <TableHead className="text-right">Count</TableHead>
                      <TableHead className="text-right">Value</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {returnReasons.map((reason) => (
                      <TableRow key={reason.reason}>
                        <TableCell>{reason.reason}</TableCell>
                        <TableCell className="text-right">{reason.count}</TableCell>
                        <TableCell className="text-right">₹{reason.value.toLocaleString()}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              
              <div>
                <h3 className="font-medium mb-2 text-sm">Return Actions</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Action</TableHead>
                      <TableHead className="text-right">Count</TableHead>
                      <TableHead className="text-right">Value</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {returnActions.map((action) => (
                      <TableRow key={action.action}>
                        <TableCell>{action.action}</TableCell>
                        <TableCell className="text-right">{action.count}</TableCell>
                        <TableCell className="text-right">₹{action.value.toLocaleString()}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Tabs defaultValue="all" onValueChange={setActiveTab} value={activeTab}>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-4">
            <TabsList className="h-9">
              <TabsTrigger value="all" className="text-xs sm:text-sm">All Returns</TabsTrigger>
              <TabsTrigger value="pending" className="text-xs sm:text-sm">Pending</TabsTrigger>
              <TabsTrigger value="processed" className="text-xs sm:text-sm">Processed</TabsTrigger>
            </TabsList>
            
            <div className="flex gap-2">
              <Select value={reasonFilter} onValueChange={setReasonFilter}>
                <SelectTrigger className="w-[150px] h-9">
                  <SelectValue placeholder="Reason" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Reasons</SelectItem>
                  <SelectItem value="defective">Defective</SelectItem>
                  <SelectItem value="wrong item">Wrong Item</SelectItem>
                  <SelectItem value="damaged in transit">Damaged in Transit</SelectItem>
                  <SelectItem value="customer changed mind">Changed Mind</SelectItem>
                  <SelectItem value="wrong specifications">Wrong Specs</SelectItem>
                </SelectContent>
              </Select>
              
              <div className="relative flex-1">
                <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search returns..." 
                  className="pl-8 h-9"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>
          
          <TabsContent value="all" className="mt-0">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Returned Items List
                </CardTitle>
                <CardDescription>
                  Complete list of returned items and their current status
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Return ID</TableHead>
                      <TableHead>Order Ref</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Item</TableHead>
                      <TableHead className="text-right">Value</TableHead>
                      <TableHead>Reason</TableHead>
                      <TableHead>Action</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredReturns.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">{item.id}</TableCell>
                        <TableCell>{item.orderRef}</TableCell>
                        <TableCell>{item.customerName}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3 text-muted-foreground" />
                            {item.date}
                          </div>
                        </TableCell>
                        <TableCell>
                          {item.item} × {item.quantity}
                        </TableCell>
                        <TableCell className="text-right">₹{item.totalValue.toLocaleString()}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300 dark:border-yellow-500">
                            {item.reason}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className={item.action === "Refund" 
                            ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-500"
                            : "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-500"
                          }>
                            {item.action}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={item.status === "Processed" ? "default" : "secondary"}
                            className={item.status === "Processed" 
                              ? "bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-900/30 dark:text-green-300" 
                              : "bg-orange-100 text-orange-800 hover:bg-orange-100 dark:bg-orange-900/30 dark:text-orange-300"
                            }
                          >
                            {item.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                    {filteredReturns.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={9} className="h-24 text-center">
                          No returned items found
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="pending" className="mt-0">
            <Card>
              <CardContent className="pt-6">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Return ID</TableHead>
                      <TableHead>Order Ref</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Item</TableHead>
                      <TableHead className="text-right">Value</TableHead>
                      <TableHead>Reason</TableHead>
                      <TableHead>Action</TableHead>
                      <TableHead>Notes</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredReturns
                      .filter(item => item.status === "Pending")
                      .map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">{item.id}</TableCell>
                        <TableCell>{item.orderRef}</TableCell>
                        <TableCell>{item.customerName}</TableCell>
                        <TableCell>{item.date}</TableCell>
                        <TableCell>
                          {item.item} × {item.quantity}
                        </TableCell>
                        <TableCell className="text-right">₹{item.totalValue.toLocaleString()}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300 dark:border-yellow-500">
                            {item.reason}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className={item.action === "Refund" 
                            ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-500"
                            : "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-500"
                          }>
                            {item.action}
                          </Badge>
                        </TableCell>
                        <TableCell className="max-w-[200px] truncate" title={item.notes}>
                          {item.notes}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="processed" className="mt-0">
            <Card>
              <CardContent className="pt-6">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Return ID</TableHead>
                      <TableHead>Order Ref</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Item</TableHead>
                      <TableHead className="text-right">Value</TableHead>
                      <TableHead>Reason</TableHead>
                      <TableHead>Action</TableHead>
                      <TableHead>Notes</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredReturns
                      .filter(item => item.status === "Processed")
                      .map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">{item.id}</TableCell>
                        <TableCell>{item.orderRef}</TableCell>
                        <TableCell>{item.customerName}</TableCell>
                        <TableCell>{item.date}</TableCell>
                        <TableCell>
                          {item.item} × {item.quantity}
                        </TableCell>
                        <TableCell className="text-right">₹{item.totalValue.toLocaleString()}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300 dark:border-yellow-500">
                            {item.reason}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className={item.action === "Refund" 
                            ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-500"
                            : "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-500"
                          }>
                            {item.action}
                          </Badge>
                        </TableCell>
                        <TableCell className="max-w-[200px] truncate" title={item.notes}>
                          {item.notes}
                        </TableCell>
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
