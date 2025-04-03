
import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Download, Filter, Search, TrendingDown, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { Progress } from "@/components/ui/progress";

// Sample data
const purchaseOrdersData = [
  { 
    id: "PO-001", 
    date: new Date(2025, 2, 10), 
    supplier: "Supreme Auto Parts", 
    items: [
      { name: "Brake Pads", quantity: 50, price: 400 },
      { name: "Brake Fluid", quantity: 30, price: 300 }
    ],
    totalAmount: 29000,
    status: "Completed",
    paymentStatus: "Paid",
    deliveryDate: new Date(2025, 2, 15)
  },
  { 
    id: "PO-002", 
    date: new Date(2025, 2, 12), 
    supplier: "Royal Lubricants", 
    items: [
      { name: "Engine Oil", quantity: 100, price: 500 },
      { name: "Coolant", quantity: 50, price: 250 }
    ],
    totalAmount: 62500,
    status: "Pending",
    paymentStatus: "Unpaid",
    deliveryDate: new Date(2025, 3, 5)
  },
  { 
    id: "PO-003", 
    date: new Date(2025, 2, 15), 
    supplier: "FilterMax India", 
    items: [
      { name: "Air Filters", quantity: 80, price: 300 },
      { name: "Oil Filters", quantity: 80, price: 200 }
    ],
    totalAmount: 40000,
    status: "Completed",
    paymentStatus: "Paid",
    deliveryDate: new Date(2025, 2, 25)
  },
  { 
    id: "PO-004", 
    date: new Date(2025, 2, 18), 
    supplier: "Spark Technologies", 
    items: [
      { name: "Spark Plugs", quantity: 200, price: 120 }
    ],
    totalAmount: 24000,
    status: "Approved",
    paymentStatus: "Pending",
    deliveryDate: new Date(2025, 3, 10)
  },
  { 
    id: "PO-005", 
    date: new Date(2025, 2, 20), 
    supplier: "Light Solutions", 
    items: [
      { name: "Headlight Bulbs", quantity: 100, price: 200 },
      { name: "Fog Lamps", quantity: 50, price: 350 }
    ],
    totalAmount: 37500,
    status: "Pending",
    paymentStatus: "Unpaid",
    deliveryDate: new Date(2025, 3, 15)
  }
];

const supplierPerformanceData = [
  { 
    id: 1, 
    name: "Supreme Auto Parts", 
    totalOrders: 32, 
    onTimeDelivery: 28,
    deliveryScore: 87.5,
    qualityScore: 96,
    priceCompetitiveness: 85,
    issuesReported: 2,
    averageResponseTime: "2 days",
    trend: "up",
    lastOrderDate: new Date(2025, 2, 15)
  },
  { 
    id: 2, 
    name: "Royal Lubricants", 
    totalOrders: 25, 
    onTimeDelivery: 23,
    deliveryScore: 92,
    qualityScore: 90,
    priceCompetitiveness: 78,
    issuesReported: 1,
    averageResponseTime: "1 day",
    trend: "up",
    lastOrderDate: new Date(2025, 2, 12)
  },
  { 
    id: 3, 
    name: "FilterMax India", 
    totalOrders: 18, 
    onTimeDelivery: 15,
    deliveryScore: 83.3,
    qualityScore: 92,
    priceCompetitiveness: 88,
    issuesReported: 0,
    averageResponseTime: "3 days",
    trend: "up",
    lastOrderDate: new Date(2025, 2, 25)
  },
  { 
    id: 4, 
    name: "Spark Technologies", 
    totalOrders: 22, 
    onTimeDelivery: 18,
    deliveryScore: 81.8,
    qualityScore: 85,
    priceCompetitiveness: 92,
    issuesReported: 3,
    averageResponseTime: "2 days",
    trend: "down",
    lastOrderDate: new Date(2025, 3, 10)
  },
  { 
    id: 5, 
    name: "Light Solutions", 
    totalOrders: 15, 
    onTimeDelivery: 12,
    deliveryScore: 80,
    qualityScore: 88,
    priceCompetitiveness: 90,
    issuesReported: 1,
    averageResponseTime: "2 days",
    trend: "stable",
    lastOrderDate: new Date(2025, 3, 15)
  }
];

