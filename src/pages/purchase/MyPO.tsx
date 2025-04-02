
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShoppingBag } from "lucide-react";

export default function MyPO() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold tracking-tight">My Purchase Orders</h1>
        <p className="text-muted-foreground">
          Track and manage your purchase orders
        </p>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-xl">
              <div className="flex items-center">
                <ShoppingBag className="mr-2 h-5 w-5" />
                My Purchase Orders
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-center text-muted-foreground py-10">
              Your purchase orders will be displayed here
            </p>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
