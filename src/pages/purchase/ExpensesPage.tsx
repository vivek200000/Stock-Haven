
import React, { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ChevronDown,
  ChevronUp,
  Download,
  Filter,
  Plus,
  Search,
  Upload,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

// Sample data for expenses
const sampleExpenses = [
  {
    id: "EXP-001",
    date: "2023-10-10",
    vendor: "AutoParts Inc.",
    category: "Inventory",
    amount: 2850.00,
    paymentStatus: "Paid",
    paymentMethod: "Credit Card",
    receiptUrl: "",
    notes: "Quarterly stock replenishment"
  },
  {
    id: "EXP-002",
    date: "2023-10-15",
    vendor: "City Electric",
    category: "Utilities",
    amount: 450.75,
    paymentStatus: "Paid",
    paymentMethod: "Bank Transfer",
    receiptUrl: "",
    notes: "Monthly electricity bill"
  },
  {
    id: "EXP-003",
    date: "2023-10-20",
    vendor: "Premium Auto Components",
    category: "Inventory",
    amount: 1250.00,
    paymentStatus: "Pending",
    paymentMethod: "Net 30",
    receiptUrl: "",
    notes: "Special order parts"
  },
  {
    id: "EXP-004",
    date: "2023-10-22",
    vendor: "Office Supplies Co.",
    category: "Office",
    amount: 185.45,
    paymentStatus: "Paid",
    paymentMethod: "Credit Card",
    receiptUrl: "",
    notes: "Printer ink and paper"
  },
  {
    id: "EXP-005",
    date: "2023-10-25",
    vendor: "Maintenance Services",
    category: "Maintenance",
    amount: 550.00,
    paymentStatus: "Paid",
    paymentMethod: "Cash",
    receiptUrl: "",
    notes: "Warehouse cleaning"
  },
  {
    id: "EXP-006",
    date: "2023-10-28",
    vendor: "Logistics Partners",
    category: "Shipping",
    amount: 780.50,
    paymentStatus: "Pending",
    paymentMethod: "Net 15",
    receiptUrl: "",
    notes: "Outbound shipping costs"
  },
  {
    id: "EXP-007",
    date: "2023-11-01",
    vendor: "City Water",
    category: "Utilities",
    amount: 125.00,
    paymentStatus: "Paid",
    paymentMethod: "Bank Transfer",
    receiptUrl: "",
    notes: "Monthly water bill"
  },
  {
    id: "EXP-008",
    date: "2023-11-03",
    vendor: "Insurance Provider",
    category: "Insurance",
    amount: 425.00,
    paymentStatus: "Paid",
    paymentMethod: "Bank Transfer",
    receiptUrl: "",
    notes: "Monthly insurance premium"
  },
  {
    id: "EXP-009",
    date: "2023-11-05",
    vendor: "Marketing Agency",
    category: "Marketing",
    amount: 1200.00,
    paymentStatus: "Pending",
    paymentMethod: "Net 30",
    receiptUrl: "",
    notes: "Q4 marketing campaign"
  },
  {
    id: "EXP-010",
    date: "2023-11-10",
    vendor: "Elite Auto Parts",
    category: "Inventory",
    amount: 3500.00,
    paymentStatus: "Pending",
    paymentMethod: "Net 30",
    receiptUrl: "",
    notes: "Special order premium parts"
  }
];

// Categories of expenses
const expenseCategories = [
  "Inventory",
  "Utilities",
  "Office",
  "Maintenance",
  "Shipping",
  "Insurance",
  "Marketing",
  "Travel",
  "Other"
];

// Payment method options
const paymentMethods = [
  "Credit Card",
  "Bank Transfer",
  "Cash",
  "Check",
  "Net 15",
  "Net 30",
  "Net 60"
];

// Payment status options
const paymentStatuses = [
  "Paid",
  "Pending",
  "Overdue",
  "Cancelled"
];

// Filter functions
const filterByStatus = (expenses: any[], status: string) => {
  if (status === "all") return expenses;
  return expenses.filter(expense => expense.paymentStatus.toLowerCase() === status.toLowerCase());
};

const filterByCategory = (expenses: any[], category: string) => {
  if (category === "all") return expenses;
  return expenses.filter(expense => expense.category === category);
};

const filterByVendor = (expenses: any[], vendor: string) => {
  if (vendor === "all") return expenses;
  return expenses.filter(expense => expense.vendor === vendor);
};

const filterByDateRange = (expenses: any[], startDate: string, endDate: string) => {
  if (!startDate && !endDate) return expenses;
  
  return expenses.filter(expense => {
    const expenseDate = new Date(expense.date);
    const start = startDate ? new Date(startDate) : new Date(0);
    const end = endDate ? new Date(endDate) : new Date();
    
    return expenseDate >= start && expenseDate <= end;
  });
};

const filterBySearch = (expenses: any[], search: string) => {
  if (!search) return expenses;
  const searchLower = search.toLowerCase();
  
  return expenses.filter(expense => 
    expense.id.toLowerCase().includes(searchLower) ||
    expense.vendor.toLowerCase().includes(searchLower) ||
    expense.notes.toLowerCase().includes(searchLower)
  );
};

export default function ExpensesPage() {
  const { toast } = useToast();
  const [expenses, setExpenses] = useState(sampleExpenses);
  const [showEntryForm, setShowEntryForm] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState<any | null>(null);
  
  // Form state
  const [newExpense, setNewExpense] = useState({
    id: `EXP-${(Math.floor(Math.random() * 900) + 100).toString()}`,
    date: new Date().toISOString().split('T')[0],
    vendor: "",
    category: "",
    amount: "",
    paymentStatus: "Pending",
    paymentMethod: "",
    receiptUrl: "",
    notes: ""
  });
  
  // Filter state
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [vendorFilter, setVendorFilter] = useState("all");
  const [startDateFilter, setStartDateFilter] = useState("");
  const [endDateFilter, setEndDateFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  
  // Sort state
  const [sortField, setSortField] = useState("date");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  
  // Get unique vendors for filter
  const vendors = Array.from(new Set(sampleExpenses.map(expense => expense.vendor)));
  
  // Calculate total expenses and pending amount
  const totalExpensesAmount = sampleExpenses.reduce((sum, expense) => sum + expense.amount, 0);
  const pendingExpensesAmount = sampleExpenses
    .filter(expense => expense.paymentStatus === "Pending")
    .reduce((sum, expense) => sum + expense.amount, 0);
  
  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewExpense(prev => ({ ...prev, [name]: value }));
  };
  
  // Handle select changes
  const handleSelectChange = (name: string, value: string) => {
    setNewExpense(prev => ({ ...prev, [name]: value }));
  };
  
  // Submit new expense
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!newExpense.vendor || !newExpense.category || !newExpense.amount || !newExpense.paymentMethod) {
      toast({
        title: "Missing Information",
        description: "Please fill all required fields",
        variant: "destructive"
      });
      return;
    }
    
    const formattedExpense = {
      ...newExpense,
      amount: parseFloat(newExpense.amount)
    };
    
    if (selectedExpense) {
      // Update existing expense
      setExpenses(expenses.map(exp => 
        exp.id === selectedExpense.id ? formattedExpense : exp
      ));
      
      toast({
        title: "Expense Updated",
        description: `Expense ${formattedExpense.id} has been updated.`
      });
    } else {
      // Add new expense
      setExpenses([formattedExpense, ...expenses]);
      
      toast({
        title: "Expense Added",
        description: `Expense ${formattedExpense.id} has been created.`
      });
    }
    
    // Reset form and state
    setNewExpense({
      id: `EXP-${(Math.floor(Math.random() * 900) + 100).toString()}`,
      date: new Date().toISOString().split('T')[0],
      vendor: "",
      category: "",
      amount: "",
      paymentStatus: "Pending",
      paymentMethod: "",
      receiptUrl: "",
      notes: ""
    });
    setSelectedExpense(null);
    setShowEntryForm(false);
  };
  
  // Edit expense
  const handleEdit = (expense: any) => {
    setSelectedExpense(expense);
    setNewExpense({
      ...expense,
      amount: expense.amount.toString()
    });
    setShowEntryForm(true);
  };
  
  // Apply filters
  const applyFilters = () => {
    let filteredExpenses = [...sampleExpenses];
    
    filteredExpenses = filterByStatus(filteredExpenses, statusFilter);
    filteredExpenses = filterByCategory(filteredExpenses, categoryFilter);
    filteredExpenses = filterByVendor(filteredExpenses, vendorFilter);
    filteredExpenses = filterByDateRange(filteredExpenses, startDateFilter, endDateFilter);
    filteredExpenses = filterBySearch(filteredExpenses, searchQuery);
    
    // Apply sorting
    filteredExpenses.sort((a, b) => {
      let valueA, valueB;
      
      if (sortField === "date") {
        valueA = new Date(a.date).getTime();
        valueB = new Date(b.date).getTime();
      } else if (sortField === "amount") {
        valueA = a.amount;
        valueB = b.amount;
      } else {
        valueA = a[sortField];
        valueB = b[sortField];
      }
      
      if (sortDirection === "asc") {
        return valueA > valueB ? 1 : -1;
      } else {
        return valueA < valueB ? 1 : -1;
      }
    });
    
    setExpenses(filteredExpenses);
  };
  
  // Reset filters
  const resetFilters = () => {
    setStatusFilter("all");
    setCategoryFilter("all");
    setVendorFilter("all");
    setStartDateFilter("");
    setEndDateFilter("");
    setSearchQuery("");
    setExpenses(sampleExpenses);
  };
  
  // Handle sort
  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };
  
  // Apply filters when they change
  React.useEffect(() => {
    applyFilters();
  }, [
    statusFilter, 
    categoryFilter, 
    vendorFilter, 
    startDateFilter, 
    endDateFilter, 
    searchQuery,
    sortField,
    sortDirection
  ]);
  
  return (
    <DashboardLayout>
      <div className="container mx-auto py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Expense Tracking</h1>
          <Button onClick={() => setShowEntryForm(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add New Expense
          </Button>
        </div>
        
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">Total Expenses</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">${totalExpensesAmount.toFixed(2)}</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">Pending Payments</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">${pendingExpensesAmount.toFixed(2)}</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">This Month</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">
                $
                {sampleExpenses
                  .filter(exp => {
                    const now = new Date();
                    const expDate = new Date(exp.date);
                    return (
                      expDate.getMonth() === now.getMonth() &&
                      expDate.getFullYear() === now.getFullYear()
                    );
                  })
                  .reduce((sum, exp) => sum + exp.amount, 0)
                  .toFixed(2)
                }
              </p>
            </CardContent>
          </Card>
        </div>
        
        {/* Filters */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Search and Filter</CardTitle>
            <CardDescription>Find expenses quickly</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-4">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search by ID, vendor, or notes..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {expenseCategories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    {paymentStatuses.map((status) => (
                      <SelectItem key={status} value={status}>
                        {status}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <Select value={vendorFilter} onValueChange={setVendorFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by vendor" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Vendors</SelectItem>
                    {vendors.map((vendor) => (
                      <SelectItem key={vendor} value={vendor}>
                        {vendor}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <Button variant="outline" onClick={resetFilters}>
                  <Filter className="mr-2 h-4 w-4" />
                  Reset Filters
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="startDate">Start Date</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={startDateFilter}
                    onChange={(e) => setStartDateFilter(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="endDate">End Date</Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={endDateFilter}
                    onChange={(e) => setEndDateFilter(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Expenses Table */}
        <Card>
          <CardHeader>
            <CardTitle>Expenses</CardTitle>
            <CardDescription>
              {expenses.length} {expenses.length === 1 ? "expense" : "expenses"} found
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead 
                    className="cursor-pointer"
                    onClick={() => handleSort("id")}
                  >
                    Expense ID
                    {sortField === "id" && (
                      sortDirection === "asc" 
                        ? <ChevronUp className="inline ml-1 h-4 w-4" />
                        : <ChevronDown className="inline ml-1 h-4 w-4" />
                    )}
                  </TableHead>
                  <TableHead 
                    className="cursor-pointer"
                    onClick={() => handleSort("date")}
                  >
                    Date
                    {sortField === "date" && (
                      sortDirection === "asc" 
                        ? <ChevronUp className="inline ml-1 h-4 w-4" />
                        : <ChevronDown className="inline ml-1 h-4 w-4" />
                    )}
                  </TableHead>
                  <TableHead 
                    className="cursor-pointer"
                    onClick={() => handleSort("vendor")}
                  >
                    Vendor
                    {sortField === "vendor" && (
                      sortDirection === "asc" 
                        ? <ChevronUp className="inline ml-1 h-4 w-4" />
                        : <ChevronDown className="inline ml-1 h-4 w-4" />
                    )}
                  </TableHead>
                  <TableHead 
                    className="cursor-pointer"
                    onClick={() => handleSort("category")}
                  >
                    Category
                    {sortField === "category" && (
                      sortDirection === "asc" 
                        ? <ChevronUp className="inline ml-1 h-4 w-4" />
                        : <ChevronDown className="inline ml-1 h-4 w-4" />
                    )}
                  </TableHead>
                  <TableHead 
                    className="cursor-pointer text-right"
                    onClick={() => handleSort("amount")}
                  >
                    Amount
                    {sortField === "amount" && (
                      sortDirection === "asc" 
                        ? <ChevronUp className="inline ml-1 h-4 w-4" />
                        : <ChevronDown className="inline ml-1 h-4 w-4" />
                    )}
                  </TableHead>
                  <TableHead 
                    className="cursor-pointer"
                    onClick={() => handleSort("paymentStatus")}
                  >
                    Status
                    {sortField === "paymentStatus" && (
                      sortDirection === "asc" 
                        ? <ChevronUp className="inline ml-1 h-4 w-4" />
                        : <ChevronDown className="inline ml-1 h-4 w-4" />
                    )}
                  </TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {expenses.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-6 text-muted-foreground">
                      No expenses found with the current filters
                    </TableCell>
                  </TableRow>
                ) : (
                  expenses.map((expense) => (
                    <TableRow key={expense.id}>
                      <TableCell className="font-medium">{expense.id}</TableCell>
                      <TableCell>{expense.date}</TableCell>
                      <TableCell>{expense.vendor}</TableCell>
                      <TableCell>{expense.category}</TableCell>
                      <TableCell className="text-right">${expense.amount.toFixed(2)}</TableCell>
                      <TableCell>
                        <Badge 
                          variant={
                            expense.paymentStatus === "Paid" 
                              ? "default" 
                              : expense.paymentStatus === "Pending" 
                              ? "outline"
                              : expense.paymentStatus === "Overdue" 
                              ? "destructive"
                              : "secondary"
                          }
                        >
                          {expense.paymentStatus}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit(expense)}
                        >
                          View/Edit
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        
        {/* Expense Entry Form Dialog */}
        <Dialog open={showEntryForm} onOpenChange={setShowEntryForm}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>
                {selectedExpense ? "Edit Expense" : "Add New Expense"}
              </DialogTitle>
              <DialogDescription>
                {selectedExpense 
                  ? "Update the expense details below"
                  : "Enter the expense details below"}
              </DialogDescription>
            </DialogHeader>
            
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="id">Expense ID</Label>
                    <Input
                      id="id"
                      name="id"
                      value={newExpense.id}
                      onChange={handleInputChange}
                      disabled
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="date">Date</Label>
                    <Input
                      id="date"
                      name="date"
                      type="date"
                      value={newExpense.date}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="vendor">Vendor Name</Label>
                  <Input
                    id="vendor"
                    name="vendor"
                    value={newExpense.vendor}
                    onChange={handleInputChange}
                    placeholder="Enter vendor name"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Expense Type</Label>
                    <Select
                      value={newExpense.category}
                      onValueChange={(value) => handleSelectChange("category", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {expenseCategories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="amount">Amount</Label>
                    <Input
                      id="amount"
                      name="amount"
                      type="number"
                      step="0.01"
                      value={newExpense.amount}
                      onChange={handleInputChange}
                      placeholder="0.00"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="paymentMethod">Payment Method</Label>
                    <Select
                      value={newExpense.paymentMethod}
                      onValueChange={(value) => handleSelectChange("paymentMethod", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select payment method" />
                      </SelectTrigger>
                      <SelectContent>
                        {paymentMethods.map((method) => (
                          <SelectItem key={method} value={method}>
                            {method}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="paymentStatus">Payment Status</Label>
                    <Select
                      value={newExpense.paymentStatus}
                      onValueChange={(value) => handleSelectChange("paymentStatus", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select payment status" />
                      </SelectTrigger>
                      <SelectContent>
                        {paymentStatuses.map((status) => (
                          <SelectItem key={status} value={status}>
                            {status}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="receipt">Receipt Upload</Label>
                  <div className="flex items-center gap-4">
                    <Input
                      id="receipt"
                      type="file"
                      className="hidden"
                    />
                    <Button type="button" variant="outline" className="w-full">
                      <Upload className="mr-2 h-4 w-4" />
                      Upload Receipt
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="notes">Notes</Label>
                  <Input
                    id="notes"
                    name="notes"
                    value={newExpense.notes}
                    onChange={handleInputChange}
                    placeholder="Additional notes (optional)"
                  />
                </div>
              </div>
              
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => {
                  setShowEntryForm(false);
                  setSelectedExpense(null);
                }}>
                  Cancel
                </Button>
                <Button type="submit">
                  {selectedExpense ? "Update Expense" : "Add Expense"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
}