const goodsReceivedData = [
  { 
    id: "GRN-001", 
    poReference: "PO-001",
    date: new Date(2025, 2, 15), 
    supplier: "Supreme Auto Parts", 
    items: [
      { name: "Brake Pads", orderedQty: 50, receivedQty: 50, condition: "Good" },
      { name: "Brake Fluid", orderedQty: 30, receivedQty: 28, condition: "Good" }
    ],
    status: "Complete",
    notes: "2 bottles of brake fluid damaged in transit"
  },
  { 
    id: "GRN-002", 
    poReference: "PO-003",
    date: new Date(2025, 2, 25), 
    supplier: "FilterMax India", 
    items: [
      { name: "Air Filters", orderedQty: 80, receivedQty: 80, condition: "Good" },
      { name: "Oil Filters", orderedQty: 80, receivedQty: 80, condition: "Good" }
    ],
    status: "Complete",
    notes: "All items received in good condition"
  },
  { 
    id: "GRN-003", 
    poReference: "PO-004",
    date: new Date(2025, 3, 8), 
    supplier: "Spark Technologies", 
    items: [
      { name: "Spark Plugs", orderedQty: 200, receivedQty: 195, condition: "Good" }
    ],
    status: "Partial",
    notes: "5 units short delivery, vendor to send remaining in next shipment"
  },
  { 
    id: "GRN-004", 
    poReference: "PO-002",
    date: new Date(2025, 3, 2), 
    supplier: "Royal Lubricants", 
    items: [
      { name: "Engine Oil", orderedQty: 100, receivedQty: 100, condition: "Good" },
      { name: "Coolant", orderedQty: 50, receivedQty: 0, condition: "N/A" }
    ],
    status: "Partial",
    notes: "Coolant out of stock, expected next week"
  }
];

