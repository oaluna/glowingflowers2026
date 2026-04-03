import React, { createContext, useState, ReactNode } from "react";

// 1. Define the "blueprints" (Interfaces) for our data
export interface Arrangement {
  id: number;
  name: string;
  price: number;
  desc: string;
}

export interface User {
  uid: string;
  email: string;
}

// 2. Define what our Context will hold
interface AppContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  cart: Arrangement[];
  addToCart: (item: Arrangement) => void;
}

// 3. Create the context (can be undefined initially)
export const AppContext = createContext<AppContextType | undefined>(undefined);

// Define the props for our Provider component
interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  // We tell useState exactly what type of data it is holding
  const [user, setUser] = useState<User | null>(null);
  const [cart, setCart] = useState<Arrangement[]>([]);

  const addToCart = (item: Arrangement) => {
    setCart((prevCart) => [...prevCart, item]);
    console.log(`${item.name} added to cart!`);
  };

  return (
    <AppContext.Provider value={{ user, setUser, cart, addToCart }}>
      {children}
    </AppContext.Provider>
  );
};
