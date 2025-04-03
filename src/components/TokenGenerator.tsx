
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { RefreshCw, CheckCircle, Copy } from "lucide-react";

export function TokenGenerator() {
  const [description, setDescription] = useState("");
  const [tokenNumber, setTokenNumber] = useState("");
  const { toast } = useToast();

  const generateToken = () => {
    if (!description.trim()) {
      toast({
        variant: "destructive",
        title: "Description Required",
        description: "Please enter a description for your request.",
      });
      return;
    }
    
    // Generate a random token number (format: TKN-YYYY-XXXX)
    const year = new Date().getFullYear();
    const randomNum = Math.floor(1000 + Math.random() * 9000); // 4-digit number
    const newToken = `TKN-${year}-${randomNum}`;
    
    setTokenNumber(newToken);
    
    toast({
      title: "Token Generated",
      description: "Your request token has been generated successfully.",
    });
  };
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(tokenNumber);
    toast({
      title: "Copied to Clipboard",
      description: "Token number has been copied to clipboard.",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Request Token Generator</CardTitle>
        <CardDescription>
          Generate a unique token for inventory requests
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="description" className="text-sm font-medium">
            Request Description
          </label>
          <Textarea
            id="description"
            placeholder="Describe what inventory items you need..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        
        {tokenNumber && (
          <div className="space-y-2">
            <label htmlFor="token" className="text-sm font-medium">
              Your Token
            </label>
            <div className="flex">
              <Input
                id="token"
                value={tokenNumber}
                readOnly
                className="flex-1 bg-muted"
              />
              <Button 
                variant="outline" 
                size="icon" 
                className="ml-2"
                onClick={copyToClipboard}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground flex items-center mt-1">
              <CheckCircle className="h-3 w-3 mr-1 text-green-500" />
              Share this token with your request
            </p>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button onClick={generateToken} className="w-full">
          <RefreshCw className="mr-2 h-4 w-4" />
          Generate Token
        </Button>
      </CardFooter>
    </Card>
  );
}
