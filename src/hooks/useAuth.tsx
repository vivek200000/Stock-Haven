
import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { toast } from "@/components/ui/use-toast";

// This is a mock auth service that would be replaced with Supabase
// when the Supabase integration is connected
interface User {
  id: string;
  email: string;
  name: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (name: string, email: string, password: string, role: string) => Promise<void>;
  signOut: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock functions for authentication
// These would be replaced with actual Supabase calls
const mockSignIn = async (email: string, password: string): Promise<User> => {
  // Simulate network request
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // For demo purposes, always succeed with mock user
  const user = {
    id: "user-123",
    email,
    name: "Demo User",
    role: "Sales Representative"
  };
  
  // Log the activity (would be stored in Supabase)
  console.log("Activity logged: User signed in", { userId: user.id, timestamp: new Date() });
  
  // Store in localStorage for persistence
  localStorage.setItem("automotive-user", JSON.stringify(user));
  
  return user;
};

const mockSignUp = async (name: string, email: string, password: string, role: string): Promise<User> => {
  // Simulate network request
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // For demo purposes, create a new user
  const user = {
    id: "user-" + Math.floor(Math.random() * 1000),
    email,
    name,
    role
  };
  
  // Log the activity (would be stored in Supabase)
  console.log("Activity logged: User signed up", { userId: user.id, timestamp: new Date() });
  
  // Store in localStorage for persistence
  localStorage.setItem("automotive-user", JSON.stringify(user));
  
  return user;
};

const mockSignOut = async (): Promise<void> => {
  // Simulate network request
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Log the activity (would be stored in Supabase)
  const user = localStorage.getItem("automotive-user");
  if (user) {
    const userData = JSON.parse(user);
    console.log("Activity logged: User signed out", { userId: userData.id, timestamp: new Date() });
  }
  
  // Clear from localStorage
  localStorage.removeItem("automotive-user");
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for saved user on mount
    const savedUser = localStorage.getItem("automotive-user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      const user = await mockSignIn(email, password);
      setUser(user);
      return user;
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error signing in",
        description: "Invalid credentials. Please try again.",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (name: string, email: string, password: string, role: string) => {
    try {
      setLoading(true);
      const user = await mockSignUp(name, email, password, role);
      setUser(user);
      return user;
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error signing up",
        description: "Failed to create account. Please try again.",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      await mockSignOut();
      setUser(null);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error signing out",
        description: "Failed to sign out. Please try again.",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signUp, signOut, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
