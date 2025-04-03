
import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Download, Filter, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

// Sample data
const lowStockData = [
  { id: "SKU001", name: "Brake Pads - Ceramic", category: "Brake Systems", quantity: 5, reorderLevel: 10, price: 450, supplier: "Supreme Auto Parts" },
  { id: "SKU012", name: "Engine Oil - Synthetic 5W30", category: "Fluids & Oils", quantity: 3, reorderLevel: 15, price: 550, supplier: "Royal Lubricants" },
  { id: "SKU024", name: "Air Filters - High Performance", category: "Filters", quantity: 4, reorderLevel: 12, price: 350, supplier: "FilterMax India" },
  { id: "SKU038", name: "Spark Plugs - Iridium", category: "Engine Parts", quantity: 8, reorderLevel: 20, price: 120, supplier: "Spark Technologies" },
  { id: "SKU045", name: "Headlight Bulbs - LED", category: "Electrical", quantity: 6, reorderLevel: 8, price: 220, supplier: "Light Solutions" }
];

const valuationData = [
  { id: "SKU001", name: "Brake Pads - Ceramic", category: "Brake Systems", quantity: 5, price: 450, totalValue: 2250 },
  { id: "SKU002", name: "Brake Discs - Slotted", category: "Brake Systems", quantity: 12, price: 1200, totalValue: 14400 },
  { id: "SKU003", name: "Brake Fluid DOT4", category: "Fluids & Oils", quantity: 25, price: 320, totalValue: 8000 },
  { id: "SKU004", name: "Oil Filter - Standard", category: "Filters", quantity: 30, price: 250, totalValue: 7500 },
  { id: "SKU005", name: "Oil Filter - Premium", category: "Filters", quantity: 15, price: 350, totalValue: 5250 },
  { id: "SKU006", name: "Air Filter - Standard", category: "Filters", quantity: 28, price: 280, totalValue: 7840 },
  { id: "SKU007", name: "Engine Oil - Mineral 15W40", category: "Fluids & Oils", quantity: 22, price: 420, totalValue: 9240 },
  { id: "SKU008", name: "Engine Oil - Synthetic 5W30", category: "Fluids & Oils", quantity: 3, price: 550, totalValue: 1650 },
  { id: "SKU009", name: "Spark Plugs - Copper", category: "Engine Parts", quantity: 40, price: 80, totalValue: 3200 },
  { id: "SKU010", name: "Spark Plugs - Iridium", category: "Engine Parts", quantity: 8, price: 120, totalValue: 960 }
];

const movementData = [
  { id: "MOV001", itemId: "SKU001", name: "Brake Pads - Ceramic", date: new Date(2025, 3, 1), type: "Inward", quantity: 20, reference: "PO-458", notes: "Regular stock replenishment" },
  { id: "MOV002", itemId: "SKU001", name: "Brake Pads - Ceramic", date: new Date(2025, 3, 3), type: "Outward", quantity: 15, reference: "INV-112", notes: "Customer order" },
  { id: "MOV003", itemId: "SKU008", name: "Engine Oil - Synthetic 5W30", date: new Date(2025, 3, 2), type: "Inward", quantity: 30, reference: "PO-459", notes: "New stock arrival" },
  { id: "MOV004", itemId: "SKU008", name: "Engine Oil - Synthetic 5W30", date: new Date(2025, 3, 4), type: "Outward", quantity: 27, reference: "INV-113", notes: "Bulk order - Garage Solutions" },
  { id: "MOV005", itemId: "SKU010", name: "Spark Plugs - Iridium", date: new Date(2025, 3, 5), type: "Inward", quantity: 50, reference: "PO-460", notes: "Seasonal stock up" },
  { id: "MOV006", itemId: "SKU010", name: "Spark Plugs - Iridium", date: new Date(2025, 3, 7), type: "Outward", quantity: 42, reference: "INV-115", notes: "Multiple customer orders" },
  { id: "MOV007", itemId: "SKU004", name: "Oil Filter - Standard", date: new Date(2025, 3, 8), type: "Inward", quantity: 40, reference: "PO-462", notes: "Regular restocking" },
  { id: "MOV008", itemId: "SKU004", name: "Oil Filter - Standard", date: new Date(2025, 3, 10), type: "Outward", quantity: 10, reference: "INV-118", notes: "Customer order" }
];

