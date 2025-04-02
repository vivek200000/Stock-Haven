
import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  BarChart3, 
  PackageOpen, 
  TrendingUp, 
  Truck, 
  Users, 
  RefreshCcw,
  ShoppingBag,
  AlertTriangle,
  CheckCircle
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from "@/components/ui/chart";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";

// Dashboard components for different roles
const AdminDashboard = () => {
  const [totalInventory, setTotalInventory] = useState(0);
  const [ordersPending, setOrdersPending] = useState(25);
  const [totalSales, setTotalSales] = useState(1254800);
  const [totalSuppliers, setTotalSuppliers] = useState(24);
  const [activeTab, setActiveTab] = useState("overview");
  const { toast } = useToast();

  // Sample data for the charts
  const salesData = [
    { name: "Engine Parts", value: 35 },
    { name: "Body Parts", value: 25 },
    { name: "Electrical", value: 20 },
    { name: "Fluids & Oils", value: 15 },
    { name: "Other", value: 5 },
  ];
  
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];
  
  useEffect(() => {
    fetchInventoryData();
  }, []);
  
  const fetchInventoryData = async () => {
    try {
      const { data, error } = await supabase
        .from('inventory')
        .select('stock_quantity, price');
        
      if (error) throw error;
      
      const totalItems = data.reduce((sum, item) => sum + item.stock_quantity, 0);
      setTotalInventory(totalItems);
    } catch (error) {
      console.error('Error fetching inventory data:', error);
    }
  };
  
  const handleReset = async () => {
    try {
      // Update all inventory items to have 0 stock
      const { error } = await supabase
        .from('inventory')
        .update({ stock_quantity: 0 })
        .gt('id', '0'); // This condition ensures all records are updated
        
      if (error) throw error;
      
      setTotalInventory(0);
      toast({
        title: "Inventory Reset",
        description: "All inventory items have been reset to zero.",
      });
    } catch (error) {
      console.error('Error resetting inventory:', error);
      toast({
        variant: "destructive",
        title: "Reset Failed",
        description: "There was an error resetting the inventory.",
      });
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
          <p className="text-muted-foreground">
            Overview of inventory, sales, and supplier performance
          </p>
        </div>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full md:w-auto mt-4 md:mt-0">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="sales">Sales</TabsTrigger>
            <TabsTrigger value="inventory">Inventory</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    
      <TabsContent value="overview" className="m-0">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Inventory</CardTitle>
              <PackageOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalInventory} items</div>
              <div className="flex items-center justify-between mt-4">
                <p className="text-xs text-muted-foreground">
                  Across all categories
                </p>
                <Button variant="outline" size="sm" onClick={handleReset}>
                  <RefreshCcw className="mr-2 h-3.5 w-3.5" />
                  Reset
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Pending Orders</CardTitle>
              <ShoppingBag className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{ordersPending}</div>
              <p className="text-xs text-muted-foreground mt-4">
                Requires approval
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Sales</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹{totalSales.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground mt-4">
                Last 30 days
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Active Suppliers</CardTitle>
              <Truck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalSuppliers}</div>
              <p className="text-xs text-muted-foreground mt-4">
                All registered suppliers
              </p>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2 mt-4">
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Sales by Category</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ChartContainer config={{
                  'Engine Parts': { color: COLORS[0] },
                  'Body Parts': { color: COLORS[1] },
                  'Electrical': { color: COLORS[2] },
                  'Fluids & Oils': { color: COLORS[3] },
                  'Other': { color: COLORS[4] },
                }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={salesData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {salesData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Legend />
                      <ChartTooltip content={<ChartTooltipContent />} />
                    </PieChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>
          
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <p className="font-medium">Order #PO-2023-457 processed</p>
                    <p className="text-sm text-muted-foreground">Tata Auto Parts | 10 minutes ago</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5" />
                  <div>
                    <p className="font-medium">Low stock alert: Brake Pads</p>
                    <p className="text-sm text-muted-foreground">Only 5 units remaining | 2 hours ago</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <Users className="h-5 w-5 text-blue-500 mt-0.5" />
                  <div>
                    <p className="font-medium">New supplier registered</p>
                    <p className="text-sm text-muted-foreground">Continental India | 5 hours ago</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <ShoppingBag className="h-5 w-5 text-purple-500 mt-0.5" />
                  <div>
                    <p className="font-medium">New order received</p>
                    <p className="text-sm text-muted-foreground">Order #SO-2023-672 | 1 day ago</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </TabsContent>
      
      <TabsContent value="sales" className="m-0">
        <Card>
          <CardHeader>
            <CardTitle>Sales Analytics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[400px] flex items-center justify-center">
              <p className="text-muted-foreground">Sales analytics dashboard content here</p>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="inventory" className="m-0">
        <Card>
          <CardHeader>
            <CardTitle>Inventory Management</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[400px] flex items-center justify-center">
              <p className="text-muted-foreground">Inventory management dashboard content here</p>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </div>
  );
};

// Manager Dashboard
const ManagerDashboard = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Manager Dashboard</h1>
      <p className="text-muted-foreground">
        Manage inventory, orders and team performance
      </p>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Pending Approvals</CardTitle>
            <AlertTriangle className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground mt-4">
              Purchase orders awaiting your approval
            </p>
            <Button className="w-full mt-4" variant="outline">View All</Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Team Performance</CardTitle>
            <Users className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">87%</div>
            <p className="text-xs text-muted-foreground mt-4">
              Average team efficiency this month
            </p>
            <Button className="w-full mt-4" variant="outline">View Details</Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Deliveries</CardTitle>
            <Truck className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground mt-4">
              Expected in the next 48 hours
            </p>
            <Button className="w-full mt-4" variant="outline">Track Deliveries</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// Supplier Dashboard
const SupplierDashboard = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Supplier Portal</h1>
      <p className="text-muted-foreground">
        Manage orders, deliveries and invoices
      </p>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Orders</CardTitle>
            <ShoppingBag className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7</div>
            <p className="text-xs text-muted-foreground mt-4">
              Orders requiring fulfillment
            </p>
            <Button className="w-full mt-4" variant="outline">Manage Orders</Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Pending Invoices</CardTitle>
            <FileText className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <p className="text-xs text-muted-foreground mt-4">
              Awaiting payment
            </p>
            <Button className="w-full mt-4" variant="outline">View Invoices</Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Performance Rating</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.7/5.0</div>
            <p className="text-xs text-muted-foreground mt-4">
              Based on delivery time and quality
            </p>
            <Button className="w-full mt-4" variant="outline">View Feedback</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// User Dashboard
const UserDashboard = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
      <p className="text-muted-foreground">
        Welcome to the automotive parts inventory system
      </p>
      
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button className="w-full">Browse Inventory</Button>
            <Button className="w-full" variant="outline">View Suppliers</Button>
            <Button className="w-full" variant="outline">Generate Reports</Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Recent Updates</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <PackageOpen className="h-5 w-5 text-blue-500 mt-0.5" />
                <div>
                  <p className="font-medium">New inventory items added</p>
                  <p className="text-sm text-muted-foreground">15 new parts | 2 days ago</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <Truck className="h-5 w-5 text-green-500 mt-0.5" />
                <div>
                  <p className="font-medium">New supplier onboarded</p>
                  <p className="text-sm text-muted-foreground">TVS Auto Parts | 1 week ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// Main Dashboard component that renders different dashboards based on user role
export default function Dashboard() {
  const { profile, loading } = useAuth();
  
  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-[80vh]">
          <p>Loading dashboard...</p>
        </div>
      </DashboardLayout>
    );
  }
  
  const renderDashboardByRole = () => {
    const role = profile?.role?.toLowerCase() || 'user';
    
    switch (role) {
      case 'admin':
        return <AdminDashboard />;
      case 'manager':
        return <ManagerDashboard />;
      case 'supplier':
        return <SupplierDashboard />;
      default:
        return <UserDashboard />;
    }
  };
  
  return (
    <DashboardLayout>
      {renderDashboardByRole()}
    </DashboardLayout>
  );
}
