
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import { AuthProvider } from "@/hooks/useAuth";

import Index from "./pages/Index";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import InventoryPage from "./pages/InventoryPage";
import SalesPage from "./pages/SalesPage";
import SuppliersPage from "./pages/SuppliersPage";
import ReportsPage from "./pages/ReportsPage";
import NotFound from "./pages/NotFound";

// Purchase Pages
import VendorPO from "./pages/purchase/VendorPO";
import MyPO from "./pages/purchase/MyPO";
import Expenses from "./pages/purchase/Expenses";

// Purchase Reports
import PurchaseOrderReport from "./pages/reports/purchase/PurchaseOrderReport";
import PendingPurchaseOrders from "./pages/reports/purchase/PendingPurchaseOrders";

// Inventory Reports
import InventoryPurchaseReport from "./pages/reports/inventory/PurchaseOrderReport";
import InventoryPendingOrders from "./pages/reports/inventory/PendingOrdersReport";
import SupplierPerformance from "./pages/reports/inventory/SupplierPerformance";

// Sales Reports
import Invoices from "./pages/sales/Invoices";
import CustomerOrderHistory from "./pages/reports/sales/CustomerOrderHistory";
import ReturnedItems from "./pages/reports/sales/ReturnedItems";

// Billing
import UploadDocuments from "./pages/billing/UploadDocuments";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light">
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/dashboard/inventory" element={<InventoryPage />} />
              <Route path="/dashboard/sales" element={<SalesPage />} />
              <Route path="/dashboard/suppliers" element={<SuppliersPage />} />
              <Route path="/dashboard/reports" element={<ReportsPage />} />
              
              {/* Purchase Pages */}
              <Route path="/dashboard/purchase/vendor-po" element={<VendorPO />} />
              <Route path="/dashboard/purchase/my-po" element={<MyPO />} />
              <Route path="/dashboard/purchase/expenses" element={<Expenses />} />
              
              {/* Purchase Report Routes */}
              <Route path="/dashboard/purchase/order-report" element={<PurchaseOrderReport />} />
              <Route path="/dashboard/purchase/pending-orders" element={<PendingPurchaseOrders />} />
              
              {/* Inventory Report Routes */}
              <Route path="/dashboard/inventory/purchase-report" element={<InventoryPurchaseReport />} />
              <Route path="/dashboard/inventory/pending-orders" element={<InventoryPendingOrders />} />
              <Route path="/dashboard/inventory/supplier-performance" element={<SupplierPerformance />} />
              
              {/* Sales Report Routes */}
              <Route path="/dashboard/sales/invoices" element={<Invoices />} />
              <Route path="/dashboard/sales/customer-orders" element={<CustomerOrderHistory />} />
              <Route path="/dashboard/sales/returned-items" element={<ReturnedItems />} />
              
              {/* Billing Routes */}
              <Route path="/dashboard/billing/upload" element={<UploadDocuments />} />
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