const expiryData = [
  { id: "SKU032", name: "Transmission Fluid ATF", category: "Fluids & Oils", expiryDate: new Date(2025, 5, 15), daysRemaining: 45, quantity: 18, status: "Warning" },
  { id: "SKU041", name: "Brake Fluid DOT5", category: "Fluids & Oils", expiryDate: new Date(2025, 5, 30), daysRemaining: 60, quantity: 12, status: "Warning" },
  { id: "SKU052", name: "Battery Electrolyte", category: "Chemicals", expiryDate: new Date(2025, 4, 20), daysRemaining: 20, quantity: 8, status: "Critical" },
  { id: "SKU017", name: "Radiator Coolant - Green", category: "Fluids & Oils", expiryDate: new Date(2025, 6, 10), daysRemaining: 70, quantity: 22, status: "Good" },
  { id: "SKU069", name: "Carb Cleaner Spray", category: "Chemicals", expiryDate: new Date(2025, 4, 15), daysRemaining: 15, quantity: 5, status: "Critical" },
  { id: "SKU073", name: "Rubber Conditioner", category: "Chemicals", expiryDate: new Date(2025, 5, 5), daysRemaining: 35, quantity: 10, status: "Warning" }
];

export default function InventoryReportsPage() {
  const [activeTab, setActiveTab] = useState("low-stock");
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [dateRange, setDateRange] = useState({ from: new Date(2025, 3, 1), to: new Date(2025, 3, 30) });
  
  // Filtered data states
  const [filteredLowStock, setFilteredLowStock] = useState(lowStockData);
  const [filteredValuation, setFilteredValuation] = useState(valuationData);
  const [filteredMovement, setFilteredMovement] = useState(movementData);
  const [filteredExpiry, setFilteredExpiry] = useState(expiryData);
  
  // Category options based on all data
  const allCategories = Array.from(
    new Set([
      ...lowStockData.map(item => item.category),
      ...valuationData.map(item => item.category),
      ...expiryData.map(item => item.category)
    ])
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    
    if (term === "") {
      applyFilters(categoryFilter, dateRange);
    } else {
      filterData(term, categoryFilter, dateRange);
    }
  };

  const handleCategoryFilter = (category: string) => {
    setCategoryFilter(category);
    filterData(searchTerm, category, dateRange);
  };

  const handleDateRangeChange = (range: { from?: Date; to?: Date }) => {
    const updatedRange = {
      from: range.from || dateRange.from,
      to: range.to || dateRange.to
    };
    setDateRange(updatedRange);
    filterData(searchTerm, categoryFilter, updatedRange);
  };

  const applyFilters = (category: string, range: { from: Date; to: Date }) => {
    // Apply category filter
    let lowStockFiltered = category === "All" 
      ? lowStockData 
      : lowStockData.filter(item => item.category === category);
      
    let valuationFiltered = category === "All"
      ? valuationData
      : valuationData.filter(item => item.category === category);
      
    // Movement data also needs date filtering
    let movementFiltered = movementData.filter(item => 
      item.date >= range.from && 
      item.date <= range.to
    );
    
    // For expiry, filter by category and include only items not expired
    let expiryFiltered = expiryData.filter(item => 
      (category === "All" || item.category === category)
    );
    
    setFilteredLowStock(lowStockFiltered);
    setFilteredValuation(valuationFiltered);
    setFilteredMovement(movementFiltered);
    setFilteredExpiry(expiryFiltered);
  };

  const filterData = (term: string, category: string, range: { from: Date; to: Date }) => {
    // Apply search term filtering
    if (term) {
      // Low stock filtering
      let lowStockFiltered = lowStockData.filter(item => 
        (item.name.toLowerCase().includes(term) || 
        item.id.toLowerCase().includes(term)) &&
        (category === "All" || item.category === category)
      );
      
      // Valuation data filtering
      let valuationFiltered = valuationData.filter(item => 
        (item.name.toLowerCase().includes(term) || 
        item.id.toLowerCase().includes(term)) &&
        (category === "All" || item.category === category)
      );
      
      // Movement data filtering with date range
      let movementFiltered = movementData.filter(item => 
        (item.name.toLowerCase().includes(term) || 
        item.itemId.toLowerCase().includes(term)) &&
        item.date >= range.from && 
        item.date <= range.to
      );
      
      // Expiry data filtering
      let expiryFiltered = expiryData.filter(item => 
        (item.name.toLowerCase().includes(term) || 
        item.id.toLowerCase().includes(term)) &&
        (category === "All" || item.category === category)
      );
      
      setFilteredLowStock(lowStockFiltered);
      setFilteredValuation(valuationFiltered);
      setFilteredMovement(movementFiltered);
      setFilteredExpiry(expiryFiltered);
    } else {
      applyFilters(category, range);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Critical":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300";
      case "Warning":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300";
      case "Good":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300";
    }
  };

  const getMovementTypeColor = (type: string) => {
    return type === "Inward"
      ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
      : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300";
  };

  const totalInventoryValue = valuationData.reduce((sum, item) => sum + item.totalValue, 0);
  const lowStockValue = lowStockData.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold tracking-tight">Inventory Reports</h1>
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export Report
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-4 w-full">
            <TabsTrigger value="low-stock" className="flex-1">Low Stock/Reorder</TabsTrigger>
            <TabsTrigger value="valuation" className="flex-1">Stock Valuation</TabsTrigger>
            <TabsTrigger value="movement" className="flex-1">Stock Movement</TabsTrigger>
            <TabsTrigger value="expiry" className="flex-1">Item Expiry</TabsTrigger>
          </TabsList>

          {/* Common filter section for all tabs */}
          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row justify-between gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search items..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={handleSearch}
                  />
                </div>
                
                <div className="flex gap-2 flex-wrap md:flex-nowrap">
                  <Select value={categoryFilter} onValueChange={handleCategoryFilter}>
                    <SelectTrigger className="w-[180px]">
                      <div className="flex items-center gap-2">
                        <Filter className="h-4 w-4" />
                        <span>{categoryFilter} Categories</span>
                      </div>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All">All Categories</SelectItem>
                      {allCategories.map(category => (
                        <SelectItem key={category} value={category}>{category}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  {activeTab === "movement" && (
                    <div className="border rounded-md p-1 flex gap-2 items-center">
                      <Calendar className="h-4 w-4 ml-2 text-muted-foreground" />
                      <div className="flex flex-col">
                        <div className="text-xs text-muted-foreground">Date Range</div>
                        <div className="text-sm">
                          {format(dateRange.from, 'dd/MM/yy')} - {format(dateRange.to, 'dd/MM/yy')}
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <Button variant="outline">
                    Apply Filters
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Low Stock Report Tab */}
          <TabsContent value="low-stock">
            <Card>
              <CardHeader>
                <CardTitle>Low Stock & Reorder Report</CardTitle>
                <CardDescription>
                  Items that have fallen below their reorder level and need to be restocked
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Item ID</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Current Stock</TableHead>
                        <TableHead>Reorder Level</TableHead>
                        <TableHead>Unit Price (₹)</TableHead>
                        <TableHead>Supplier</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredLowStock.length > 0 ? (
                        filteredLowStock.map((item) => (
                          <TableRow key={item.id}>
                            <TableCell>{item.id}</TableCell>
                            <TableCell className="font-medium">{item.name}</TableCell>
                            <TableCell>{item.category}</TableCell>
                            <TableCell>
                              <Badge variant="outline" className="bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300 border-red-200 dark:border-red-800">
                                {item.quantity}
                              </Badge>
                            </TableCell>
                            <TableCell>{item.reorderLevel}</TableCell>
                            <TableCell>₹{item.price.toLocaleString('en-IN')}</TableCell>
                            <TableCell>{item.supplier}</TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={7} className="text-center py-6 text-muted-foreground">
                            No low stock items found
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
                
                <div className="mt-4 p-4 bg-muted rounded-md">
                  <div className="flex flex-col md:flex-row justify-between gap-4">
                    <div>
                      <p className="text-sm font-medium">Total Low Stock Items</p>
                      <p className="text-2xl font-bold">{filteredLowStock.length}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Total Value at Risk</p>
                      <p className="text-2xl font-bold">₹{lowStockValue.toLocaleString('en-IN')}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Avg. Stock Level</p>
                      <p className="text-2xl font-bold">
                        {filteredLowStock.length > 0 
                          ? Math.round(filteredLowStock.reduce((sum, item) => sum + item.quantity, 0) / filteredLowStock.length) 
                          : 0}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Stock Valuation Report Tab */}
          <TabsContent value="valuation">
            <Card>
              <CardHeader>
                <CardTitle>Stock Valuation Report</CardTitle>
                <CardDescription>
                  Current inventory valuation showing stock levels and their monetary value
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Item ID</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Quantity</TableHead>
                        <TableHead>Unit Price (₹)</TableHead>
                        <TableHead className="text-right">Total Value (₹)</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredValuation.length > 0 ? (
                        filteredValuation.map((item) => (
                          <TableRow key={item.id}>
                            <TableCell>{item.id}</TableCell>
                            <TableCell className="font-medium">{item.name}</TableCell>
                            <TableCell>{item.category}</TableCell>
                            <TableCell>{item.quantity}</TableCell>
                            <TableCell>₹{item.price.toLocaleString('en-IN')}</TableCell>
                            <TableCell className="text-right">₹{item.totalValue.toLocaleString('en-IN')}</TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                            No valuation data found
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
                
                <div className="mt-4 p-4 bg-muted rounded-md">
                  <div className="flex flex-col md:flex-row justify-between gap-4">
                    <div>
                      <p className="text-sm font-medium">Total Inventory Items</p>
                      <p className="text-2xl font-bold">{filteredValuation.length}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Total Inventory Value</p>
                      <p className="text-2xl font-bold">₹{totalInventoryValue.toLocaleString('en-IN')}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Avg. Item Value</p>
                      <p className="text-2xl font-bold">
                        ₹{filteredValuation.length > 0 
                          ? Math.round(totalInventoryValue / filteredValuation.length).toLocaleString('en-IN') 
                          : 0}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Stock Movement Report Tab */}
          <TabsContent value="movement">
            <Card>
              <CardHeader>
                <CardTitle>Stock Movement Report</CardTitle>
                <CardDescription>
                  Tracks all inward and outward movement of inventory items
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Movement ID</TableHead>
                        <TableHead>Item</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Quantity</TableHead>
                        <TableHead>Reference</TableHead>
                        <TableHead>Notes</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredMovement.length > 0 ? (
                        filteredMovement.map((item) => (
                          <TableRow key={item.id}>
                            <TableCell>{item.id}</TableCell>
                            <TableCell className="font-medium">
                              <div>{item.name}</div>
                              <div className="text-xs text-muted-foreground">{item.itemId}</div>
                            </TableCell>
                            <TableCell>{format(item.date, 'dd/MM/yyyy')}</TableCell>
                            <TableCell>
                              <Badge className={getMovementTypeColor(item.type)}>
                                {item.type}
                              </Badge>
                            </TableCell>
                            <TableCell>{item.quantity}</TableCell>
                            <TableCell>{item.reference}</TableCell>
                            <TableCell>{item.notes}</TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={7} className="text-center py-6 text-muted-foreground">
                            No movement data found for selected date range
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
                
                <div className="mt-4 p-4 bg-muted rounded-md">
                  <div className="flex flex-col md:flex-row justify-between gap-4">
                    <div>
                      <p className="text-sm font-medium">Total Movements</p>
                      <p className="text-2xl font-bold">{filteredMovement.length}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Inward Movements</p>
                      <p className="text-2xl font-bold">
                        {filteredMovement.filter(item => item.type === "Inward").length}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Outward Movements</p>
                      <p className="text-2xl font-bold">
                        {filteredMovement.filter(item => item.type === "Outward").length}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Item Expiry Report Tab */}
          <TabsContent value="expiry">
            <Card>
              <CardHeader>
                <CardTitle>Item Expiry/End-of-Life Report</CardTitle>
                <CardDescription>
                  Items nearing their expiration date or end-of-life dates
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Item ID</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Expiry Date</TableHead>
                        <TableHead>Days Remaining</TableHead>
                        <TableHead>Quantity</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredExpiry.length > 0 ? (
                        filteredExpiry.map((item) => (
                          <TableRow key={item.id}>
                            <TableCell>{item.id}</TableCell>
                            <TableCell className="font-medium">{item.name}</TableCell>
                            <TableCell>{item.category}</TableCell>
                            <TableCell>{format(item.expiryDate, 'dd/MM/yyyy')}</TableCell>
                            <TableCell>{item.daysRemaining}</TableCell>
                            <TableCell>{item.quantity}</TableCell>
                            <TableCell>
                              <Badge className={getStatusColor(item.status)}>
                                {item.status}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={7} className="text-center py-6 text-muted-foreground">
                            No expiry data found
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
                
                <div className="mt-4 p-4 bg-muted rounded-md">
                  <div className="flex flex-col md:flex-row justify-between gap-4">
                    <div>
                      <p className="text-sm font-medium">Critical Items (< 30 days)</p>
                      <p className="text-2xl font-bold text-red-600">
                        {filteredExpiry.filter(item => item.daysRemaining < 30).length}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Warning Items (30-60 days)</p>
                      <p className="text-2xl font-bold text-yellow-600">
                        {filteredExpiry.filter(item => item.daysRemaining >= 30 && item.daysRemaining <= 60).length}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Total Expiring Items</p>
                      <p className="text-2xl font-bold">
                        {filteredExpiry.length}
                      </p>
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
