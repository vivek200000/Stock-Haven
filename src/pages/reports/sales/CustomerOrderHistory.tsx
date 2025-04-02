
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
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Download, 
  BarChart3, 
  Users, 
  Calendar, 
  ShoppingCart
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

// Sample customer data
const customers = [
  {
    id: 1,
    name: "Raj Automotive",
    contact: "Raj Patel",
    email: "raj@rajautomotive.com",
    phone: "+91 9876543210",
    location: "Mumbai",
    totalOrders: 28,
    totalSpent: 248000,
    lastOrder: "2023-12-15",
    type: "Wholesale",
    status: "Active"
  },
  {
    id: 2,
    name: "Sharma Motors",
    contact: "Vikram Sharma",
    email: "info@sharmamotors.com",
    phone: "+91 9123456789",
    location: "Delhi",
    totalOrders: 35,
    totalSpent: 315000,
    lastOrder: "2023-12-10",
    type: "Wholesale",
    status: "Active"
  },
  {
    id: 3,
    name: "Krishna Auto Parts",
    contact: "Krishna Iyer",
    email: "krishna@krishnaauto.com",
    phone: "+91 9555123456",
    location: "Chennai",
    totalOrders: 22,
    totalSpent: 186000,
    lastOrder: "2023-12-07",
    type: "Retail",
    status: "Active"
  },
  {
    id: 4,
    name: "Singh Mechanics",
    contact: "Harpreet Singh",
    email: "contact@singhmechs.com",
    phone: "+91 9876123450",
    location: "Chandigarh",
    totalOrders: 15,
    totalSpent: 93000,
    lastOrder: "2023-11-28",
    type: "Retail",
    status: "Inactive"
  },
  {
    id: 5,
    name: "Gupta Car Care",
    contact: "Rahul Gupta",
    email: "rahul@guptacarcare.com",
    phone: "+91 9898767654",
    location: "Kolkata",
    totalOrders: 18,
    totalSpent: 124000,
    lastOrder: "2023-12-05",
    type: "Retail",
    status: "Active"
  }
];

// Sample order history data for customers
const orderHistories = {
  1: [
    {
      orderId: "SO-2023-456",
      date: "2023-12-15",
      items: [
        { name: "Brake Pads", quantity: 30, price: 180 },
        { name: "Air Filter", quantity: 25, price: 250 },
        { name: "Engine Oil Filter", quantity: 20, price: 180 }
      ],
      status: "Delivered",
      total: 13750
    },
    {
      orderId: "SO-2023-423",
      date: "2023-12-01",
      items: [
        { name: "Spark Plugs", quantity: 50, price: 120 },
        { name: "Timing Belt", quantity: 15, price: 320 }
      ],
      status: "Delivered",
      total: 10800
    },
    {
      orderId: "SO-2023-398",
      date: "2023-11-15",
      items: [
        { name: "Alternator", quantity: 8, price: 450 },
        { name: "Battery", quantity: 5, price: 1800 }
      ],
      status: "Delivered",
      total: 12600
    }
  ],
  2: [
    {
      orderId: "SO-2023-451",
      date: "2023-12-10",
      items: [
        { name: "Headlight Assembly", quantity: 10, price: 950 },
        { name: "Brake Discs", quantity: 20, price: 290 }
      ],
      status: "Delivered",
      total: 15300
    },
    {
      orderId: "SO-2023-425",
      date: "2023-11-20",
      items: [
        { name: "Radiator", quantity: 5, price: 850 },
        { name: "Shock Absorber", quantity: 12, price: 380 }
      ],
      status: "Delivered",
      total: 8810
    }
  ],
  3: [
    {
      orderId: "SO-2023-448",
      date: "2023-12-07",
      items: [
        { name: "Brake Pads", quantity: 20, price: 180 },
        { name: "Spark Plugs", quantity: 40, price: 120 }
      ],
      status: "Delivered",
      total: 8400
    }
  ],
  4: [
    {
      orderId: "SO-2023-412",
      date: "2023-11-28",
      items: [
        { name: "Air Filter", quantity: 15, price: 250 },
        { name: "Engine Oil Filter", quantity: 15, price: 180 }
      ],
      status: "Delivered",
      total: 6450
    }
  ],
  5: [
    {
      orderId: "SO-2023-442",
      date: "2023-12-05",
      items: [
        { name: "Timing Belt", quantity: 10, price: 320 },
        { name: "Battery", quantity: 3, price: 1800 }
      ],
      status: "Delivered",
      total: 8600
    }
  ]
};

