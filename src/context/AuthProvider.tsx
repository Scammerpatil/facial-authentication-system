import { User } from "@/types/User";
import { createContext, useContext, useState, ReactNode } from "react";

// Defining the context type
interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
}

// Creating the UserContext with a default value of undefined
const UserContext = createContext<UserContextType | undefined>(undefined);

// AuthProvider component that provides the context
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the UserContext
export const useAuth = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
