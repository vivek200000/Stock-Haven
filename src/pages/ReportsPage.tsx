
import React from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function ReportsPage() {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold">Reports Dashboard</h1>
        
        <Tabs defaultValue="sales">
          <TabsList className="mb-4">
            <TabsTrigger value="sales">Sales Reports</TabsTrigger>
            <TabsTrigger value="inventory">Inventory Reports</TabsTrigger>
            <TabsTrigger value="purchase">Purchase Reports</TabsTrigger>
          </TabsList>
          
          <TabsContent value="sales">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Customer Order Reports</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>View detailed customer order history and analytics.</p>
                  <a href="/dashboard/sales/customer-orders" className="text-primary hover:underline block mt-4">
                    Go to Customer Orders →
                  </a>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Returned Items</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>View reports on returned items and refund history.</p>
                  <a href="/dashboard/sales/returned-items" className="text-primary hover:underline block mt-4">
                    Go to Returned Items →
                  </a>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="inventory">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle>Purchase Order Report</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Track all inventory purchase orders.</p>
                  <a href="/dashboard/inventory/purchase-report" className="text-primary hover:underline block mt-4">
                    View Report →
                  </a>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Pending Orders</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Check all pending inventory orders.</p>
                  <a href="/dashboard/inventory/pending-orders" className="text-primary hover:underline block mt-4">
                    View Pending Orders →
                  </a>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Supplier Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Analyze supplier delivery performance.</p>
                  <a href="/dashboard/inventory/supplier-performance" className="text-primary hover:underline block mt-4">
                    View Performance →
                  </a>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="purchase">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Purchase Order Reports</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Review detailed purchase order history.</p>
                  <a href="/dashboard/purchase/order-report" className="text-primary hover:underline block mt-4">
                    View Orders →
                  </a>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Pending Purchase Orders</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Track pending purchases and expected deliveries.</p>
                  <a href="/dashboard/purchase/pending-orders" className="text-primary hover:underline block mt-4">
                    View Pending →
                  </a>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
