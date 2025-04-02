
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
  FileText
} from "lucide-react";

export function DashboardNav() {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname.startsWith(path);
  };
  
  const menuItems = [
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
          title: "Purchase Order Report",
          path: "/dashboard/purchase/order-report"
        },
        {
          title: "Pending Purchase Orders",
          path: "/dashboard/purchase/pending-orders"
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
              >
                <Link to={item.path}>
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
