
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileInvoice } from "lucide-react";
import { useState } from "react";

export default function Invoices() {
  // Sample invoice data
  const [invoices] = useState([
    {
      id: "INV-2023-001",
      customer: "Tata Motors",
      date: "2023-10-15",
      amount: 25000.00,
      status: "Paid"
    },
    {
      id: "INV-2023-002",
      customer: "Hero MotoCorp",
      date: "2023-10-20",
      amount: 12500.00,
      status: "Pending"
    },
    {
      id: "INV-2023-003",
      customer: "Maruti Suzuki",
      date: "2023-10-25",
      amount: 37600.00,
      status: "Overdue"
    },
  ]);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold tracking-tight">Invoices</h1>
        <p className="text-muted-foreground">
          Manage and track all customer invoices
        </p>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-xl">
              <div className="flex items-center">
                <FileInvoice className="mr-2 h-5 w-5" />
                Invoices
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="py-3 px-4 text-left">Invoice #</th>
                    <th className="py-3 px-4 text-left">Customer</th>
                    <th className="py-3 px-4 text-left">Date</th>
                    <th className="py-3 px-4 text-right">Amount</th>
                    <th className="py-3 px-4 text-center">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {invoices.map((invoice) => (
                    <tr key={invoice.id} className="border-b hover:bg-muted/50">
                      <td className="py-3 px-4 font-medium">{invoice.id}</td>
                      <td className="py-3 px-4">{invoice.customer}</td>
                      <td className="py-3 px-4">{invoice.date}</td>
                      <td className="py-3 px-4 text-right">₹{invoice.amount.toLocaleString()}</td>
                      <td className="py-3 px-4">
                        <div className="flex justify-center">
                          <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                            invoice.status === 'Paid' 
                              ? 'bg-green-100 text-green-800' 
                              : invoice.status === 'Pending' 
                              ? 'bg-yellow-100 text-yellow-800' 
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {invoice.status}
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
