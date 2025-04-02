
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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { 
  AlertTriangle, 
  Download, 
  Package, 
  FileText
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Sample data for pending inventory orders
const pendingInventoryOrders = [
  {
    id: "PO-2023-003",
    supplier: "Engine Components Co.",
    dateOrdered: "2023-11-10",
    dueDate: "2023-11-25",
    items: [
      { name: "Timing Belt", quantity: 20, received: 0, price: 320 },
      { name: "Engine Oil Filter", quantity: 40, received: 0, price: 180 }
    ],
    total: 15200,
    status: "Overdue",
    daysLate: 15
  },
  {
    id: "PO-2023-006",
    supplier: "Auto Lighting Solutions",
    dateOrdered: "2023-12-01",
    dueDate: "2023-12-15",
    items: [
      { name: "Headlight Assembly", quantity: 8, received: 0, price: 950 },
      { name: "Tail Light Assembly", quantity: 10, received: 0, price: 420 }
    ],
    total: 9800,
    status: "Overdue",
    daysLate: 5
  },
  {
    id: "PO-2023-007",
    supplier: "Glass & Mirrors Co.",
    dateOrdered: "2023-12-05",
    dueDate: "2023-12-20",
    items: [
      { name: "Windshield", quantity: 5, received: 0, price: 1200 },
      { name: "Side Mirror", quantity: 10, received: 0, price: 150 }
    ],
    total: 7500,
    status: "Pending",
    daysLate: 0
  },
  {
    id: "PO-2023-008",
    supplier: "Brake Systems Ltd.",
    dateOrdered: "2023-12-07",
    dueDate: "2023-12-22",
    items: [
      { name: "Brake Pads", quantity: 15, received: 5, price: 180 },
      { name: "Brake Discs", quantity: 10, received: 5, price: 290 }
    ],
    total: 12800,
    status: "Partially Fulfilled",
    daysLate: 0
  },
  {
    id: "PO-2023-009",
    supplier: "Auto Parts Inc.",
    dateOrdered: "2023-12-10",
    dueDate: "2023-12-25",
    items: [
      { name: "Air Filter", quantity: 10, received: 5, price: 250 },
      { name: "Spark Plugs", quantity: 30, received: 15, price: 120 }
    ],
    total: 6500,
    status: "Partially Fulfilled",
    daysLate: 0
  }
];

export default function InventoryPendingOrders() {
  const [filter, setFilter] = useState<string>("all");
  
  const filteredOrders = pendingInventoryOrders.filter(order => {
    if (filter === "all") return true;
    return order.status.toLowerCase() === filter.toLowerCase();
  });
  
  const calculateFulfillmentPercentage = (order: typeof pendingInventoryOrders[0]) => {
    const totalItems = order.items.reduce((sum, item) => sum + item.quantity, 0);
    const receivedItems = order.items.reduce((sum, item) => sum + item.received, 0);
    return Math.round((receivedItems / totalItems) * 100);
  };
  
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Pending Inventory Orders</h1>
            <p className="text-muted-foreground">
              Track and manage pending inventory purchase orders
            </p>
          </div>
          <Button className="gap-2">
            <Download className="h-4 w-4" />
            Export Report
          </Button>
        </div>
        
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Overdue Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2</div>
              <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                <AlertTriangle className="h-3 w-3 text-red-500" />
                Requires immediate action
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Partially Fulfilled</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2</div>
              <p className="text-xs text-muted-foreground mt-1">
                Awaiting complete delivery
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Items Pending</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">173</div>
              <p className="text-xs text-muted-foreground mt-1">
                Total items awaiting delivery
              </p>
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Pending Inventory Orders
            </CardTitle>
            <CardDescription className="flex items-center gap-2">
              <Select value={filter} onValueChange={setFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Orders</SelectItem>
                  <SelectItem value="overdue">Overdue</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="partially fulfilled">Partially Fulfilled</SelectItem>
                </SelectContent>
              </Select>
              <span>{filteredOrders.length} orders found</span>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {filteredOrders.map((order, index) => (
                <AccordionItem key={order.id} value={order.id}>
                  <AccordionTrigger className="py-3">
                    <div className="flex w-full items-center justify-between pr-4">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        <div className="text-left">
                          <div className="font-medium">{order.id}</div>
                          <div className="text-xs text-muted-foreground">{order.supplier}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <div className="font-medium">₹{order.total.toLocaleString()}</div>
                          <div className="text-xs text-muted-foreground">Due: {order.dueDate}</div>
                        </div>
                        {order.status === "Overdue" ? (
                          <Badge variant="destructive" className="gap-1">
                            <AlertTriangle className="h-3 w-3" />
                            Overdue 
                          </Badge>
                        ) : order.status === "Partially Fulfilled" ? (
                          <Badge variant="outline" className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-500">
                            Partially Fulfilled
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300 dark:border-yellow-500">
                            Pending
                          </Badge>
                        )}
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <Card className="mt-2 border-dashed">
                      <CardHeader className="py-3">
                        <CardTitle className="text-sm">Order Details</CardTitle>
                        <CardDescription>
                          Order {order.id} placed on {order.dateOrdered}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="py-0">
                        <div className="mb-4">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">Fulfillment Progress:</span>
                            <span className="text-sm font-medium">{calculateFulfillmentPercentage(order)}%</span>
                          </div>
                          <Progress value={calculateFulfillmentPercentage(order)} className="mt-2 h-2" />
                        </div>
                        <div className="space-y-1">
                          <div className="text-sm font-medium">Items:</div>
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Item</TableHead>
                                <TableHead className="text-right">Ordered</TableHead>
                                <TableHead className="text-right">Received</TableHead>
                                <TableHead className="text-right">Price</TableHead>
                                <TableHead className="text-right">Total</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {order.items.map((item, idx) => (
                                <TableRow key={idx}>
                                  <TableCell>{item.name}</TableCell>
                                  <TableCell className="text-right">{item.quantity}</TableCell>
                                  <TableCell className="text-right">{item.received}</TableCell>
                                  <TableCell className="text-right">₹{item.price}</TableCell>
                                  <TableCell className="text-right">₹{(item.quantity * item.price).toLocaleString()}</TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between py-3">
                        <div>
                          {order.status === "Overdue" && (
                            <div className="text-sm text-red-500 font-medium">
                              This order is {order.daysLate} days late
                            </div>
                          )}
                        </div>
                        <Button size="sm">Update Status</Button>
                      </CardFooter>
                    </Card>
                  </AccordionContent>
                </AccordionItem>
              ))}
              {filteredOrders.length === 0 && (
                <div className="py-8 text-center text-muted-foreground">
                  No orders matching the selected filter
                </div>
              )}
            </Accordion>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