export default function PurchaseReportsPage() {
  const [activeTab, setActiveTab] = useState("purchase-orders");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [supplierFilter, setSupplierFilter] = useState("All");
  
  // Filtered data states
  const [filteredPOs, setFilteredPOs] = useState(purchaseOrdersData);
  const [filteredSuppliers, setFilteredSuppliers] = useState(supplierPerformanceData);
  const [filteredGRNs, setFilteredGRNs] = useState(goodsReceivedData);
  
  // Get all suppliers for dropdown
  const allSuppliers = Array.from(new Set(purchaseOrdersData.map(po => po.supplier)));
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    
    if (term === "") {
      applyFilters(statusFilter, supplierFilter);
    } else {
      filterData(term, statusFilter, supplierFilter);
    }
  };

  const handleStatusFilter = (status: string) => {
    setStatusFilter(status);
    filterData(searchTerm, status, supplierFilter);
  };

  const handleSupplierFilter = (supplier: string) => {
    setSupplierFilter(supplier);
    filterData(searchTerm, statusFilter, supplier);
  };

  const applyFilters = (status: string, supplier: string) => {
    // Filter purchase orders
    let posFiltered = purchaseOrdersData;
    
    if (status !== "All") {
      posFiltered = posFiltered.filter(po => po.status === status);
    }
    
    if (supplier !== "All") {
      posFiltered = posFiltered.filter(po => po.supplier === supplier);
    }
    
    setFilteredPOs(posFiltered);
    
    // Filter suppliers (only by supplier name)
    let suppliersFiltered = supplierPerformanceData;
    
    if (supplier !== "All") {
      suppliersFiltered = suppliersFiltered.filter(s => s.name === supplier);
    }
    
    setFilteredSuppliers(suppliersFiltered);
    
    // Filter goods received notes
    let grnsFiltered = goodsReceivedData;
    
    if (status !== "All") {
      grnsFiltered = grnsFiltered.filter(grn => grn.status === status);
    }
    
    if (supplier !== "All") {
      grnsFiltered = grnsFiltered.filter(grn => grn.supplier === supplier);
    }
    
    setFilteredGRNs(grnsFiltered);
  };

  const filterData = (term: string, status: string, supplier: string) => {
    if (term) {
      // Filter purchase orders
      let posFiltered = purchaseOrdersData.filter(po => 
        (po.id.toLowerCase().includes(term) || 
        po.supplier.toLowerCase().includes(term)) &&
        (status === "All" || po.status === status) &&
        (supplier === "All" || po.supplier === supplier)
      );
      
      // Filter suppliers
      let suppliersFiltered = supplierPerformanceData.filter(s => 
        s.name.toLowerCase().includes(term) &&
        (supplier === "All" || s.name === supplier)
      );
      
      // Filter goods received notes
      let grnsFiltered = goodsReceivedData.filter(grn => 
        (grn.id.toLowerCase().includes(term) || 
        grn.supplier.toLowerCase().includes(term) ||
        grn.poReference.toLowerCase().includes(term)) &&
        (status === "All" || grn.status === status) &&
        (supplier === "All" || grn.supplier === supplier)
      );
      
      setFilteredPOs(posFiltered);
      setFilteredSuppliers(suppliersFiltered);
      setFilteredGRNs(grnsFiltered);
    } else {
      applyFilters(status, supplier);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300";
      case "Approved":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300";
      case "Pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300";
      case "Partial":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300";
      case "Complete":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300";
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case "Paid":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300";
      case "Pending":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300";
      case "Unpaid":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300";
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600";
    if (score >= 80) return "text-yellow-600";
    return "text-red-600";
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-green-600" />;
      case "down":
        return <TrendingDown className="h-4 w-4 text-red-600" />;
      default:
        return null;
    }
  };

  // Calculate summary statistics
  const totalPOValue = purchaseOrdersData.reduce((sum, po) => sum + po.totalAmount, 0);
  const pendingPOs = purchaseOrdersData.filter(po => po.status === "Pending").length;
  const completedPOs = purchaseOrdersData.filter(po => po.status === "Completed").length;
  const avgSupplierScore = Math.round(supplierPerformanceData.reduce((sum, s) => sum + s.deliveryScore, 0) / supplierPerformanceData.length);

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold tracking-tight">Purchase Reports</h1>
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export Report
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-4 w-full">
            <TabsTrigger value="purchase-orders" className="flex-1">Purchase Orders</TabsTrigger>
            <TabsTrigger value="supplier-performance" className="flex-1">Supplier Performance</TabsTrigger>
            <TabsTrigger value="goods-received" className="flex-1">Goods Received</TabsTrigger>
          </TabsList>

          {/* Common filter section for all tabs */}
          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row justify-between gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={handleSearch}
                  />
                </div>
                
                <div className="flex gap-2 flex-wrap md:flex-nowrap">
                  {activeTab !== "supplier-performance" && (
                    <Select value={statusFilter} onValueChange={handleStatusFilter}>
                      <SelectTrigger className="min-w-[140px]">
                        <div className="flex items-center gap-2">
                          <Filter className="h-4 w-4" />
                          <span>{statusFilter} Status</span>
                        </div>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="All">All Status</SelectItem>
                        <SelectItem value="Pending">Pending</SelectItem>
                        <SelectItem value="Approved">Approved</SelectItem>
                        <SelectItem value="Completed">Completed</SelectItem>
                        <SelectItem value="Partial">Partial</SelectItem>
                        <SelectItem value="Complete">Complete</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                  
                  <Select value={supplierFilter} onValueChange={handleSupplierFilter}>
                    <SelectTrigger className="min-w-[140px]">
                      <div className="flex items-center gap-2">
                        <Filter className="h-4 w-4" />
                        <span>Supplier</span>
                      </div>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All">All Suppliers</SelectItem>
                      {allSuppliers.map(supplier => (
                        <SelectItem key={supplier} value={supplier}>{supplier}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  <Button variant="outline">
                    Apply Filters
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Purchase Orders Report Tab */}
          <TabsContent value="purchase-orders">
            <Card>
              <CardHeader>
                <CardTitle>Purchase Order Report</CardTitle>
                <CardDescription>
                  Overview of all purchase orders and their current status
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-2xl font-bold">₹{totalPOValue.toLocaleString('en-IN')}</div>
                      <p className="text-sm text-muted-foreground">Total PO Value</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-2xl font-bold">{pendingPOs}</div>
                      <p className="text-sm text-muted-foreground">Pending Orders</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-2xl font-bold">{completedPOs}</div>
                      <p className="text-sm text-muted-foreground">Completed Orders</p>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="rounded-md border overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>PO ID</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Supplier</TableHead>
                        <TableHead>Amount (₹)</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Payment</TableHead>
                        <TableHead>Delivery Date</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredPOs.length > 0 ? (
                        filteredPOs.map((po) => (
                          <TableRow key={po.id}>
                            <TableCell className="font-medium">{po.id}</TableCell>
                            <TableCell>{format(po.date, 'dd/MM/yyyy')}</TableCell>
                            <TableCell>{po.supplier}</TableCell>
                            <TableCell>₹{po.totalAmount.toLocaleString('en-IN')}</TableCell>
                            <TableCell>
                              <Badge className={getStatusColor(po.status)}>
                                {po.status}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Badge className={getPaymentStatusColor(po.paymentStatus)}>
                                {po.paymentStatus}
                              </Badge>
                            </TableCell>
                            <TableCell>{format(po.deliveryDate, 'dd/MM/yyyy')}</TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={7} className="text-center py-6 text-muted-foreground">
                            No purchase orders found
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Supplier Performance Report Tab */}
          <TabsContent value="supplier-performance">
            <Card>
              <CardHeader>
                <CardTitle>Supplier Performance Report</CardTitle>
                <CardDescription>
                  Evaluates supplier delivery times, order accuracy, and pricing trends
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-2xl font-bold">{supplierPerformanceData.length}</div>
                      <p className="text-sm text-muted-foreground">Active Suppliers</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-2xl font-bold">{avgSupplierScore}%</div>
                      <p className="text-sm text-muted-foreground">Avg. Delivery Score</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-2xl font-bold">
                        {supplierPerformanceData.reduce((sum, s) => sum + s.issuesReported, 0)}
                      </div>
                      <p className="text-sm text-muted-foreground">Total Issues Reported</p>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="rounded-md border overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Supplier</TableHead>
                        <TableHead>Orders</TableHead>
                        <TableHead>Delivery Score</TableHead>
                        <TableHead>Quality Score</TableHead>
                        <TableHead>Price Score</TableHead>
                        <TableHead>Issues</TableHead>
                        <TableHead>Response Time</TableHead>
                        <TableHead>Trend</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredSuppliers.length > 0 ? (
                        filteredSuppliers.map((supplier) => (
                          <TableRow key={supplier.id}>
                            <TableCell className="font-medium">
                              <div>{supplier.name}</div>
                              <div className="text-xs text-muted-foreground">
                                Last order: {format(supplier.lastOrderDate, 'dd/MM/yyyy')}
                              </div>
                            </TableCell>
                            <TableCell>
                              <div>{supplier.totalOrders}</div>
                              <div className="text-xs text-muted-foreground">
                                {supplier.onTimeDelivery} on time
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className={getScoreColor(supplier.deliveryScore)}>
                                {supplier.deliveryScore}%
                              </div>
                              <Progress value={supplier.deliveryScore} className="h-1 mt-1" />
                            </TableCell>
                            <TableCell>
                              <div className={getScoreColor(supplier.qualityScore)}>
                                {supplier.qualityScore}%
                              </div>
                              <Progress value={supplier.qualityScore} className="h-1 mt-1" />
                            </TableCell>
                            <TableCell>
                              <div className={getScoreColor(supplier.priceCompetitiveness)}>
                                {supplier.priceCompetitiveness}%
                              </div>
                              <Progress value={supplier.priceCompetitiveness} className="h-1 mt-1" />
                            </TableCell>
                            <TableCell>{supplier.issuesReported}</TableCell>
                            <TableCell>{supplier.averageResponseTime}</TableCell>
                            <TableCell>
                              {getTrendIcon(supplier.trend)}
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={8} className="text-center py-6 text-muted-foreground">
                            No supplier data found
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Goods Received Report Tab */}
          <TabsContent value="goods-received">
            <Card>
              <CardHeader>
                <CardTitle>Goods Received Report</CardTitle>
                <CardDescription>
                  Tracks goods received against purchase orders
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>GRN ID</TableHead>
                        <TableHead>PO Reference</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Supplier</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Notes</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredGRNs.length > 0 ? (
                        filteredGRNs.map((grn) => (
                          <TableRow key={grn.id}>
                            <TableCell className="font-medium">{grn.id}</TableCell>
                            <TableCell>{grn.poReference}</TableCell>
                            <TableCell>{format(grn.date, 'dd/MM/yyyy')}</TableCell>
                            <TableCell>{grn.supplier}</TableCell>
                            <TableCell>
                              <Badge className={getStatusColor(grn.status)}>
                                {grn.status}
                              </Badge>
                            </TableCell>
                            <TableCell>{grn.notes}</TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                            No goods received data found
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
                
                <div className="mt-6 space-y-4">
                  <h3 className="font-medium">Detailed Received Items</h3>
                  
                  {filteredGRNs.map((grn) => (
                    <Card key={grn.id} className="p-4">
                      <div className="flex justify-between items-center mb-2">
                        <div>
                          <h4 className="font-medium">{grn.id} - {grn.supplier}</h4>
                          <p className="text-sm text-muted-foreground">
                            PO: {grn.poReference} | Date: {format(grn.date, 'dd/MM/yyyy')}
                          </p>
                        </div>
                        <Badge className={getStatusColor(grn.status)}>
                          {grn.status}
                        </Badge>
                      </div>
                      
                      <div className="rounded-md border overflow-hidden mt-2">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Item</TableHead>
                              <TableHead>Ordered Qty</TableHead>
                              <TableHead>Received Qty</TableHead>
                              <TableHead>Condition</TableHead>
                              <TableHead>Variance</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {grn.items.map((item, index) => (
                              <TableRow key={index}>
                                <TableCell>{item.name}</TableCell>
                                <TableCell>{item.orderedQty}</TableCell>
                                <TableCell>{item.receivedQty}</TableCell>
                                <TableCell>{item.condition}</TableCell>
                                <TableCell>
                                  {item.orderedQty - item.receivedQty === 0 ? (
                                    <span className="text-green-600">No Variance</span>
                                  ) : (
                                    <span className="text-red-600">
                                      {item.orderedQty - item.receivedQty > 0 ? 'Short' : 'Over'} by {Math.abs(item.orderedQty - item.receivedQty)}
                                    </span>
                                  )}
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                      
                      {grn.notes && (
                        <div className="mt-2 text-sm">
                          <span className="font-medium">Notes:</span> {grn.notes}
                        </div>
                      )}
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