export default function CustomerOrderHistory() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedCustomer, setSelectedCustomer] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<string>("all");
  
  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = 
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.location.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesType = 
      typeFilter === "all" || 
      customer.type.toLowerCase() === typeFilter.toLowerCase();
      
    const matchesStatus =
      statusFilter === "all" ||
      customer.status.toLowerCase() === statusFilter.toLowerCase();
      
    return matchesSearch && matchesType && matchesStatus;
  });
  
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };
  
  // Calculate total order value and number of orders
  const totalValue = customers.reduce((sum, customer) => sum + customer.totalSpent, 0);
  const totalOrders = customers.reduce((sum, customer) => sum + customer.totalOrders, 0);
  const averageOrderValue = totalValue / totalOrders;
  
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Customer Order History</h1>
            <p className="text-muted-foreground">
              View detailed sales history by customer
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
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Customers</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{customers.length}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {customers.filter(c => c.status === 'Active').length} active
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Order Value</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹{totalValue.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground mt-1">
                From {totalOrders} orders
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Avg. Order Value</CardTitle>
              <ShoppingCart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹{Math.round(averageOrderValue).toLocaleString()}</div>
              <p className="text-xs text-muted-foreground mt-1">
                Per customer order
              </p>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="all" onValueChange={setActiveTab} value={activeTab}>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-4">
            <TabsList className="h-9">
              <TabsTrigger value="all" className="text-xs sm:text-sm">All Customers</TabsTrigger>
              <TabsTrigger value="wholesale" className="text-xs sm:text-sm">Wholesale</TabsTrigger>
              <TabsTrigger value="retail" className="text-xs sm:text-sm">Retail</TabsTrigger>
            </TabsList>
            
            <div className="flex gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[130px] h-9">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
              
              <div className="relative flex-1">
                <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search customers..." 
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
                  <Users className="h-5 w-5" />
                  Customer List
                </CardTitle>
                <CardDescription>
                  Click on a customer to view their order history
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Customer</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Orders</TableHead>
                      <TableHead className="text-right">Total Spent</TableHead>
                      <TableHead>Last Order</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredCustomers.map((customer) => (
                      <TableRow 
                        key={customer.id} 
                        className="cursor-pointer hover:bg-muted/50"
                        onClick={() => setSelectedCustomer(customer.id)}
                      >
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback className="text-xs">
                                {getInitials(customer.name)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div>{customer.name}</div>
                              <div className="text-xs text-muted-foreground">{customer.contact}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{customer.location}</TableCell>
                        <TableCell>{customer.type}</TableCell>
                        <TableCell>{customer.totalOrders}</TableCell>
                        <TableCell className="text-right">
                          ₹{customer.totalSpent.toLocaleString()}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3 text-muted-foreground" />
                            {customer.lastOrder}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge 
                            variant={customer.status === "Active" ? "default" : "secondary"}
                            className={customer.status === "Active" ? 
                              "bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-900/30 dark:text-green-300" : 
                              "bg-gray-100 text-gray-800 hover:bg-gray-100 dark:bg-gray-900/30 dark:text-gray-300"}
                          >
                            {customer.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                    {filteredCustomers.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={7} className="h-24 text-center">
                          No customers found
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
            
            {selectedCustomer && (
              <Card className="mt-4">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ShoppingCart className="h-5 w-5" />
                    Order History: {customers.find(c => c.id === selectedCustomer)?.name}
                  </CardTitle>
                  <CardDescription>
                    Past {orderHistories[selectedCustomer as keyof typeof orderHistories]?.length || 0} orders
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    {orderHistories[selectedCustomer as keyof typeof orderHistories]?.map((order, index) => (
                      <AccordionItem key={order.orderId} value={order.orderId}>
                        <AccordionTrigger className="py-3">
                          <div className="flex items-center justify-between w-full pr-4">
                            <div className="flex items-center gap-2">
                              <div className="text-left">
                                <div className="font-medium">{order.orderId}</div>
                                <div className="text-xs text-muted-foreground">
                                  {order.date}
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-4">
                              <div className="text-right">
                                <div className="font-medium">₹{order.total.toLocaleString()}</div>
                                <div className="text-xs text-muted-foreground">
                                  {order.items.length} items
                                </div>
                              </div>
                              <Badge className="bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-900/30 dark:text-green-300">
                                {order.status}
                              </Badge>
                            </div>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Item</TableHead>
                                <TableHead className="text-right">Quantity</TableHead>
                                <TableHead className="text-right">Price</TableHead>
                                <TableHead className="text-right">Total</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {order.items.map((item, idx) => (
                                <TableRow key={idx}>
                                  <TableCell>{item.name}</TableCell>
                                  <TableCell className="text-right">{item.quantity}</TableCell>
                                  <TableCell className="text-right">₹{item.price}</TableCell>
                                  <TableCell className="text-right">
                                    ₹{(item.quantity * item.price).toLocaleString()}
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                          <div className="flex justify-end mt-4 pt-4 border-t">
                            <div className="text-right">
                              <div className="text-sm text-muted-foreground">Order Total</div>
                              <div className="text-xl font-bold">₹{order.total.toLocaleString()}</div>
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button variant="outline" onClick={() => setSelectedCustomer(null)}>
                    Close
                  </Button>
                </CardFooter>
              </Card>
            )}
          </TabsContent>
          
          <TabsContent value="wholesale" className="mt-0">
            <Card>
              <CardContent className="pt-6">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Customer</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Orders</TableHead>
                      <TableHead className="text-right">Total Spent</TableHead>
                      <TableHead>Last Order</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredCustomers
                      .filter(customer => customer.type === "Wholesale")
                      .map((customer) => (
                      <TableRow 
                        key={customer.id} 
                        className="cursor-pointer hover:bg-muted/50"
                        onClick={() => setSelectedCustomer(customer.id)}
                      >
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback className="text-xs">
                                {getInitials(customer.name)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div>{customer.name}</div>
                              <div className="text-xs text-muted-foreground">{customer.contact}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{customer.location}</TableCell>
                        <TableCell>{customer.totalOrders}</TableCell>
                        <TableCell className="text-right">
                          ₹{customer.totalSpent.toLocaleString()}
                        </TableCell>
                        <TableCell>{customer.lastOrder}</TableCell>
                        <TableCell>
                          <Badge 
                            variant={customer.status === "Active" ? "default" : "secondary"}
                            className={customer.status === "Active" ? 
                              "bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-900/30 dark:text-green-300" : 
                              "bg-gray-100 text-gray-800 hover:bg-gray-100 dark:bg-gray-900/30 dark:text-gray-300"}
                          >
                            {customer.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="retail" className="mt-0">
            <Card>
              <CardContent className="pt-6">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Customer</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Orders</TableHead>
                      <TableHead className="text-right">Total Spent</TableHead>
                      <TableHead>Last Order</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredCustomers
                      .filter(customer => customer.type === "Retail")
                      .map((customer) => (
                      <TableRow 
                        key={customer.id} 
                        className="cursor-pointer hover:bg-muted/50"
                        onClick={() => setSelectedCustomer(customer.id)}
                      >
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback className="text-xs">
                                {getInitials(customer.name)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div>{customer.name}</div>
                              <div className="text-xs text-muted-foreground">{customer.contact}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{customer.location}</TableCell>
                        <TableCell>{customer.totalOrders}</TableCell>
                        <TableCell className="text-right">
                          ₹{customer.totalSpent.toLocaleString()}
                        </TableCell>
                        <TableCell>{customer.lastOrder}</TableCell>
                        <TableCell>
                          <Badge 
                            variant={customer.status === "Active" ? "default" : "secondary"}
                            className={customer.status === "Active" ? 
                              "bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-900/30 dark:text-green-300" : 
                              "bg-gray-100 text-gray-800 hover:bg-gray-100 dark:bg-gray-900/30 dark:text-gray-300"}
                          >
                            {customer.status}
                          </Badge>
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
