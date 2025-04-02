
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Check, Copy, FileText } from "lucide-react";

export function TokenGenerator() {
  const [token, setToken] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [quantity, setQuantity] = useState<string>("");
  const [item, setItem] = useState<string>("");
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const generateToken = () => {
    const timestamp = new Date().getTime();
    const randomNum = Math.floor(Math.random() * 10000);
    const newToken = `REQ-${timestamp.toString().slice(-6)}-${randomNum}`;
    setToken(newToken);
    
    // Show a toast notification
    toast({
      title: "Token Generated",
      description: `Token ${newToken} has been generated for your request.`,
    });
  };
  
  const copyToClipboard = () => {
    const text = `Request Token: ${token}\nQuantity: ${quantity}\nItem: ${item}\nDescription: ${description}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    
    toast({
      title: "Copied to clipboard",
      description: "Token details copied to clipboard successfully.",
    });
    
    setTimeout(() => setCopied(false), 2000);
  };
  
  const resetForm = () => {
    setToken("");
    setDescription("");
    setQuantity("");
    setItem("");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <FileText className="mr-2 h-5 w-5 text-muted-foreground" />
          Request Token Generator
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="quantity" className="block text-sm font-medium text-muted-foreground mb-1">
                Quantity
              </label>
              <Input
                id="quantity"
                type="number"
                placeholder="Enter quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="item" className="block text-sm font-medium text-muted-foreground mb-1">
                Item
              </label>
              <Input
                id="item"
                placeholder="Enter item name"
                value={item}
                onChange={(e) => setItem(e.target.value)}
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-muted-foreground mb-1">
              Description
            </label>
            <Textarea
              id="description"
              placeholder="Enter request description..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="min-h-[100px]"
            />
          </div>
          
          <div className="flex flex-col space-y-2">
            <Button onClick={generateToken} disabled={!quantity || !item}>
              Generate Token
            </Button>
            
            {token && (
              <>
                <div className="mt-4 flex items-center justify-between rounded-md border p-3">
                  <span className="font-mono text-sm font-medium">{token}</span>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={copyToClipboard}
                    className="h-8 w-8 p-0"
                  >
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    <span className="sr-only">Copy token</span>
                  </Button>
                </div>
                <Button variant="outline" onClick={resetForm}>
                  Reset
                </Button>
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
