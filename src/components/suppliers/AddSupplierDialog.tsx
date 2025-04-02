
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Truck, Check } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

// Categories available for suppliers
const availableCategories = [
  "Engine Parts",
  "Transmission",
  "Suspension",
  "Brakes",
  "Electrical",
  "Body Parts",
  "Tires & Wheels",
  "Fluids & Oils",
  "Filters",
  "Lighting",
  "Accessories"
];

interface AddSupplierDialogProps {
  onSupplierAdded: () => void;
}

export function AddSupplierDialog({ onSupplierAdded }: AddSupplierDialogProps) {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [currentCategory, setCurrentCategory] = useState<string>("");
  
  const handleAddCategory = () => {
    if (currentCategory && !selectedCategories.includes(currentCategory)) {
      setSelectedCategories([...selectedCategories, currentCategory]);
      setCurrentCategory("");
    }
  };
  
  const handleRemoveCategory = (category: string) => {
    setSelectedCategories(selectedCategories.filter(cat => cat !== category));
  };
  
  const handleSubmit = () => {
    // Validate form
    if (!name || !phone || !email || !address || selectedCategories.length === 0) {
      toast({
        variant: "destructive",
        title: "Missing fields",
        description: "Please fill in all required fields and select at least one category."
      });
      return;
    }
    
    // Here we would normally submit to API/database
    // For this example, we'll simulate a successful addition
    setTimeout(() => {
      toast({
        title: "Supplier added",
        description: `${name} has been added as a supplier.`
      });
      
      // Reset form
      setName("");
      setPhone("");
      setEmail("");
      setAddress("");
      setSelectedCategories([]);
      
      // Close dialog
      setOpen(false);
      
      // Trigger callback to refresh suppliers list
      onSupplierAdded();
    }, 1000);
  };
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Truck className="h-4 w-4 mr-2" />
          Add Supplier
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-auto">
        <DialogHeader>
          <DialogTitle>Add New Supplier</DialogTitle>
          <DialogDescription>
            Enter the details of the new supplier. All fields are required.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name">Supplier Name</Label>
            <Input
              id="name"
              placeholder="Enter supplier company name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              placeholder="Enter contact phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter contact email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="address">Business Address</Label>
            <Textarea
              id="address"
              placeholder="Enter complete business address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              rows={3}
            />
          </div>
          
          <div className="space-y-2">
            <Label>Product Categories</Label>
            <div className="flex gap-2">
              <Select value={currentCategory} onValueChange={setCurrentCategory}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Categories</SelectLabel>
                    {availableCategories
                      .filter(cat => !selectedCategories.includes(cat))
                      .map(category => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Button type="button" onClick={handleAddCategory} disabled={!currentCategory}>
                Add
              </Button>
            </div>
            
            <div className="flex flex-wrap gap-2 mt-3">
              {selectedCategories.map(category => (
                <Badge key={category} variant="secondary" className="px-2 py-1">
                  {category}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-4 w-4 p-0 ml-1"
                    onClick={() => handleRemoveCategory(category)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              ))}
              
              {selectedCategories.length === 0 && (
                <p className="text-sm text-muted-foreground">No categories selected</p>
              )}
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="status">Supplier Status</Label>
            <Select defaultValue="active">
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="pending">Pending Approval</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleSubmit}>
            <Check className="h-4 w-4 mr-2" />
            Add Supplier
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
