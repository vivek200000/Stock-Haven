import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ReportSummary } from "@/components/reports/ReportSummary";
import { BarChart, LineChart, PieChart } from "@/components/ui/charts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, Package, ShoppingCart } from "lucide-react";
import { StatusBadge } from "@/components/reports/StatusBadge";

// Sample data for low stock alerts
const lowStockItems = [
  { id: "INV001", name: "Engine Oil Filter", quantity: 5, threshold: 10, category: "Filters", supplier: "Bosch India" },
  { id: "INV002", name: "Brake Pads (Front)", quantity: 8, threshold: 15, category: "Brakes", supplier: "Brake India" },
  { id: "INV003", name: "Spark Plugs", quantity: 12, threshold: 20, category: "Electrical", supplier: "TVS Auto Parts" },
  { id: "INV004", name: "Air Filter", quantity: 3, threshold: 10, category: "Filters", supplier: "Mahindra Components" },
  { id: "INV005", name: "Wiper Blades", quantity: 6, threshold: 10, category: "Body Parts", supplier: "Tata Auto Parts" },
  { id: "INV006", name: "Headlight Bulbs", quantity: 4, threshold: 8, category: "Lighting", supplier: "Lumax Industries" },
];

// Determine status based on quantity vs threshold
const getStockStatus = (quantity, threshold) => {
  const ratio = quantity / threshold;
  if (ratio <= 0.3) return "critical";
  if (ratio <= 0.5) return "warning";
  return "low";
};

export default function Dashboard() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [activeChart, setActiveChart] = useState("sales");

  useEffect(() => {
    if (!loading && !user) {
      navigate("/signin");
    }
  }, [user, loading, navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const summaryItems = [
    { label: "Total Sales", value: "₹5,45,678", colorClass: "text-green-600" },
    { label: "Orders", value: "128", colorClass: "" },
    { label: "Customers", value: "84", colorClass: "" },
    { label: "Inventory Items", value: "256", colorClass: "" },
  ];

  // Sample chart data
  const salesData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Sales",
        data: [65, 59, 80, 81, 56, 55],
        backgroundColor: "rgba(37, 99, 235, 0.5)",
        borderColor: "rgb(37, 99, 235)",
        borderWidth: 2,
      },
    ],
  };

  const ordersData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Orders",
        data: [15, 29, 40, 51, 26, 35],
        backgroundColor: "rgba(220, 38, 38, 0.5)",
        borderColor: "rgb(220, 38, 38)",
        borderWidth: 2,
      },
    ],
  };

  const inventoryData = {
    labels: ["Tires", "Oils", "Filters", "Brakes", "Electrical", "Body"],
    datasets: [
      {
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>

        <ReportSummary items={summaryItems} />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="md:col-span-2">
            <CardHeader className="pb-2">
              <CardTitle>Overview</CardTitle>
              <CardDescription>Sales and order performance</CardDescription>

              <Tabs value={activeChart} onValueChange={setActiveChart} className="mt-2">
                <TabsList>
                  <TabsTrigger value="sales">Sales</TabsTrigger>
                  <TabsTrigger value="orders">Orders</TabsTrigger>
                  <TabsTrigger value="inventory">Inventory</TabsTrigger>
                </TabsList>
              </Tabs>
            </CardHeader>
            <CardContent className="p-0">
              <div className="p-6">
                <TabsContent value="sales" className="mt-0">
                  <BarChart data={salesData} />
                </TabsContent>
                <TabsContent value="orders" className="mt-0">
                  <LineChart data={ordersData} />
                </TabsContent>
                <TabsContent value="inventory" className="mt-0">
                  <div className="flex justify-center py-4">
                    <div style={{ width: '300px', height: '300px' }}>
                      <PieChart data={inventoryData} />
                    </div>
                  </div>
                </TabsContent>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                <span>Recent Activity</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-2">
                <div className="bg-primary/10 p-2 rounded-full">
                  <ShoppingCart className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-medium">New Purchase Order</p>
                  <p className="text-xs text-muted-foreground">PO-2543 - ₹12,500</p>
                  <p className="text-xs text-muted-foreground">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="bg-primary/10 p-2 rounded-full">
                  <Package className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-medium">Inventory Updated</p>
                  <p className="text-xs text-muted-foreground">15 items received</p>
                  <p className="text-xs text-muted-foreground">5 hours ago</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="bg-primary/10 p-2 rounded-full">
                  <Calendar className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-medium">Sales Report Generated</p>
                  <p className="text-xs text-muted-foreground">Monthly summary</p>
                  <p className="text-xs text-muted-foreground">Yesterday</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-red-600 flex items-center gap-2">
              <Package className="h-5 w-5" />
              <span>Low Stock Alerts</span>
            </CardTitle>
            <CardDescription>Items that need to be reordered soon</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-muted">
                    <tr>
                      <th className="py-2 px-4 text-left font-medium">ID</th>
                      <th className="py-2 px-4 text-left font-medium">Item Name</th>
                      <th className="py-2 px-4 text-left font-medium">Category</th>
                      <th className="py-2 px-4 text-left font-medium">Quantity</th>
                      <th className="py-2 px-4 text-left font-medium">Threshold</th>
                      <th className="py-2 px-4 text-left font-medium">Supplier</th>
                      <th className="py-2 px-4 text-left font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {lowStockItems.map((item) => {
                      const status = getStockStatus(item.quantity, item.threshold);
                      return (
                        <tr key={item.id} className="hover:bg-muted/50">
                          <td className="py-3 px-4">{item.id}</td>
                          <td className="py-3 px-4 font-medium">{item.name}</td>
                          <td className="py-3 px-4">{item.category}</td>
                          <td className="py-3 px-4">{item.quantity}</td>
                          <td className="py-3 px-4">{item.threshold}</td>
                          <td className="py-3 px-4">{item.supplier}</td>
                          <td className="py-3 px-4">
                            <StatusBadge status={status} />
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline">View All Inventory</Button>
            <Button>Order Items</Button>
          </CardFooter>
        </Card>
      </div>
    </DashboardLayout>
  );
}
