
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { Package, Search, Plus, X } from "lucide-react";
import { Database } from "@/integrations/supabase/types";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type InventoryItem = Database['public']['Tables']['inventory']['Row'];

// Sample images for different auto parts categories
const sampleImages = {
  'Engine Parts': [
    'https://source.unsplash.com/random/300x200/?engine',
    'https://source.unsplash.com/random/300x200/?car-engine',
    'https://source.unsplash.com/random/300x200/?motor',
  ],
  'Filters': [
    'https://source.unsplash.com/random/300x200/?filter',
    'https://source.unsplash.com/random/300x200/?oil-filter',
    'https://source.unsplash.com/random/300x200/?air-filter',
  ],
  'Brakes': [
    'https://source.unsplash.com/random/300x200/?brake',
    'https://source.unsplash.com/random/300x200/?brake-pad',
    'https://source.unsplash.com/random/300x200/?brake-disc',
  ],
  'Fluids': [
    'https://source.unsplash.com/random/300x200/?oil',
    'https://source.unsplash.com/random/300x200/?coolant',
    'https://source.unsplash.com/random/300x200/?brake-fluid',
  ],
  'Electrical': [
    'https://source.unsplash.com/random/300x200/?battery',
    'https://source.unsplash.com/random/300x200/?car-battery',
    'https://source.unsplash.com/random/300x200/?alternator',
  ],
  'Tires': [
    'https://source.unsplash.com/random/300x200/?tire',
    'https://source.unsplash.com/random/300x200/?wheel',
    'https://source.unsplash.com/random/300x200/?car-tire',
  ],
  'Suspension': [
    'https://source.unsplash.com/random/300x200/?suspension',
    'https://source.unsplash.com/random/300x200/?shock-absorber',
    'https://source.unsplash.com/random/300x200/?strut',
  ],
  'Default': [
    'https://source.unsplash.com/random/300x200/?automotive',
    'https://source.unsplash.com/random/300x200/?car-part',
    'https://source.unsplash.com/random/300x200/?spare-part',
  ]
};

