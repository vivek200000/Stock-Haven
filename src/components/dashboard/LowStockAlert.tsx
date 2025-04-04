
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Bell } from "lucide-react";

// Sample data for low stock alerts
const lowStockItems = [
  {
    id: "BRK-001",
    name: "Brake Pads - Front",
    quantity: 3,
    reorderLevel: 5,
    category: "Brakes",
  },
  {
    id: "OIL-023",
    name: "Engine Oil Filter",
    quantity: 4,
    reorderLevel: 10,
    category: "Filters",
  },
  {
    id: "SPK-089",
    name: "Spark Plugs - Premium",
    quantity: 5,
    reorderLevel: 15,
    category: "Engine",
  },
  {
    id: "BATT-45",
    name: "Battery - 45Ah",
    quantity: 2,
    reorderLevel: 8,
    category: "Electrical",
  },
];

export function LowStockAlert() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="space-y-0.5">
          <CardTitle className="text-base font-medium">Low Stock Alert</CardTitle>
          <CardDescription>Items below reorder level</CardDescription>
        </div>
        <Bell className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="p-0">
        <div className="rounded-md overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Item</TableHead>
                <TableHead>Category</TableHead>
                <TableHead className="text-right">Qty</TableHead>
                <TableHead className="text-right">Reorder At</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {lowStockItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell className="text-right">
                    <Badge variant="outline" className="bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300 border-red-200 dark:border-red-800">
                      {item.quantity}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">{item.reorderLevel}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
