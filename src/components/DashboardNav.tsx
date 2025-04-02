
import { 
  SidebarMenu, 
  SidebarMenuItem, 
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton
} from "@/components/ui/sidebar";
import { Link, useLocation } from "react-router-dom";
import { 
  Home, 
  ShoppingCart, 
  Package, 
  BarChart3, 
  Truck, 
  FileText,
  Users,
  CreditCard,
  Settings,
  FileInvoice,
  DollarSign,
  ReceiptText
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";

export function DashboardNav() {
  const location = useLocation();
  const { profile } = useAuth();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  
  const isActive = (path: string) => {
    return location.pathname.startsWith(path);
  };
  
  const toggleExpanded = (title: string) => {
    setExpandedItems(prev => 
      prev.includes(title) 
        ? prev.filter(item => item !== title) 
        : [...prev, title]
    );
  };
  
  // Base menu items visible to all roles
  const baseMenuItems = [
    {
      title: "Dashboard",
      path: "/dashboard",
      icon: Home
    },
    {
      title: "Purchase",
      path: "/dashboard/purchase",
      icon: ShoppingCart,
      subItems: [
        {
          title: "Vendor PO",
          path: "/dashboard/purchase/vendor-po"
        },
        {
          title: "My PO",
          path: "/dashboard/purchase/my-po"
        },
        {
          title: "Expenses",
          path: "/dashboard/purchase/expenses"
        }
      ]
    },
    {
      title: "Inventory",
      path: "/dashboard/inventory",
      icon: Package,
      subItems: [
        {
          title: "Purchase Order Report",
          path: "/dashboard/inventory/purchase-report"
        },
        {
          title: "Pending Purchase Orders",
          path: "/dashboard/inventory/pending-orders"
        },
        {
          title: "Supplier Performance",
          path: "/dashboard/inventory/supplier-performance"
        }
      ]
    },
    {
      title: "Sales",
      path: "/dashboard/sales",
      icon: BarChart3,
      subItems: [
        {
          title: "Invoices",
          path: "/dashboard/sales/invoices"
        },
        {
          title: "Customer Order History",
          path: "/dashboard/sales/customer-orders"
        },
        {
          title: "Returned Items",
          path: "/dashboard/sales/returned-items"
        }
      ]
    },
    {
      title: "Suppliers",
      path: "/dashboard/suppliers",
      icon: Truck
    },
    {
      title: "Reports",
      path: "/dashboard/reports",
      icon: FileText
    }
  ];
  
  // Additional menu items for Admin and Manager roles
  const adminMenuItems = [
    {
      title: "Users",
      path: "/dashboard/users",
      icon: Users
    },
    {
      title: "Billing",
      path: "/dashboard/billing",
      icon: CreditCard,
      subItems: [
        {
          title: "Invoices",
          path: "/dashboard/billing/invoices"
        },
        {
          title: "Upload Documents",
          path: "/dashboard/billing/upload"
        }
      ]
    }
  ];
  
  // Get menu items based on user role
  const getMenuItemsByRole = () => {
    const role = profile?.role?.toLowerCase() || 'user';
    
    if (role === 'admin' || role === 'manager') {
      return [...baseMenuItems, ...adminMenuItems];
    }
    
    if (role === 'supplier') {
      // Suppliers only see limited menu items
      return baseMenuItems.filter(item => 
        ['Dashboard', 'Purchase', 'Inventory'].includes(item.title)
      );
    }
    
    return baseMenuItems;
  };
  
  const menuItems = getMenuItemsByRole();
  
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Navigation</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.path}>
              <SidebarMenuButton
                asChild
                isActive={isActive(item.path)}
                tooltip={item.title}
                onClick={() => item.subItems && toggleExpanded(item.title)}
              >
                <Link to={item.subItems ? "#" : item.path}>
                  <item.icon />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
              
              {item.subItems && (
                <SidebarMenuSub>
                  {item.subItems.map((subItem) => (
                    <SidebarMenuSubItem key={subItem.path}>
                      <SidebarMenuSubButton
                        asChild
                        isActive={isActive(subItem.path)}
                      >
                        <Link to={subItem.path}>
                          <span>{subItem.title}</span>
                        </Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              )}
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