export default function InventoryPage() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [filteredInventory, setFilteredInventory] = useState<InventoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("");
  const [categories, setCategories] = useState<string[]>([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newItem, setNewItem] = useState({
    name: '',
    price: 0,
    category: '',
    stock_quantity: 1,
    description: '',
    image_url: ''
  });

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
          .select("*")
          .order("name");

        if (error) {
          throw error;
        }

        setInventory(data || []);
        setFilteredInventory(data || []);
        
        const uniqueCategories = [...new Set(data?.map(item => item.category) || [])];
        setCategories(uniqueCategories.filter(Boolean) as string[]);
        
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching inventory:", error);
        setIsLoading(false);
      }
    };

    fetchInventory();
    
    const channel = supabase
      .channel('schema-db-changes')
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

  useEffect(() => {
    let filtered = inventory;
    
    if (searchTerm) {
      filtered = filtered.filter(item => 
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (categoryFilter && categoryFilter !== "all-categories") {
      filtered = filtered.filter(item => item.category === categoryFilter);
    }
    
    setFilteredInventory(filtered);
  }, [searchTerm, categoryFilter, inventory]);

  const addNewItem = async () => {
    try {
      if (!newItem.name || newItem.price <= 0) {
        toast({
          title: "Missing required fields",
          description: "Please provide a name and a valid price.",
          variant: "destructive"
        });
        return;
      }

      // Generate a sample image URL if not provided
      let imageUrl = newItem.image_url;
      if (!imageUrl) {
        const categoryImages = sampleImages[newItem.category as keyof typeof sampleImages] || sampleImages.Default;
        imageUrl = categoryImages[Math.floor(Math.random() * categoryImages.length)];
      }

      const { data, error } = await supabase
        .from('inventory')
        .insert([{
          name: newItem.name,
          price: newItem.price,
          category: newItem.category,
          stock_quantity: newItem.stock_quantity,
          description: newItem.description,
          image_url: imageUrl
        }])
        .select();

      if (error) throw error;

      toast({
        title: "Item added",
        description: `${newItem.name} has been added to the inventory.`
      });

      setIsAddDialogOpen(false);
      setNewItem({
        name: '',
        price: 0,
        category: '',
        stock_quantity: 1,
        description: '',
        image_url: ''
      });
      
    } catch (error) {
      console.error("Error adding item:", error);
      toast({
        title: "Error adding item",
        description: "There was an error adding the item to inventory.",
        variant: "destructive"
      });
    }
  };

  if (loading || isLoading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  const getCategoryImage = (category: string | null) => {
    if (!category || !sampleImages[category as keyof typeof sampleImages]) {
      return sampleImages.Default[0];
    }
    const categoryImages = sampleImages[category as keyof typeof sampleImages];
    return categoryImages[0];
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold tracking-tight">Inventory</h1>
          <Button onClick={() => setIsAddDialogOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add New Item
          </Button>
        </div>
        
        <div className="flex items-center space-x-2 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search inventory..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-categories">All Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredInventory.map((item) => (
            <Card key={item.id} className="overflow-hidden">
              <div className="h-48 overflow-hidden">
                <img
                  src={item.image_url || getCategoryImage(item.category)}
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform hover:scale-105"
                />
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold text-lg">{item.name}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2 h-10">
                  {item.description}
                </p>
                <div className="mt-2 flex justify-between items-center">
                  <span className="font-bold text-lg">{formatPrice(item.price)}</span>
                  <span className={`text-sm px-2 py-1 rounded-full ${
                    item.stock_quantity > 10 
                      ? 'bg-green-100 text-green-800' 
                      : item.stock_quantity > 0 
                        ? 'bg-yellow-100 text-yellow-800' 
                        : 'bg-red-100 text-red-800'
                  }`}>
                    Stock: {item.stock_quantity}
                  </span>
                </div>
              </CardContent>
              <CardFooter className="p-4 pt-0 flex justify-between">
                <span className="text-xs text-muted-foreground">{item.category}</span>
                <Button variant="outline" size="sm">Update</Button>
              </CardFooter>
            </Card>
          ))}
          
          {filteredInventory.length === 0 && (
            <div className="col-span-full flex flex-col items-center justify-center p-8 text-center">
              <Package className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">No inventory items found</h3>
              <p className="text-sm text-muted-foreground mt-1">
                {searchTerm || categoryFilter 
                  ? "Try adjusting your search or filter" 
                  : "Add some inventory items to get started"}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Add New Item Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Inventory Item</DialogTitle>
            <DialogDescription>
              Add a new automotive part to your inventory
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                value={newItem.name}
                onChange={(e) => setNewItem({...newItem, name: e.target.value})}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="price" className="text-right">
                Price (₹)
              </Label>
              <Input
                id="price"
                type="number"
                value={newItem.price || ''}
                onChange={(e) => setNewItem({...newItem, price: parseFloat(e.target.value) || 0})}
                min={0}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="category" className="text-right">
                Category
              </Label>
              <Select 
                onValueChange={(value) => setNewItem({...newItem, category: value})}
                value={newItem.category}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(sampleImages).filter(cat => cat !== 'Default').map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="quantity" className="text-right">
                Quantity
              </Label>
              <Input
                id="quantity"
                type="number"
                value={newItem.stock_quantity || 1}
                onChange={(e) => setNewItem({...newItem, stock_quantity: parseInt(e.target.value) || 1})}
                min={1}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="image" className="text-right">
                Image URL
              </Label>
              <Input
                id="image"
                value={newItem.image_url}
                onChange={(e) => setNewItem({...newItem, image_url: e.target.value})}
                placeholder="Leave blank for sample image"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Textarea
                id="description"
                value={newItem.description}
                onChange={(e) => setNewItem({...newItem, description: e.target.value})}
                className="col-span-3"
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={addNewItem}>
              Add Item
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}
