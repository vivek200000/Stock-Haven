
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { LowStockAlert } from "@/components/dashboard/LowStockAlert";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

// Define the InventoryItem interface
interface InventoryItem {
  id: string;
  name: string;
  category: string;
  price: number;
  stock_quantity: number;
  description?: string;
  image_url?: string;
  created_at: string;
  updated_at: string;
}

// Sample data for low stock items if database fetch fails
const sampleLowStockData = [
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

export default function Dashboard() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [isEditingInventory, setIsEditingInventory] = useState(false);
  const [editedItem, setEditedItem] = useState<InventoryItem | null>(null);
  const [lowStockItems, setLowStockItems] = useState<any[]>(sampleLowStockData);

  useEffect(() => {
    if (!loading && !user) {
      navigate("/signin");
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const { data, error } = await supabase
          .from('inventory')
          .select("*");

        if (error) {
          throw error;
        }

        setInventory(data || []);
        
        if (data && data.length > 0) {
          setLowStockItems(data.filter(item => item.stock_quantity < 10));
        }
      } catch (error) {
        console.error("Error fetching inventory:", error);
      }
    };

    fetchInventory();
    
    const channel = supabase
      .channel('dashboard-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'inventory'
        },
        (payload) => {
          fetchInventory();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const categoryData = useCategoryData(inventory);
  const stockLevelData = useStockLevelData(inventory);
  const salesData = [
    { name: 'Engine Parts', value: 4300, color: '#8884d8' },
    { name: 'Brake Systems', value: 3200, color: '#82ca9d' },
    { name: 'Filters', value: 2800, color: '#ffc658' },
    { name: 'Electronics', value: 2100, color: '#ff8042' },
    { name: 'Body Parts', value: 1500, color: '#0088fe' }
  ];

  const handleUpdateStock = async (id: string, newQuantity: number) => {
    try {
      const { error } = await supabase
        .from('inventory')
        .update({ stock_quantity: newQuantity })
        .eq('id', id);

      if (error) throw error;
      
      setIsEditingInventory(false);
      setEditedItem(null);
      
      toast({
        title: "Stock updated",
        description: "Inventory stock has been updated successfully",
      });
    } catch (error) {
      console.error("Error updating inventory:", error);
      toast({
        title: "Error updating stock",
        description: "There was a problem updating the inventory",
        variant: "destructive"
      });
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  const totalInventoryCount = inventory.reduce((sum, item) => sum + item.stock_quantity, 0);
  const totalInventoryValue = inventory.reduce((sum, item) => sum + (item.price * item.stock_quantity), 0);

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-5">
        <div>
          <h1 className="text-3xl font-semibold">Welcome to Wheels ERP</h1>
          <p className="text-muted-foreground">Your daily business overview</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div className="space-y-0.5">
                <CardTitle className="text-base font-medium">Total Sales</CardTitle>
                <CardDescription>Monthly revenue</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹1,29,242.50</div>
              <p className="text-xs text-muted-foreground">
                +18.2% from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div className="space-y-0.5">
                <CardTitle className="text-base font-medium">Inventory</CardTitle>
                <CardDescription>Total stock count</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2,848</div>
              <p className="text-xs text-muted-foreground">
                +201 items since last check
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div className="space-y-0.5">
                <CardTitle className="text-base font-medium">Active Orders</CardTitle>
                <CardDescription>Pending delivery</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-muted-foreground">
                -2 from yesterday
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div className="space-y-0.5">
                <CardTitle className="text-base font-medium">New Customers</CardTitle>
                <CardDescription>Past 30 days</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">43</div>
              <p className="text-xs text-muted-foreground">
                +11.3% increase
              </p>
            </CardContent>
          </Card>
        </div>

        <h2 className="text-2xl font-semibold pt-4">Key Metrics</h2>
        <Separator />

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <LowStockAlert />

          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>
                Latest transactions and updates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium">New invoice created for Supreme Auto Parts</p>
                    <p className="text-sm text-muted-foreground">INV-2305 for ₹28,500</p>
                  </div>
                  <div className="ml-auto text-xs text-muted-foreground">Just now</div>
                </div>
                <Separator />
                <div className="flex items-center">
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium">Parts received from Royal Distributors</p>
                    <p className="text-sm text-muted-foreground">PO-458 completed</p>
                  </div>
                  <div className="ml-auto text-xs text-muted-foreground">2 hours ago</div>
                </div>
                <Separator />
                <div className="flex items-center">
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium">Monthly inventory check completed</p>
                    <p className="text-sm text-muted-foreground">24 discrepancies found</p>
                  </div>
                  <div className="ml-auto text-xs text-muted-foreground">Yesterday</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}

function useCategoryData(inventory: InventoryItem[]) {
  const [data, setData] = useState<{ name: string; value: number; color: string }[]>([]);
  
  useEffect(() => {
    const categoryMap = new Map<string, number>();
    
    inventory.forEach(item => {
      const category = item.category || 'Uncategorized';
      categoryMap.set(category, (categoryMap.get(category) || 0) + 1);
    });
    
    const colors = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#0088fe', '#00C49F', '#FFBB28', '#FF8042'];
    
    const chartData = Array.from(categoryMap.entries()).map(([category, count], index) => ({
      name: category,
      value: count,
      color: colors[index % colors.length]
    }));
    
    setData(chartData);
  }, [inventory]);
  
  return data;
}

function useStockLevelData(inventory: InventoryItem[]) {
  const [data, setData] = useState<{ name: string; value: number; color: string }[]>([]);
  
  useEffect(() => {
    const stockLevels = {
      'Low Stock (0-5)': 0,
      'Medium Stock (6-20)': 0,
      'High Stock (21+)': 0
    };
    
    inventory.forEach(item => {
      if (item.stock_quantity <= 5) {
        stockLevels['Low Stock (0-5)']++;
      } else if (item.stock_quantity <= 20) {
        stockLevels['Medium Stock (6-20)']++;
      } else {
        stockLevels['High Stock (21+)']++;
      }
    });
    
    const colors = ['#ff8042', '#ffc658', '#82ca9d'];
    
    const chartData = Object.entries(stockLevels).map(([level, count], index) => ({
      name: level,
      value: count,
      color: colors[index]
    }));
    
    setData(chartData);
  }, [inventory]);
  
  return data;
}

function formatNumber(num: number) {
  if (num >= 100000) {
    return (num / 100000).toFixed(1) + 'L';
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
}
