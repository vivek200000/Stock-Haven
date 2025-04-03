
import { 
  SidebarMenu, 
  SidebarMenuItem, 
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent
} from "@/components/ui/sidebar";
import { Link, useLocation } from "react-router-dom";
import { 
  Home, 
  ShoppingCart, 
  Package, 
  Factory, 
  BarChart3, 
  Users, 
  Truck, 
  FileText,
  Settings
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
      icon: ShoppingCart
    },
    {
      title: "Inventory",
      path: "/dashboard/inventory",
      icon: Package
    },
    {
      title: "Production",
      path: "/dashboard/production",
      icon: Factory
    },
    {
      title: "Sales",
      path: "/dashboard/sales",
      icon: BarChart3
    },
    {
      title: "Customers",
      path: "/dashboard/customers",
      icon: Users
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
    },
    {
      title: "Settings",
      path: "/dashboard/settings",
      icon: Settings
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
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
