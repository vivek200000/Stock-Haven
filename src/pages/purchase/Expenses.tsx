
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign } from "lucide-react";

export default function Expenses() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold tracking-tight">Expenses</h1>
        <p className="text-muted-foreground">
          Track and manage your department expenses
        </p>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-xl">
              <div className="flex items-center">
                <DollarSign className="mr-2 h-5 w-5" />
                Expense Summary
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-center text-muted-foreground py-10">
              Expense data will be displayed here
            </p>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
