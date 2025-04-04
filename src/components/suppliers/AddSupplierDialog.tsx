
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Truck, X, Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface AddSupplierDialogProps {
  onAddSupplier: (supplier: any) => void;
}

export function AddSupplierDialog({ onAddSupplier }: AddSupplierDialogProps) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    category: "",
    categories: [] as string[],
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleAddCategory = () => {
    if (formData.category && !formData.categories.includes(formData.category)) {
      setFormData((prev) => ({
        ...prev,
        categories: [...prev.categories, prev.category],
        category: ""
      }));
    }
  };
  
  const handleRemoveCategory = (categoryToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      categories: prev.categories.filter(category => category !== categoryToRemove)
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Generate random ID
    const id = `SUP-${1000 + Math.floor(Math.random() * 9000)}`;
    
    // Create timestamp for current date
    const lastDelivery = new Date();
    
    // Create new supplier object
    const newSupplier = {
      id,
      name: formData.name,
      contact: {
        phone: formData.phone,
        email: formData.email,
        address: formData.address
      },
      categories: formData.categories,
      status: 'active',
      deliveryStatus: ['on_time', 'pending'][Math.floor(Math.random() * 2)],
      lastDelivery
    };
    
    onAddSupplier(newSupplier);
    setFormData({
      name: "",
      phone: "",
      email: "",
      address: "",
      category: "",
      categories: []
    });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Truck className="h-4 w-4 mr-2" />
          Add Supplier
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add New Supplier</DialogTitle>
            <DialogDescription>
              Create a new supplier for your automotive inventory.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Supplier Name</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter supplier name"
                required
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91 98765 43210"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="supplier@example.com"
                  required
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="address">Address</Label>
              <Textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter supplier's address"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="category">Categories</Label>
              <div className="flex gap-2">
                <Input
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  placeholder="Add a product category"
                />
                <Button 
                  type="button" 
                  variant="outline" 
                  size="icon"
                  onClick={handleAddCategory}
                  disabled={!formData.category}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.categories.map((category) => (
                  <Badge 
                    key={category} 
                    variant="secondary"
                    className="flex items-center gap-1"
                  >
                    {category}
                    <button 
                      type="button"
                      onClick={() => handleRemoveCategory(category)}
                      className="ml-1 rounded-full hover:bg-gray-200 p-0.5"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
                {formData.categories.length === 0 && (
                  <span className="text-xs text-muted-foreground">No categories added yet</span>
                )}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button 
              type="submit"
              disabled={formData.name === '' || formData.categories.length === 0}
            >
              Add Supplier
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
