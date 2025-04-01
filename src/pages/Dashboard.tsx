
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import Nav from "@/components/Nav";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";
import { PieChartIcon, TrendingUp, Users, IndianRupee, Activity } from "lucide-react";

// Sample data for the dashboard
const salesData = [
  { month: "Jan", sales: 400000 },
  { month: "Feb", sales: 300000 },
  { month: "Mar", sales: 600000 },
  { month: "Apr", sales: 800000 },
  { month: "May", sales: 700000 },
  { month: "Jun", sales: 900000 },
];

const customerData = [
  { name: "New", value: 400, color: "#0A1128" },
  { name: "Returning", value: 300, color: "#E63946" },
  { name: "VIP", value: 200, color: "#457B9D" },
];

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
};

export default function Dashboard() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  // Redirect to sign in if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      navigate("/signin");
    }
  }, [user, loading, navigate]);

  if (loading || !user) {
    return <div className="h-screen flex items-center justify-center">Loading...</div>;
  }

  // Calculate summary data
  const totalSales = salesData.reduce((sum, item) => sum + item.sales, 0);
  const totalCustomers = customerData.reduce((sum, item) => sum + item.value, 0);
  const averageSale = totalSales / totalCustomers;

  return (
    <div className="min-h-screen flex flex-col bg-muted/40">
      <Nav />
      
      <main className="flex-grow py-6">
        <div className="automotive-container">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Welcome, {user.name}</h1>
            <p className="text-muted-foreground">{user.role} Dashboard</p>
          </div>
          
          {/* Summary Cards */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
            <Card className="dashboard-card">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                <IndianRupee className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatCurrency(totalSales)}</div>
                <p className="text-xs text-muted-foreground">
                  +20.1% from last quarter
                </p>
              </CardContent>
            </Card>
            
            <Card className="dashboard-card">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalCustomers}</div>
                <p className="text-xs text-muted-foreground">
                  +10.5% from last month
                </p>
              </CardContent>
            </Card>
            
            <Card className="dashboard-card">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Average Sale</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatCurrency(averageSale)}</div>
                <p className="text-xs text-muted-foreground">
                  +4.2% from last month
                </p>
              </CardContent>
            </Card>
            
            <Card className="dashboard-card">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Active Sessions</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24</div>
                <p className="text-xs text-muted-foreground">
                  +12 since yesterday
                </p>
              </CardContent>
            </Card>
          </div>
          
          {/* Charts */}
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="dashboard-card">
              <CardHeader>
                <CardTitle>Sales Revenue</CardTitle>
                <CardDescription>
                  Monthly sales revenue in INR
                </CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis tickFormatter={(value) => `${value / 1000}K`} />
                    <Tooltip formatter={(value) => formatCurrency(value as number)} />
                    <Bar dataKey="sales" name="Sales (INR)" fill="#E63946" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <Card className="dashboard-card">
              <CardHeader>
                <CardTitle>Customer Breakdown</CardTitle>
                <CardDescription>
                  Distribution of customer types
                </CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={customerData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {customerData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value} Customers`, "Count"]} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
          
          {/* Activity Log */}
          <Card className="dashboard-card mt-6">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Your latest actions and system logs</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b pb-2">
                  <div>
                    <p className="font-medium">Logged in</p>
                    <p className="text-sm text-muted-foreground">System recorded your login</p>
                  </div>
                  <span className="text-sm text-muted-foreground">Just now</span>
                </div>
                <div className="flex justify-between items-center border-b pb-2">
                  <div>
                    <p className="font-medium">Dashboard accessed</p>
                    <p className="text-sm text-muted-foreground">You viewed the sales dashboard</p>
                  </div>
                  <span className="text-sm text-muted-foreground">Just now</span>
                </div>
                <div className="flex justify-between items-center border-b pb-2">
                  <div>
                    <p className="font-medium">Last sign out</p>
                    <p className="text-sm text-muted-foreground">You signed out of the system</p>
                  </div>
                  <span className="text-sm text-muted-foreground">Yesterday at 5:30 PM</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
