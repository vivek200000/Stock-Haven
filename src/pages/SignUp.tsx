
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/hooks/useAuth";
import Nav from "@/components/Nav";
import { Car, Loader2 } from "lucide-react";

export default function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { signUp } = useAuth();
  const { toast } = useToast();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!firstName || !lastName || !email || !password) {
      toast({
        variant: "destructive",
        title: "Validation Error",
        description: "Please fill in all required fields",
      });
      return;
    }
    
    if (password !== confirmPassword) {
      toast({
        variant: "destructive",
        title: "Passwords Don't Match",
        description: "Please make sure your passwords match",
      });
      return;
    }
    
    try {
      setIsLoading(true);
      await signUp(email, password, {
        firstName,
        lastName,
      });
      
      toast({
        title: "Account created",
        description: "Please check your email to verify your account",
      });
    } catch (error) {
      console.error("Error signing up:", error);
      toast({
        variant: "destructive",
        title: "Error Creating Account",
        description: "Could not create your account. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Nav />
      
      <main className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <div className="flex justify-center">
              <Car className="h-12 w-12 text-automotive-red" />
            </div>
            <h2 className="mt-6 text-3xl font-bold tracking-tight">
              Create an account
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Sign up to access the employee dashboard
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
            </div>
            
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating account
                </>
              ) : (
                "Sign up"
              )}
            </Button>
            
            <p className="text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link
                to="/signin"
                className="font-medium text-primary underline-offset-4 hover:underline"
              >
                Sign in
              </Link>
            </p>
          </form>
        </div>
      </main>
    </div>
  );
}
