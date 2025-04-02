
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
import { Button } from "@/components/ui/button";
import { 
  AlertTriangle, 
  Download, 
  Clock, 
  CalendarRange
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Sample data for pending purchase orders
const pendingPurchaseOrders = [
  {
    id: "PO-2023-003",
    supplier: "Engine Components Co.",
    dateOrdered: "2023-11-10",
    dueDate: "2023-11-25",
    totalItems: 12,
    receivedItems: 0,
    total: 15200,
    status: "Overdue",
    daysLate: 15
  },
  {
    id: "PO-2023-006",
    supplier: "Auto Lighting Solutions",
    dateOrdered: "2023-12-01",
    dueDate: "2023-12-15",
    totalItems: 18,
    receivedItems: 0,
    total: 9800,
    status: "Overdue",
    daysLate: 5
  },
  {
    id: "PO-2023-007",
    supplier: "Glass & Mirrors Co.",
    dateOrdered: "2023-12-05",
    dueDate: "2023-12-20",
    totalItems: 10,
    receivedItems: 0,
    total: 7500,
    status: "Pending",
    daysLate: 0
  },
  {
    id: "PO-2023-008",
    supplier: "Brake Systems Ltd.",
    dateOrdered: "2023-12-07",
    dueDate: "2023-12-22",
    totalItems: 25,
    receivedItems: 10,
    total: 12800,
    status: "Partially Fulfilled",
    daysLate: 0
  },
  {
    id: "PO-2023-009",
    supplier: "Auto Parts Inc.",
    dateOrdered: "2023-12-10",
    dueDate: "2023-12-25",
    totalItems: 15,
    receivedItems: 8,
    total: 6500,
    status: "Partially Fulfilled",
    daysLate: 0
  }
];

export default function PendingPurchaseOrders() {
  const [sortBy, setSortBy] = useState<string>("status");
  
  const sortedOrders = [...pendingPurchaseOrders].sort((a, b) => {
    if (sortBy === "status") {
      // Sort by status priority: Overdue first, then Pending, then Partially Fulfilled
      const statusOrder = { "Overdue": 0, "Pending": 1, "Partially Fulfilled": 2 };
      return statusOrder[a.status as keyof typeof statusOrder] - statusOrder[b.status as keyof typeof statusOrder];
    } else if (sortBy === "dueDate") {
      return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    } else {
      return a.daysLate - b.daysLate;
    }
  });
  
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Pending Purchase Orders</h1>
            <p className="text-muted-foreground">
              Monitor overdue and partially fulfilled purchase orders
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
                Needs immediate attention
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Pending Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1</div>
              <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                <Clock className="h-3 w-3 text-orange-500" />
                Within delivery timeframe
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Partially Fulfilled</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2</div>
              <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                <CalendarRange className="h-3 w-3 text-blue-500" />
                Awaiting complete delivery
              </p>
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-500" />
              Orders Requiring Attention
            </CardTitle>
            <CardDescription>
              Sort by: 
              <Button 
                variant="link" 
                className={sortBy === "status" ? "font-bold" : ""}
                onClick={() => setSortBy("status")}
              >
                Status
              </Button> | 
              <Button 
                variant="link" 
                className={sortBy === "dueDate" ? "font-bold" : ""}
                onClick={() => setSortBy("dueDate")}
              >
                Due Date
              </Button> | 
              <Button 
                variant="link" 
                className={sortBy === "daysLate" ? "font-bold" : ""}
                onClick={() => setSortBy("daysLate")}
              >
                Days Late
              </Button>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>PO Number</TableHead>
                  <TableHead>Supplier</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Items Received</TableHead>
                  <TableHead className="text-right">Total Amount</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell>{order.supplier}</TableCell>
                    <TableCell>{order.dueDate}</TableCell>
                    <TableCell>{order.receivedItems} of {order.totalItems}</TableCell>
                    <TableCell className="text-right">₹{order.total.toLocaleString()}</TableCell>
                    <TableCell>
                      {order.status === "Overdue" ? (
                        <Badge variant="destructive" className="gap-1">
                          <AlertTriangle className="h-3 w-3" />
                          Overdue by {order.daysLate} days
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
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
