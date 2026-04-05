import React, { createContext, useState, useEffect, ReactNode } from "react";
import { auth, db } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

export interface Arrangement {
  id: number;
  name: string;
  price: number;
  desc: string;
}

export interface User {
  uid: string;
  email: string | null;
}

interface AppContextType {
  user: User | null;
  cart: Arrangement[];
  addToCart: (item: Arrangement) => void;
  logout: () => void;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [cart, setCart] = useState<Arrangement[]>([]);

  // 1. Listen for user login/logout automatically
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser({ uid: currentUser.uid, email: currentUser.email });

        // Fetch their saved cart from Firestore Database
        const cartRef = doc(db, "carts", currentUser.uid);
        const cartSnap = await getDoc(cartRef);

        if (cartSnap.exists()) {
          setCart(cartSnap.data().items || []);
        }
      } else {
        setUser(null);
        setCart([]); // Clear cart if they log out
      }
    });

    return () => unsubscribe(); // Cleanup listener
  }, []);

  // 2. Add to cart AND save to database if logged in
  const addToCart = async (item: Arrangement) => {
    const newCart = [...cart, item];
    setCart(newCart);
    alert(`${item.name} added to cart!`);

    if (user) {
      // Save it to Firestore under the user's specific ID
      const cartRef = doc(db, "carts", user.uid);
      await setDoc(cartRef, { items: newCart });
    }
  };

  const logout = () => {
    auth.signOut();
  };

  return (
    <AppContext.Provider value={{ user, cart, addToCart, logout }}>
      {children}
    </AppContext.Provider>
  );
};
