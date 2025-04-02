
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
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Package, 
  Download, 
  Search, 
  BarChart3, 
  PieChart 
} from "lucide-react";

// Sample data for purchase orders from inventory perspective
const samplePurchaseOrders = [
  {
    id: "PO-2023-001",
    supplier: "Auto Parts Inc.",
    date: "2023-10-15",
    category: "Engine Parts",
    items: [
      { name: "Air Filter", quantity: 25, received: 25, price: 250 },
      { name: "Spark Plugs", quantity: 50, received: 50, price: 120 }
    ],
    total: 12500,
    status: "Completed"
  },
  {
    id: "PO-2023-002",
    supplier: "Brake Systems Ltd.",
    date: "2023-11-02",
    category: "Braking Systems",
    items: [
      { name: "Brake Pads", quantity: 30, received: 30, price: 180 },
      { name: "Brake Discs", quantity: 15, received: 15, price: 290 }
    ],
    total: 8750,
    status: "Approved"
  },
  {
    id: "PO-2023-003",
    supplier: "Engine Components Co.",
    date: "2023-11-10",
    category: "Engine Parts",
    items: [
      { name: "Timing Belt", quantity: 20, received: 0, price: 320 },
      { name: "Engine Oil Filter", quantity: 40, received: 0, price: 180 }
    ],
    total: 15200,
    status: "Pending"
  },
  {
    id: "PO-2023-004",
    supplier: "Electrical Parts Suppliers",
    date: "2023-11-18",
    category: "Electrical",
    items: [
      { name: "Alternator", quantity: 10, received: 10, price: 450 },
      { name: "Battery", quantity: 10, received: 10, price: 1800 }
    ],
    total: 6300,
    status: "Completed"
  },
  {
    id: "PO-2023-005",
    supplier: "Filter Manufacturers",
    date: "2023-11-25",
    category: "Filters",
    items: [
      { name: "Air Filter", quantity: 35, received: 35, price: 120 }
    ],
    total: 4200,
    status: "Approved"
  }
];

export default function InventoryPurchaseReport() {
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [activeTab, setActiveTab] = useState<string>("orders");
  
  const filteredOrders = samplePurchaseOrders.filter(order => {
    const matchesSearch = 
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.supplier.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesStatus = 
      statusFilter === "all" || 
      order.status.toLowerCase() === statusFilter.toLowerCase();
      
    const matchesCategory =
      categoryFilter === "all" ||
      order.category.toLowerCase() === categoryFilter.toLowerCase();
      
    return matchesSearch && matchesStatus && matchesCategory;
  });
  
  // Calculate statistics for total order value per category
  const categorySummary = samplePurchaseOrders.reduce((acc, order) => {
    if (!acc[order.category]) {
      acc[order.category] = 0;
    }
    acc[order.category] += order.total;
    return acc;
  }, {} as Record<string, number>);
  
  // List of unique categories
  const categories = Array.from(new Set(samplePurchaseOrders.map(order => order.category)));
  
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Inventory Purchase Report</h1>
            <p className="text-muted-foreground">
              Analyze inventory purchases by status, category, and item
            </p>
          </div>
          <Button className="gap-2">
            <Download className="h-4 w-4" />
            Export Report
          </Button>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Filters</CardTitle>
            <CardDescription>Filter inventory purchase orders</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4 md:flex-row">
              <div className="md:w-1/4">
                <Select
                  value={statusFilter}
                  onValueChange={setStatusFilter}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="md:w-1/4">
                <Select
                  value={categoryFilter}
                  onValueChange={setCategoryFilter}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map(category => (
                      <SelectItem key={category} value={category.toLowerCase()}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="relative md:w-2/4">
                <Search className="absolute left-2 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by PO number or supplier..." 
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Tabs defaultValue="orders" onValueChange={setActiveTab} value={activeTab}>
          <TabsList>
            <TabsTrigger value="orders">
              <Package className="h-4 w-4 mr-2" />
              Purchase Orders
            </TabsTrigger>
            <TabsTrigger value="summary">
              <BarChart3 className="h-4 w-4 mr-2" />
              Category Summary
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="orders" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  Inventory Purchase Orders
                </CardTitle>
                <CardDescription>
                  Total {filteredOrders.length} purchase orders found
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>PO Number</TableHead>
                      <TableHead>Supplier</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Items</TableHead>
                      <TableHead className="text-right">Total Amount</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredOrders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium">{order.id}</TableCell>
                        <TableCell>{order.supplier}</TableCell>
                        <TableCell>{order.date}</TableCell>
                        <TableCell>{order.category}</TableCell>
                        <TableCell>{order.items.reduce((sum, item) => sum + item.quantity, 0)}</TableCell>
                        <TableCell className="text-right">₹{order.total.toLocaleString()}</TableCell>
                        <TableCell>
                          <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium
                            ${order.status === 'Completed' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' :
                              order.status === 'Approved' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' :
                              'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'}`}>
                            {order.status}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                    {filteredOrders.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={7} className="h-24 text-center">
                          No purchase orders found
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="summary" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="h-5 w-5" />
                  Purchase by Category
                </CardTitle>
                <CardDescription>
                  Total purchase value by product category
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Object.entries(categorySummary).map(([category, total]) => (
                    <div key={category} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className={`h-3 w-3 rounded-full ${
                          category === 'Engine Parts' ? 'bg-blue-500' :
                          category === 'Braking Systems' ? 'bg-red-500' :
                          category === 'Electrical' ? 'bg-yellow-500' :
                          category === 'Filters' ? 'bg-green-500' : 'bg-gray-500'
                        }`} />
                        <span>{category}</span>
                      </div>
                      <span className="font-medium">₹{total.toLocaleString()}</span>
                    </div>
                  ))}
                  
                  <div className="mt-6 pt-6 border-t">
                    <div className="flex items-center justify-between font-bold">
                      <span>Total Purchase Value</span>
                      <span>₹{Object.values(categorySummary).reduce((a, b) => a + b, 0).toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
